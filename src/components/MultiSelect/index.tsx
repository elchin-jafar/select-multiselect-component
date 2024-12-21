import { Box, For, HStack, Image, Input, List, Tag, TagCloseTrigger, Text } from "@chakra-ui/react";
import CloseIcon from "@/assets/close.svg";
import { useCombobox, useMultipleSelection } from "downshift";
import InputGroup from "../InputGroup";

const MultiSelect = ({ options }) => {
  function itemToString(item: any | null) {
    return item ? item.label : "";
  }

  function itemToKey(key: any) {
    return key ? key.value : "";
  }
  const {
    selectedItems,
    getDropdownProps,
    getSelectedItemProps,
    addSelectedItem,
    removeSelectedItem,
  } = useMultipleSelection({ itemToKey });

  const items = options.filter((option) => selectedItems.indexOf(option) === -1);

  const {
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    getLabelProps,
    isOpen,
    selectedItem,
    highlightedIndex,
  } = useCombobox({
    items,
    itemToString,
    selectedItem: null,
    onSelectedItemChange({ selectedItem }) {
      return selectedItem && addSelectedItem(selectedItem);
    },
  });
  return (
    <Box>
      <Text as='label' {...getLabelProps()}>
        Multi Select
      </Text>
      <InputGroup
        startElement={
          <HStack gap='4'>
            <For each={selectedItems}>
              {(option, index) => (
                <Tag.Root key={option.value} {...getSelectedItemProps({ index, selectedItem })}>
                  <Tag.Label>{option.value}</Tag.Label>
                  <Tag.EndElement>
                    <TagCloseTrigger
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSelectedItem(selectedItem);
                      }}
                    >
                      <Image src={CloseIcon} />
                    </TagCloseTrigger>
                  </Tag.EndElement>
                </Tag.Root>
              )}
            </For>
          </HStack>
        }
      >
        <Input {...getToggleButtonProps(getDropdownProps({ preventKeyAction: isOpen }))} />
      </InputGroup>
      <List.Root position='absolute' maxHeight={240} overflowY='scroll' {...getMenuProps()}>
        {isOpen
          ? options.map((item, index) => (
              <List.Item
                {...getItemProps({ item, index })}
                key={item.value}
                bgColor={
                  selectedItem === item
                    ? "blue"
                    : highlightedIndex === index
                      ? "lightblue"
                      : undefined
                }
              >
                {item.label}
              </List.Item>
            ))
          : null}
      </List.Root>
    </Box>
  );
};

export default MultiSelect;
