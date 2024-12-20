import Select from "@/components/Select";
import { Option } from "./components/Select/types";

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
    <>
      <Select options={options} colorScheme='blue' disableOption={handleDisable} />
    </>
  );
}

export default App;
