import { useState } from "react";
import { Select } from "./select";
import { SelectOption } from "./select";
const options  = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
  { label: "Sixth", value: 6 },
];

function App() {
  const [value1, setValue1] = useState<SelectOption[]>([options[0]])
  const [value2, setValue2] = useState<SelectOption | undefined>(options[0])
  return (
    <>
      <Select multiple options={options} value={value1} onChange={(option) => setValue1(option)}/>
      <br/>
      <Select options={options} value={value2} onChange={(option) => setValue2(option)}/>
    </>
  );
}

export default App;
