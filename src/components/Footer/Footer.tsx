import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Note: on backend combination of search by pre-selected filters does not
        work.
      </p>
      <nav>
        <p>
          Check{" "}
          <a
            href="https://github.com/and-babenko/simple-ecommerce/blob/prod/README.md"
            target="_blank"
          >
            readme
          </a>{" "}
          for details
        </p>
        <p>
          Return to{" "}
          <a href="https://andbabenko-portfolio.vercel.app/" target="_blank">
            portfolio
          </a>
        </p>
      </nav>
    </footer>
  );
};

export default Footer;
