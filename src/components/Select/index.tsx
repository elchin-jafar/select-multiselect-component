import ChevronDownIcon from "@/assets/chevron-down.svg";
import { Box, Flex, Image, Input, List, Text } from "@chakra-ui/react";
import { useCombobox } from "downshift";
import { useState } from "react";
import InputGroup from "../InputGroup";
import "./style.css";

const Select = ({
  options,
  colorScheme = "gray",
  placeholder = "Best Combobox..",
  width,
  height,
  borderRadius,
}) => {
  const [items, setItems] = useState(options);

  function itemToString(item: any) {
    return item ? item.label : "";
  }

  const {
    isOpen,
    highlightedIndex,
    selectedItem,
    getInputProps,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useCombobox({
    items: items,
    itemToString,
    onInputValueChange({ inputValue }) {
      console.log(inputValue);

      setItems((prev) => {
        if (inputValue === "") return options;

        return prev.filter((item) => item?.label.toLowerCase().includes(inputValue.toLowerCase()));
      });
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
          ? items.map((item, index) => (
              <List.Item
                {...getItemProps({ item, index })}
                key={item?.value}
                listStyle='none'
                px={4}
                py={2}
                transition='background 0.4s'
                bgColor={
                  selectedItem === item
                    ? `${colorScheme}.300`
                    : index === highlightedIndex
                      ? `${colorScheme}.100`
                      : undefined
                }
                fontWeight={selectedItem === item ? "bold" : undefined}
              >
                {item?.label}
              </List.Item>
            ))
          : null}
      </List.Root>
    </Box>
  );
};

export default Select;
