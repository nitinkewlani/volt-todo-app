import React, { useCallback, useState } from "react";
import styles from "./TodoComponent.module.scss";
import TodoItem from "./TodoItem";
import { checkIfFunctionExists } from "./utils";

const ListComponent = React.forwardRef((props, listRef) => {
  const {
    list = [],
    onRemove = (index) => {},
    onEditDone = (index, input) => {},
  } = { ...props };
  const [editIndex, setEditIndex] = useState(null);

  const handleRemove = useCallback(
    (index = 0) => {
      if (checkIfFunctionExists(onRemove)) {
        onRemove(index);
      }
    },
    [onRemove]
  );

  const handleEditDone = useCallback(
    (index = 0, updatedInput) => {
      if (checkIfFunctionExists(onEditDone)) {
        onEditDone(index, updatedInput);
      }
    },
    [onEditDone]
  );

  return (
    <div className={styles.list} ref={listRef}>
      {list.map((item = {}, index = 0) => (
        <TodoItem
          key={item?.id || index}
          todo={{ ...item, index }}
          onClickRemove={() => handleRemove(index)}
          onClickEditDone={(updatedInput = {}) => {
            handleEditDone(index, updatedInput);
            setEditIndex(null);
          }}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
        />
      ))}
    </div>
  );
});

export default ListComponent;
