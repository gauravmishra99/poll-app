import React, { useState } from "react";

const OptionsInput = ({setOptions, id, options}) => {
  const [option, setOption] = useState("");
  const handleChange = (e) => {
    setOption(e.target.value)
  }
  return (
    <div style={{display:'flex', flexDirection:'row',alignItems:'center'}}>
      <input
        value={option}
        onChange={handleChange}
        type="text"
        placeholder="Enter Your Option"
      />
      <button>Submit</button>
    </div>
  );
};

export default OptionsInput;
