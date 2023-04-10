import React from "react";
import { useDispatch } from "react-redux";
import styles from "./CartItem.module.scss";

import { UilMinus, UilPlus, UilTimes } from "@iconscout/react-unicons";

import {
  addItemToCart,
  ICartItem,
  removeItemFromCart,
} from "modules/CartModule";
import { deleteItem } from "modules/CartModule";

const CartItem: React.FC<ICartItem> = (props) => {
  const { id, name, count, portion } = props;

  const image = require(`../../shared/assets/productImgs/${id}.jpg`);
  const dispatch = useDispatch();

  const calculatedPrice = (portion.price * count).toFixed(2);

  return (
    <div className={styles.cartItem}>
      <div className={styles.info}>
        <img src={image} alt={name} />
        <div>
          <h3>
            {name}, {portion.weight}g
          </h3>
          <p>{portion.price}$</p>
        </div>
      </div>

      <div className={styles.count}>
        <button onClick={() => dispatch(removeItemFromCart(props))}>
          <UilMinus />
        </button>
        <b>{count}</b>
        <button onClick={() => dispatch(addItemToCart(props))}>
          <UilPlus />
        </button>
      </div>

      <b className={styles.price}>{calculatedPrice}$</b>

      <button
        onClick={() => {
          dispatch(deleteItem(props));
        }}
        className={styles.remove}
      >
        <UilTimes />
      </button>
    </div>
  );
};

export default CartItem;
