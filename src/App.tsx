import Select from "@/components/Select";
import { Option } from "./components/Select/types";
import MultiSelect from "./components/MultiSelect";
import { Flex } from "@chakra-ui/react";

const options = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Next.js", value: "nextjs", isDisabled: true },
  { label: "Nuxt.js", value: "nuxtjs" },
  { label: "Gatsby", value: "gatsby" },
  { label: "Remix", value: "remix" },
];

const handleDisable = (option: Option) => option.isDisabled!;

function App() {
  return (
    <Flex justifyContent='space-around' position='relative' top='320px'>
      <Select
        options={options}
        colorScheme='blue'
        // hideSelected
        // closeOnSelect={false}
        // placement='bottom'
        disableOption={handleDisable}
        popoverProps={{ cursor: "pointer" }}
        // listProps={{ background: "red" }}
        // listItemProps={{ background: "yellow" }}
        getLabel={(option) => `updated ${option.label}`}
        // height={70}
        // size='xxl'
      />
      <MultiSelect options={options} disableSearch />
    </Flex>
  );
}

export default App;
