import React from "react";
import styles from "../TodoComponent/TodoComponent.module.scss";

const Placeholder = () => {
  return (
    <div className={styles.placeholder}>
      <div>No todo's available</div>
    </div>
  );
};

export default Placeholder;
