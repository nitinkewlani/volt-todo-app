import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import FormComponent from "../FormComponent/FormComponent";
import InputComponent from "../InputComponent/InputComponent";
import { BUTTON_LABELS, DEFAULT_INPUT } from "./constants";
import styles from "./TodoComponent.module.scss";
import { checkShouldDisableButton, getInputList } from "./utils";

const AddContainer = (props) => {
  const { onSubmit = (event) => {} } = props;
  const titleRef = useRef(null);
  const [input, setInput] = useState(DEFAULT_INPUT);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (input?.title && input?.description) {
        const updatedInput = { ...input, id: Date.now() };
        onSubmit(updatedInput);
        setInput(DEFAULT_INPUT);
        if (titleRef.current) {
          titleRef.current.focus();
        }
      }
    },
    [input, onSubmit, setInput]
  );

  const handleChange = useCallback(
    (event = {}) => {
      const { name = "", value = "" } = event?.target;
      if (!name) return;
      setInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setInput]
  );

  // memoize the input items list to be mapped
  const inputItemsList = useMemo(
    () =>
      getInputList(input?.title, input?.description, handleChange, titleRef),
    [input?.title, input?.description, handleChange]
  );

  const isButtonDisabled = useMemo(
    () => checkShouldDisableButton(input),
    [input]
  );

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  return (
    <FormComponent className={styles.addContainer} onSubmit={handleSubmit}>
      {inputItemsList.map((item) => (
        <InputComponent {...item} key={item?.name} />
      ))}
      <ButtonComponent
        type="submit"
        disabled={isButtonDisabled}
        buttonText={BUTTON_LABELS.ADD}
      />
    </FormComponent>
  );
};

export default AddContainer;
