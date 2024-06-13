export const checkIfFunctionExists = (func) =>
  func && typeof func === "function";

export const getInputList = (
  title = "",
  description = "",
  onChange = () => {},
  titleRef = {}
) => [
  {
    type: "text",
    name: "title",
    placeholder: "title",
    value: title,
    onChange,
    ref: titleRef,
  },
  {
    type: "text",
    name: "description",
    placeholder: "description",
    value: description,
    onChange,
  },
];

export const checkShouldDisableButton = (input = {}) =>
  !(input?.title && input?.description);
