import CloseIcon from "@/assets/close.svg";
import { Box, Flex, Group, Image, Input, List, Tag, Text, VStack } from "@chakra-ui/react";
import { useCombobox, useMultipleSelection } from "downshift";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { MultiSelectProps, Option } from "./types";

const MultiSelect: FC<MultiSelectProps> = ({
  options,
  disableSearch = false,
  hideSelected = true,
  colorScheme = "gray",
  width = 300,
  borderRadius = 5,
  popoverProps = {},
  listProps = {},
  listItemProps = {},
  getLabel = (option: Option) => option.label,
  getValue = (option: Option) => option.value,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  function itemToString(item: Option | null) {
    return item ? getLabel(item) : "";
  }

  const getFilteredOptions = useCallback(
    (selectedItems: Option[], inputValue: Option["value"]) => {
      const lowerCasedInputValue = inputValue.toLowerCase();

      return options.filter((option) => {
        const isSelected = selectedItems.some(
          (selected) => getValue(selected) === getValue(option),
        );

        if (hideSelected && isSelected) {
          return false;
        }

        if (disableSearch) {
          return !isSelected || !hideSelected;
        }

        return getValue(option).toLowerCase().includes(lowerCasedInputValue);
      });
    },
    [options, hideSelected, disableSearch, getValue],
  );

  const items = useMemo(
    () => getFilteredOptions(selectedItems, inputValue),
    [selectedItems, inputValue, getFilteredOptions],
  );

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
    useMultipleSelection<Option>({
      selectedItems,
      onStateChange({ selectedItems: newSelectedItems, type }) {
        switch (type) {
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
          case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
            if (!newSelectedItems) break;
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
  } = useCombobox({
    items,
    itemToString,
    defaultHighlightedIndex: 0,
    selectedItem: null,
    inputValue,
    stateReducer(_state, actionAndChanges) {
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
            const isItemSelected = (option: Option) => {
              return selectedItems.some((selected) => getValue(selected) === getValue(option));
            };
            setSelectedItems((prev) =>
              isItemSelected(newSelectedItem)
                ? prev.filter((option) => getValue(option) !== getValue(newSelectedItem))
                : [...prev, newSelectedItem],
            );
            setInputValue("");
          }
          break;

        case useCombobox.stateChangeTypes.InputChange:
          if (!disableSearch) {
            setInputValue(newInputValue!);
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
          border={`1px solid ${colorScheme}`}
          borderRadius={borderRadius}
          position='relative'
          p={2}
          width={width}
          {...getToggleButtonProps()}
        >
          <Flex wrap='wrap' position='relative' gapX={2} gapY={0}>
            {selectedItems.map((option, index) => (
              <Tag.Root
                key={getValue(option)}
                backgroundColor='gray.100'
                {...getSelectedItemProps({ selectedItem: option, index })}
              >
                <Tag.Label fontSize={15} p='3px'>
                  {getLabel(option)}
                </Tag.Label>
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

            <Input
              disabled={disableSearch}
              ref={inputRef}
              border='none'
              outline='none'
              pointerEvents='none'
              borderColor={`${colorScheme}.500`}
              fontSize={15}
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            />
          </Flex>
        </Group>
      </VStack>
      <Box {...popoverProps}>
        <List.Root
          position='absolute'
          overflowY='scroll'
          minWidth={170}
          maxHeight={240}
          width={width}
          shadow='lg'
          {...listProps}
          {...getMenuProps()}
        >
          {isOpen
            ? items.map((item, index) => {
                const isSelected = selectedItems.some(
                  (selected) => getValue(selected) === getValue(item),
                );
                return (
                  <List.Item
                    {...getItemProps({ item, index })}
                    key={getValue(item)}
                    listStyle='none'
                    px={4}
                    py={2}
                    transition='background 0.4s'
                    bgColor={
                      isSelected
                        ? `${colorScheme}.300`
                        : highlightedIndex === index
                          ? `${colorScheme}.100`
                          : undefined
                    }
                    {...listItemProps}
                  >
                    {getLabel(item)}
                  </List.Item>
                );
              })
            : null}
        </List.Root>
      </Box>
    </Box>
  );
};

export default MultiSelect;
