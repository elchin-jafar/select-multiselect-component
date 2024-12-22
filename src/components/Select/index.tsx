import ChevronDownIcon from "@/assets/chevron-down.svg";
import { Box, Image, Input, List, Text } from "@chakra-ui/react";
import { useCombobox } from "downshift";
import { FC, useState } from "react";
import InputGroup from "../InputGroup";
import { Option, SelectProp } from "./types";
import { placementStyles, sizeConfig } from "./constants";

const Select: FC<SelectProp> = ({
  options,
  colorScheme = "gray",
  placeholder = "Best Combobox..",
  width = 300,
  height,
  size = "lg",
  borderRadius = 5,
  closeOnSelect = true,
  hideSelected = false,
  placement = "bottom",
  disableOption = () => false,
  popoverProps = {},
  listProps = {},
  listItemProps = {},
  getLabel = (option: Option) => option.label,
  getValue = (option: Option) => option.value,
}) => {
  const [items, setItems] = useState(options);

  const { fontSize, inputHeight, padding } = sizeConfig[size];

  function itemToString(item: Option | null) {
    return item ? item.label : "";
  }

  const getItemsFilter = (inputValue: Option["value"]) => {
    const lowerCased = inputValue.toLowerCase();

    return function itemsFilter(item: Option) {
      const matchesInput = !inputValue || getLabel(item).toLowerCase().includes(lowerCased);
      const isHidden = hideSelected && selectedItem && getValue(item) === selectedItem.value;
      return matchesInput && !isHidden;
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
    isItemDisabled: disableOption,

    onInputValueChange({ inputValue }) {
      setItems(options.filter(getItemsFilter(inputValue)));
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.ItemClick:
          setItems(options.filter(getItemsFilter("")));
          return {
            ...changes,
            isOpen: !closeOnSelect,
            highlightedIndex: state.highlightedIndex,
          };
        case useCombobox.stateChangeTypes.InputClick:
          setItems(options.filter(getItemsFilter("")));
          return changes;
        case useCombobox.stateChangeTypes.InputKeyDownArrowUp:
        case useCombobox.stateChangeTypes.InputKeyDownArrowDown:
          setItems(options.filter(getItemsFilter(state.inputValue)));
          return changes;
        default:
          return changes;
      }
    },
  });

  return (
    <Box position='relative'>
      <Text as='label' {...getLabelProps()} fontSize={fontSize}>
        Select
      </Text>
      <InputGroup
        width={width}
        endElement={
          <Image
            transform={isOpen ? "rotate(180deg)" : undefined}
            transition='transform 0.2s'
            src={ChevronDownIcon}
            alt='dropdown icon'
            {...getToggleButtonProps()}
          />
        }
      >
        <Input
          height={height ?? inputHeight}
          fontSize={fontSize}
          padding={padding}
          borderRadius={borderRadius}
          placeholder={placeholder}
          {...getInputProps()}
          borderColor={`${colorScheme}.500`}
          _focus={{ outline: "none" }}
        ></Input>
      </InputGroup>

      <List.Root
        {...getMenuProps()}
        position='absolute'
        minWidth={170}
        maxHeight={240}
        overflowY='scroll'
        width={width}
        shadow='lg'
        gap='1px'
        {...listProps}
        {...placementStyles[placement]}
      >
        {isOpen
          ? items.map((item, index) => {
              const isDisabled = disableOption(item);
              return (
                <Box
                  key={getValue(item)}
                  {...popoverProps}
                  cursor={`${isDisabled ? "not-allowed" : "pointer"}`}
                >
                  <List.Item
                    {...getItemProps({ item, index })}
                    listStyle='none'
                    fontSize={fontSize}
                    px={padding}
                    py={`calc(${padding} / 2)`}
                    height={inputHeight}
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
                    {...listItemProps}
                  >
                    {getLabel(item)}
                  </List.Item>
                </Box>
              );
            })
          : null}
      </List.Root>
    </Box>
  );
};

export default Select;
