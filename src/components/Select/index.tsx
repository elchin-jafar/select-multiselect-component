import {
  Input,
  List,
  ListItem,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@chakra-ui/react";

const options = ["test", "test1", "option1"];

const Select = () => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Input />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <List.Root>
            {options.map((option) => (
              <ListItem>{option}</ListItem>
            ))}
          </List.Root>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default Select;
