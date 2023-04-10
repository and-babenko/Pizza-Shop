import React from "react";
import styles from "./ErrorBoundry.module.scss";

const ErrorBoundry: React.FC = () => {
  return (
    <div className={styles.errorBoundry}>
      <h1>Oups!</h1>
      <h2>Something went wrong!</h2>
      <button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Go to home page
      </button>
    </div>
  );
};

export default ErrorBoundry;
