import CloseIcon from "@/assets/close.svg";
import { Box, Flex, Group, Image, Input, List, Tag, Text, VStack } from "@chakra-ui/react";
import { useCombobox, useMultipleSelection } from "downshift";
import { useRef } from "react";

const MultiSelect = ({ options }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
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

  const handleFocus = () => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  };
  return (
    <Box>
      <VStack onClick={handleFocus} alignItems='start'>
        <Text as='label' {...getLabelProps()}>
          Multi Select
        </Text>
        <Group
          display='flex'
          border='1px solid red'
          position='relative'
          p={2}
          width={400}
          {...getToggleButtonProps(getDropdownProps({ preventKeyAction: isOpen }))}
        >
          <Flex wrap='wrap' position='relative' gap={2}>
            {selectedItems.map((option, index) => (
              <Tag.Root key={option.label}>
                <Tag.Label>{option.label}</Tag.Label>
                <Tag.EndElement
                  {...getToggleButtonProps()}
                  cursor='pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(selectedItem);
                    removeSelectedItem(selectedItem);
                  }}
                >
                  <Image src={CloseIcon} />
                </Tag.EndElement>
              </Tag.Root>
            ))}
            <Input ref={inputRef} border='none' outline='none' />
          </Flex>
        </Group>
      </VStack>

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
