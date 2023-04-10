import React from "react";
import styles from "./CartModule.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  UilShoppingCartAlt,
  UilTrashAlt,
  UilAngleLeft,
} from "@iconscout/react-unicons";
import emptyCartImage from "shared/assets/imgs/empty-cart.png";

import { cartSelector, deleteAllItems } from "./cartSlice";
import CartItem from "components/CartItem";

const EmpryCart: React.FC = () => {
  return (
    <div className={styles.empty}>
      <h2>
        Cart is empty <span>😕</span>
      </h2>
      <p>Return to the catalog page to order</p>
      <img src={emptyCartImage} alt="Cart" />
      <Link to="/">
        <span>Return</span>
      </Link>
    </div>
  );
};

const CartModule: React.FC = () => {
  const dispatch = useDispatch();
  const {
    items: itemsInCart,
    totalCount,
    totalPrice,
  } = useSelector(cartSelector);

  const cartItemsList = itemsInCart.map((item, idx) => (
    <CartItem key={idx} {...item} />
  ));

  if (itemsInCart.length === 0) return <EmpryCart />;

  return (
    <div className={styles.cartModule}>
      <header className={styles.header}>
        <h2>
          <UilShoppingCartAlt className={styles.iconCart} />
          Cart
        </h2>
        <div>
          <UilTrashAlt className={styles.iconTrash} />

          <span
            onClick={() => {
              dispatch(deleteAllItems());
            }}
          >
            Clear cart
          </span>
        </div>
      </header>

      <div className={styles.contentItems}>{cartItemsList}</div>

      <div className={styles.cartTotal}>
        <span>
          Total amount: <b>{totalCount}</b>
        </span>
        <span>
          Order value: <b>{totalPrice}$</b>
        </span>
      </div>

      <div className={styles.bottomButtons}>
        <Link to="/" className={styles.returnBtn}>
          <UilAngleLeft className={styles.iconReturn} />
          <span>Exit</span>
        </Link>

        <button className={styles.payBtn}>
          <span>Pay now</span>
        </button>
      </div>
    </div>
  );
};

export default CartModule;
