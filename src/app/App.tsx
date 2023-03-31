import "./configs/normalize.scss";
import "shared/styles/global.scss";
import styles from "./App.module.scss";

import withProviders from "./providers";
import Routes from "pages";

const App = () => {
  return (
    <div className={styles.appContainer}>
      <Routes />
    </div>
  );
};

export default withProviders(App);
