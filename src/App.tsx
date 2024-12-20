import Select from "@/components/Select";

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

function App() {
  return (
    <>
      <Select
        colorScheme='blue'
        // placeholder='test'
        width='320px'
        // height='80px'
        // borderRadius={12}
        options={options}
      />
    </>
  );
}

export default App;
