import React from "react";
import { MY_TODO_APP } from "./constants";
import styles from "./TodoComponent.module.scss";

const Header = () => {
  return <div className={styles.header}>{MY_TODO_APP}</div>;
};

export default Header;
