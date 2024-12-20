import { Box, Flex, InputProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface InputGroupProps extends InputProps {
  startElement?: ReactNode;
  endElement?: ReactNode;
  children: ReactNode;
  flex?: string;
}

const InputGroup = ({ startElement, endElement, children, flex, ...rest }: InputGroupProps) => {
  return (
    <Flex align='center' flex={flex} position='relative' {...rest}>
      {startElement && (
        <Box
          position='absolute'
          left='0'
          pl='4'
          display='flex'
          alignItems='center'
          pointerEvents='none'
        >
          {startElement}
        </Box>
      )}

      {children}

      {endElement && (
        <Box
          position='absolute'
          right='0'
          pr='4'
          display='flex'
          alignItems='center'
          pointerEvents='none'
        >
          {endElement}
        </Box>
      )}
    </Flex>
  );
};

export default InputGroup;
