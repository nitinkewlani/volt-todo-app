import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.png";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import FormComponent from "../FormComponent/FormComponent";
import InputComponent from "../InputComponent/InputComponent";
import { BUTTON_LABELS } from "./constants";
import styles from "./TodoComponent.module.scss";
import TodoItemView from "./TodoView";
import {
  checkIfFunctionExists,
  checkShouldDisableButton,
  getInputList,
} from "./utils";

const TodoItem = React.memo((props) => {
  const {
    todo = {},
    editIndex = null,
    setEditIndex,
    onClickRemove = () => {},
    onClickEditDone = (updatedInput = {}) => {},
  } = props;
  const { index = 0, title = "", description = "" } = { ...todo };
  const titleRef = useRef(null);
  const [input, setInput] = useState(todo); // intialized with default todo values
  const isEditEnabled = editIndex === index;

  // used to remove a specific todo item
  const handleRemove = useCallback(() => {
    if (checkIfFunctionExists(onClickRemove)) {
      onClickRemove();
    }
  }, [onClickRemove]);

  // used to submit updated todo item in the main state in parent container
  const handleSubmit = useCallback(
    (event = {}) => {
      event?.preventDefault();
      if (checkIfFunctionExists(onClickEditDone)) {
        onClickEditDone(input);
      }
    },
    [onClickEditDone, input]
  );

  // used to start or stop editing a specific todo item
  const handleEdit = () => {
    setEditIndex(index === editIndex ? null : index);
    if (isEditEnabled) {
      setInput(todo); // sets to initial todo item values when edit is done
    }
  };

  // used to change the input for a specific todo
  const handleChange = (event = {}) => {
    const { name = "", value = "" } = event?.target;
    if (!name) return;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // memoize the input items list to be mapped
  const inputItemsList = useMemo(
    () =>
      getInputList(input?.title, input?.description, handleChange, titleRef),
    [input?.title, input?.description]
  );

  const isButtonDisabled = useMemo(
    () => checkShouldDisableButton(input),
    [input]
  );

  useEffect(() => {
    if (isEditEnabled && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isEditEnabled]);

  return (
    <div className={isEditEnabled ? styles.itemInEditMode : styles.item}>
      {isEditEnabled ? (
        <FormComponent className={styles.editContainer} onSubmit={handleSubmit}>
          {inputItemsList.map((item) => (
            <InputComponent {...item} key={item?.name} />
          ))}
          <ButtonComponent
            type="submit"
            disabled={isButtonDisabled}
            buttonText={BUTTON_LABELS.EDIT_DONE}
          />
        </FormComponent>
      ) : (
        <TodoItemView title={title} description={description} />
      )}

      <div className={styles.buttonContainer}>
        <ButtonComponent
          onClick={handleEdit}
          buttonText={
            <img
              src={editIcon}
              alt={BUTTON_LABELS.EDIT}
              height="25px"
              width="25px"
            />
          }
          className={styles.editButton}
          title="edit"
        />
        <ButtonComponent
          onClick={handleRemove}
          buttonText={
            <img
              src={deleteIcon}
              alt={BUTTON_LABELS.DELETE}
              height="25px"
              width="25px"
            />
          }
          title="delete"
          className={styles.removeButton}
        />
      </div>
    </div>
  );
});

export default TodoItem;
