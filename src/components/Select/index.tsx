import {
  Input,
  List,
  ListItem,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  useDisclosure,
  useToken,
} from "@chakra-ui/react";
import { useCombobox } from "downshift";
import "./style.css";

const options = ["test", "test1", "option1"];

const Select = ({
  colorScheme = "gray",
  placeholder,
  width,
  height,
  borderRadius,
  value,
  onChange,
  closeOnSelect = true,
}) => {
  const {
    inputValue,
    selectedItem,
    isOpen: isComboboxOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getInputProps,
  } = useCombobox({
    items: options,
    itemToString(item) {
      return item ? item : "";
    },
    onSelectedItemChange: ({ selectedItem }) => {
      onChange(selectedItem);
      if (closeOnSelect) {
        onClose();
      }
    },
    onIsOpenChange: ({ isOpen: newIsOpen }) => {
      if (newIsOpen) {
        onOpen();
      } else {
        onClose();
      }
    },
    // selectedItem: value,
  });
  const { open, onOpen, onClose } = useDisclosure();

  // const [bg] = useToken("colors", [`${colorScheme}.800`]);
  const [borderColor] = useToken("colors", [`${colorScheme}.200`]);
  const [hover] = useToken("colors", [`${colorScheme}.100`]);
  // const [selected] = useToken("colors", [`${colorScheme}.500`]);

  console.log("isOpen", open);

  return (
    <PopoverRoot open={open}>
      <PopoverTrigger>
        <Input
          {...getInputProps(onChange)}
          borderColor={borderColor}
          placeholder={placeholder}
          width={width}
          height={height}
          borderRadius={borderRadius}
          // value={value ? value : inputValue}
        />
      </PopoverTrigger>
      <PopoverContent width={width}>
        <PopoverArrow />
        <PopoverBody>
          <List.Root {...getMenuProps()}>
            {open &&
              options.map((item, index) => (
                <ListItem _hover={{ backgroundColor: hover }} {...getItemProps({ item, index })}>
                  {item}
                </ListItem>
              ))}
          </List.Root>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default Select;
