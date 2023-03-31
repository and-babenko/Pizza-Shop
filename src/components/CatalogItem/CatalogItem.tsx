import React, { useState } from "react";
import styles from "./CatalogItem.module.scss";
import { Link } from "react-router-dom";

import { UilPlus } from "@iconscout/react-unicons";
import { IProductItem } from "modules/ProductsModule";
import { ICartItem } from "modules/CartModule/types";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, itemInCartSelector } from "modules/CartModule";

const CatalogItem: React.FC<IProductItem> = ({
  id,
  imageUrl,
  name,
  types,
  sizes,
  price,
}) => {
  const dispatch = useDispatch();
  const [currentType, setCurrentType] = useState(types[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0]);
  const isItemInCart = useSelector(itemInCartSelector(id));

  const addToCartHandler = () => {
    const item: ICartItem = {
      id,
      imageUrl,
      name,
      price,
      currentPizzaType: currentType,
      currentPizzaSize: currentSize,
      count: 1,
    };
    dispatch(addItemToCart(item));
  };

  const inCartAmount = isItemInCart ? isItemInCart.count : 0;

  return (
    <div className={styles.CatalogItem}>
      <Link to={`/product/${id}`}>
        <img src={imageUrl} alt={name} />
        <h3>{name}</h3>
      </Link>

      <div className={styles.selector}>
        <ul>
          {types.map((typeItem, index) => (
            <li
              key={index}
              className={currentType === typeItem ? styles.active : ""}
              onClick={() => setCurrentType(typeItem)}
            >
              {typeItem}
            </li>
          ))}
        </ul>

        <ul>
          {sizes.map((sizeItem, index) => (
            <li
              className={currentSize === sizeItem ? styles.active : ""}
              key={index}
              onClick={() => setCurrentSize(sizeItem)}
            >
              {sizeItem}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.bottom}>
        <div>от {price} ₽</div>
        <button onClick={addToCartHandler}>
          <UilPlus />
          <span>Добавить</span>
          <i>{inCartAmount}</i>
        </button>
      </div>
    </div>
  );
};

export default CatalogItem;
