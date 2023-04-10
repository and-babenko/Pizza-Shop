import React from "react";
import styles from "./CartPage.module.scss";

import CartModule from "modules/CartModule";
import Header from "modules/Header";
import Footer from "components/Footer";

const CartPage: React.FC = () => {
  return (
    <div className={styles.cartPage}>
      <Header />
      <CartModule />
      <Footer />
    </div>
  );
};

export default CartPage;
