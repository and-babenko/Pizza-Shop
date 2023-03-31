import React from "react";
import styles from "./CartPage.module.scss";

import CartModule from "modules/CartModule";
import Header from "modules/Header";

const CartPage: React.FC = () => {
  return (
    <div className={styles.cartPage}>
      <Header />
      <CartModule />
      <footer>Footer</footer>
    </div>
  );
};

export default CartPage;
