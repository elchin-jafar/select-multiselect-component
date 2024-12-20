import { Box, For, HStack, Image, Input, Tag, TagCloseTrigger, Text } from "@chakra-ui/react";
import CloseIcon from "@/assets/close.svg";
import { useCombobox } from "downshift";
import InputGroup from "../InputGroup";

const MultiSelect = ({ options }) => {
  const selectedItems = [];
  const items = options.filter((option) => selectedItems.indexOf(option) === -1);

  function itemToString(item: any | null) {
    return item ? item.label : "";
  }

  const {
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    getLabelProps,
    isOpen,
    selectItem,
    highlightedIndex,
  } = useCombobox({
    items,
    itemToString,
    onSelectedItemChange({ selectedItem }) {},
  });
  return (
    <Box>
      <Text as='label'>Multi Select</Text>
      <InputGroup
        startElement={
          <HStack gap='4'>
            <For each={options}>
              {(option) => (
                <Tag.Root key={option.value}>
                  <Tag.Label>{option.value}</Tag.Label>
                  <Tag.EndElement>
                    <TagCloseTrigger>
                      <Image src={CloseIcon} />
                    </TagCloseTrigger>
                  </Tag.EndElement>
                </Tag.Root>
              )}
            </For>
          </HStack>
        }
      >
        <Input />
      </InputGroup>
      {/* <List.Root position='absolute' maxHeight={240} overflowY='scroll'>
        {options.map((item, index) => (
          <List.Item key={item.value}>{item.label}</List.Item>
        ))}
      </List.Root> */}
    </Box>
  );
};

export default MultiSelect;
