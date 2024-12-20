import ChevronDownIcon from "@/assets/chevron-down.svg";
import { Box, Flex, Image, Input, List, Text } from "@chakra-ui/react";
import { useCombobox } from "downshift";
import { FC, useState } from "react";
import InputGroup from "../InputGroup";
import { Option, SelectProp } from "./types";

const Select: FC<SelectProp> = ({
  options,
  colorScheme = "gray",
  placeholder = "Best Combobox..",
  width = 300,
  height,
  borderRadius = 5,
  closeOnSelect = true,
  disableOption = () => false,
}) => {
  const [items, setItems] = useState(options);

  function itemToString(item: Option | null) {
    return item ? item.label : "";
  }

  const getItemsFilter = (inputValue: Option["value"]) => {
    const lowerCased = inputValue.toLowerCase();

    return function itemsFilter(item: Option) {
      return !inputValue || item.label.toLowerCase().includes(lowerCased);
    };
  };

  const {
    isOpen,
    highlightedIndex,
    selectedItem,
    getInputProps,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useCombobox<Option>({
    items: items,
    itemToString,

    onInputValueChange({ inputValue }) {
      setItems(options.filter(getItemsFilter(inputValue)));
    },
    onSelectedItemChange() {
      setItems(options);
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.ItemClick:
          setItems(options);
          return {
            ...changes,
            isOpen: !closeOnSelect,
            highlightedIndex: state.highlightedIndex,
          };
        case useCombobox.stateChangeTypes.InputClick:
          setItems(options);
          return changes;
        default:
          return changes;
      }
    },
  });

  return (
    <Box>
      <Text as='label' {...getLabelProps()}>
        Select
      </Text>
      <Flex>
        <InputGroup
          width={width}
          endElement={
            <Image
              transform={isOpen ? "rotate(180deg)" : undefined}
              transition='transform 0.2s'
              src={ChevronDownIcon}
              {...getToggleButtonProps()}
            />
          }
        >
          <Input
            height={height}
            borderRadius={borderRadius}
            placeholder={placeholder}
            {...getInputProps()}
            borderColor={`${colorScheme}.500`}
            _focus={{ outline: "none" }}
          ></Input>
        </InputGroup>
      </Flex>

      <List.Root
        {...getMenuProps()}
        position='absolute'
        minWidth={170}
        width={width}
        shadow='lg'
        outline={"none"}
      >
        {isOpen
          ? items.map((item, index) => {
              const isDisabled = disableOption(item);
              return (
                <div
                  key={item?.value}
                  style={{ cursor: `${isDisabled ? "not-allowed" : "pointer"}` }}
                >
                  <List.Item
                    {...getItemProps({ item, index })}
                    listStyle='none'
                    px={4}
                    py={2}
                    transition='background 0.4s'
                    bgColor={
                      isDisabled
                        ? "gray.200"
                        : selectedItem === item
                          ? `${colorScheme}.300`
                          : index === highlightedIndex
                            ? `${colorScheme}.100`
                            : undefined
                    }
                    opacity={isDisabled ? 0.6 : 1}
                    pointerEvents={isDisabled ? "none" : "auto"}
                    fontWeight={selectedItem === item ? "bold" : undefined}
                  >
                    {item?.label}
                  </List.Item>
                </div>
              );
            })
          : null}
      </List.Root>
    </Box>
  );
};

export default Select;
