import CloseIcon from "@/assets/close.svg";
import { Box, Flex, Group, Image, Input, List, Tag, Text, VStack } from "@chakra-ui/react";
import { useCombobox, useMultipleSelection } from "downshift";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { MultiSelectProps } from "./types";

const MultiSelect: FC<MultiSelectProps> = ({ options, disableSearch = false }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  function itemToString(item: any | null) {
    return item ? item.label : "";
  }

  const getFilteredOptions = useCallback(
    (selectedItems, inputValue) => {
      if (disableSearch) {
        return options.filter((option) => !selectedItems.includes(option));
      }
      const lowerCasedInputValue = inputValue.toLowerCase();

      return options.filter(function filterBook(option) {
        return (
          !selectedItems.includes(option) &&
          option.value.toLowerCase().includes(lowerCasedInputValue)
        );
      });
    },
    [options, disableSearch],
  );

  const items = useMemo(
    () => getFilteredOptions(selectedItems, inputValue),
    [selectedItems, inputValue, getFilteredOptions],
  );

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } = useMultipleSelection({
    selectedItems,
    onStateChange({ selectedItems: newSelectedItems, type }) {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          setSelectedItems(newSelectedItems);
          break;
        default:
          break;
      }
    },
  });

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
    getInputProps,
    highlightedIndex,
    selectedItem,
  } = useCombobox({
    items,
    itemToString,
    defaultHighlightedIndex: 0,
    selectedItem: null,
    inputValue,
    stateReducer(state, actionAndChanges) {
      const { changes, type } = actionAndChanges;

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true,
            highlightedIndex: 0,
          };
        default:
          return changes;
      }
    },
    onStateChange({ inputValue: newInputValue, type, selectedItem: newSelectedItem }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem) {
            setSelectedItems([...selectedItems, newSelectedItem]);
            setInputValue("");
          }
          break;

        case useCombobox.stateChangeTypes.InputChange:
          if (!disableSearch) {
            setInputValue(newInputValue);
          }

          break;
        default:
          break;
      }
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
          {...getToggleButtonProps()}
        >
          <Flex wrap='wrap' position='relative' gap={2}>
            {selectedItems.map((option, index) => (
              <Tag.Root
                key={option.label}
                {...getSelectedItemProps({ selectedItem: option, index })}
              >
                <Tag.Label>{option.label}</Tag.Label>
                <Tag.EndElement
                  cursor='pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSelectedItem(option);
                  }}
                >
                  <Image src={CloseIcon} />
                </Tag.EndElement>
              </Tag.Root>
            ))}
            {!disableSearch && (
              <Input
                ref={inputRef}
                border='none'
                outline='none'
                {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
              />
            )}
          </Flex>
        </Group>
      </VStack>

      <List.Root position='absolute' maxHeight={240} overflowY='scroll' {...getMenuProps()}>
        {isOpen
          ? items.map((item, index) => (
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
