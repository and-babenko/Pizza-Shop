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
        Корзина пустая <span>😕</span>
      </h2>
      <p>Для заказа перейдите на главную страницу.</p>
      <img src={emptyCartImage} alt="Cart" />
      <Link to="/">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

const CartModule: React.FC = () => {
  const dispatch = useDispatch();
  const {
    items: itemsFromCart,
    totalCount,
    totalPrice,
  } = useSelector(cartSelector);

  const cartItemsList = itemsFromCart.map((elem) => (
    <CartItem key={elem.id} {...elem} />
  ));

  if (itemsFromCart.length === 0) return <EmpryCart />;

  return (
    <div className={styles.cartModule}>
      <header className={styles.header}>
        <h2>
          <UilShoppingCartAlt className={styles.iconCart} />
          Корзина
        </h2>
        <div>
          <UilTrashAlt className={styles.iconTrash} />

          <span
            onClick={() => {
              dispatch(deleteAllItems());
            }}
          >
            Очистить корзину
          </span>
        </div>
      </header>

      <div className={styles.contentItems}>{cartItemsList}</div>

      <div className={styles.cartTotal}>
        <span>
          Всего пицц: <b>{totalCount} шт.</b>
        </span>
        <span>
          Сумма заказа: <b>{totalPrice} ₽</b>
        </span>
      </div>

      <div className={styles.bottomButtons}>
        <Link to="/" className={styles.returnBtn}>
          <UilAngleLeft className={styles.iconReturn} />
          <span>Вернуться назад</span>
        </Link>

        <button className={styles.payBtn}>
          <span>Оплатить сейчас</span>
        </button>
      </div>
    </div>
  );
};

export default CartModule;
