import React, { useState } from "react";
import Products from "./components/Products";
import FormControl from "@mui/material/FormControl";
import { Input, InputLabel } from "@mui/material";
function App() {
  const [phoneName, setPhoneName] = useState("");
  const phoneInputHandler = (e) => {
    setPhoneName(e.target.value);
  };

  return (
    <React.Fragment>
      <FormControl component="form" sx={{ m: 5 }}>
        <InputLabel htmlFor="my-input">phone name</InputLabel>
        <Input
          onChange={phoneInputHandler}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <Products inputData={phoneName} />
    </React.Fragment>
  );
}

export default App;
