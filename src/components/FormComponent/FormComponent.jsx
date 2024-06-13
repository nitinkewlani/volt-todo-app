import React from "react";
import { checkIfFunctionExists } from "../TodoComponent/utils";

const FormComponent = (props) => {
  const {
    className = "",
    onSubmit = (event) => {},
    children = <React.Fragment />,
  } = props;

  const handleSubmit = (event) => {
    if (checkIfFunctionExists(onSubmit)) {
      onSubmit(event);
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default FormComponent;
