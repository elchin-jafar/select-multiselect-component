import Select from "@/components/Select";
import MultiSelect from "./components/MultiSelect";
import { Option } from "./components/Select/types";

const options = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Next.js", value: "next.js", isDisabled: true },
  { label: "Nuxt.js", value: "nuxt.js" },
  { label: "Gatsby", value: "gatsby" },
  { label: "Remix", value: "remix" },
];

const handleDisable = (option: Option) => option.isDisabled!;

function App() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "19rem",
      }}
    >
      <Select
        options={options}
        colorScheme='blue'
        hideSelected
        disableOption={handleDisable}
        popoverProps={{ cursor: "pointer" }}
      />

      <MultiSelect
        options={options}
        hideSelected={false}
        colorScheme='purple'
        inputWidth='500px'
        size='lg'
      />
    </div>
  );
}

export default App;
