import React from "react";
import styles from "./NotFoundPage.module.scss";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1>404</h1>
      <p>This page does not exist 😕</p>
      <Link to="/">
        <span>Return to home page</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
