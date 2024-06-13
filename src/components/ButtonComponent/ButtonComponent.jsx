import React from "react";
import { checkIfFunctionExists } from "../TodoComponent/utils";

const ButtonComponent = (props) => {
  const {
    type = "button",
    onClick = (event) => {},
    className = "",
    buttonText = "Button",
    disabled = false,
    title = "",
  } = props;

  const handleClick = (event) => {
    if (checkIfFunctionExists(onClick)) {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={className}
      disabled={disabled}
      title={title}
    >
      {buttonText}
    </button>
  );
};

export default ButtonComponent;
