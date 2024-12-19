import Select from "@/components/Select";
import { useState } from "react";

function App() {
  const [inputValue, setValue] = useState("");
  return (
    <>
      <Select
        colorScheme='blue'
        width='220px'
        borderRadius='1px'
        value={inputValue}
        onChange={setValue}
      />
    </>
  );
}

export default App;
