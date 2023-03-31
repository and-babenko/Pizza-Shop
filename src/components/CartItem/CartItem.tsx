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
  const {
    id,
    imageUrl,
    name,
    price,
    currentPizzaType,
    currentPizzaSize,
    count,
  } = props;

  const dispatch = useDispatch();

  return (
    <div className={styles.cartItem}>
      <div className={styles.info}>
        <img src={imageUrl} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>
            {currentPizzaType}, {currentPizzaSize} см, {price}$
          </p>
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

      <b className={styles.price}>{price * count}$</b>

      <button
        onClick={() => {
          dispatch(deleteItem({ id, count }));
        }}
        className={styles.remove}
      >
        <UilTimes />
      </button>
    </div>
  );
};

export default CartItem;
