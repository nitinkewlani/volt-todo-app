import React, { useCallback, useEffect, useRef, useState } from "react";
import { STORAGE_KEYS } from "../../constants";
import { getItem, setItem } from "../../utils/localStorage";
import Placeholder from "../Placeholder/Placeholder";
import AddContainer from "./AddContainer";
import Header from "./Header";
import List from "./ListComponent";
import styles from "./TodoComponent.module.scss";

const TodoComponent = () => {
  const listFromStorage = getItem(STORAGE_KEYS.TODO_ITEMS) || [];
  const [list, setList] = useState([...listFromStorage]);
  const listRef = useRef(null);

  const scrollNewItemInView = () => {
    if (listRef.current) {
      listRef.current?.lastElementChild?.scrollIntoView({
        behaviour: "smooth",
        block: "end",
        inline: "end",
      });
    }
  };

  const handleSubmit = (input = {}) => {
    setList((prev) => [...prev, input]);
  };

  const handleRemove = useCallback(
    (index = 0) => {
      if (index >= 0) {
        setList((prevList) => {
          const updatedList = [...prevList];
          updatedList.splice(index, 1);
          return updatedList;
        });
      }
    },
    [setList]
  );

  const handleEditDone = useCallback(
    (index = 0, updatedInput = {}) => {
      setList((prevList) => {
        const updatedList = [...prevList];
        updatedList[index] = updatedInput;
        return updatedList;
      });
    },
    [setList]
  );

  useEffect(() => {
    setItem(STORAGE_KEYS.TODO_ITEMS, list);
    if (list.length > 0) {
      scrollNewItemInView();
    }
  }, [list]);

  return (
    <div className={styles.todoWrapper}>
      <Header />
      <AddContainer onSubmit={handleSubmit} />
      {list.length > 0 ? (
        <List
          list={list}
          onRemove={handleRemove}
          onEditDone={handleEditDone}
          ref={listRef}
        />
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

export default TodoComponent;
