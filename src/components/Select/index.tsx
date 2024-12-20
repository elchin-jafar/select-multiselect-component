import ChevronDownIcon from "@/assets/chevron-down.svg";
import { Box, Flex, Input, List, Text } from "@chakra-ui/react";
import { useCombobox } from "downshift";
import { useState } from "react";
import InputGroup from "../InputGroup";

const Select = ({ options }) => {
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
        console.log("prev", prev);
        if (inputValue === "") return options;

        return prev.filter((item) => item?.value.toLowerCase().includes(inputValue.toLowerCase()));
      });
    },
  });

  return (
    <Box>
      <Text as='label' {...getLabelProps()}>
        Select
      </Text>
      <Flex>
        <InputGroup flex='1' endElement={<img src={ChevronDownIcon} {...getToggleButtonProps()} />}>
          <Input placeholder='options' {...getInputProps()}></Input>
        </InputGroup>
      </Flex>

      <List.Root {...getMenuProps()} position='absolute'>
        {isOpen
          ? items.map((item, index) => (
              <List.Item
                {...getItemProps({ item, index })}
                key={item?.value}
                bgColor={index === highlightedIndex ? "lightblue" : undefined}
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
