import React from "react";
import styles from "./TodoComponent.module.scss";

const TodoItemView = (props) => {
  const { title = "", description = "" } = props;
  return (
    <div className={styles.todoItemView}>
      <div className={styles.title} title={title}>
        {title}
      </div>
      <div className={styles.description} title={description}>
        {description}
      </div>
    </div>
  );
};

export default TodoItemView;
