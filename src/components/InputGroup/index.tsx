import { Box, InputProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface InputGroupProps extends InputProps {
  startElement?: ReactNode;
  endElement?: ReactNode;
  children: ReactNode;
  flex?: string;
}

const InputGroup = ({ startElement, endElement, children, ...rest }: InputGroupProps) => {
  return (
    <Box display='flex' alignItems='center' minWidth={170} position='relative' {...rest}>
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
    </Box>
  );
};

export default InputGroup;
