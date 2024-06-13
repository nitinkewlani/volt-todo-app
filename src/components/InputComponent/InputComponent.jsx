import React from "react";
import { checkIfFunctionExists } from "../TodoComponent/utils";

const InputComponent = React.forwardRef((props, inputRef) => {
  const {
    type = "text",
    name = "",
    value = "",
    onChange,
    placeholder = "",
    className = "",
    onBlur,
  } = props;

  const handleChange = (event) => {
    if (checkIfFunctionExists(onChange)) {
      onChange(event);
    }
  };

  const handleBlur = (event) => {
    if (checkIfFunctionExists(onBlur)) {
      onBlur(event);
    }
  };

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      ref={inputRef}
      className={className}
      onBlur={handleBlur}
    />
  );
});

export default InputComponent;
