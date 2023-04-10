import React, { useState } from "react";
import styles from "./CatalogItem.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IProductItem } from "modules/ProductsModule";
import { addItemToCart, itemInCartSelector } from "modules/CartModule";

import ProductFavButton from "shared/ui/ProductFavButton";
import ProductAddToCartButton from "shared/ui/ProductAddToCartButton";
import PortionSelector from "shared/ui/PortionSelector";

const CatalogItem: React.FC<IProductItem> = ({
  id,
  name,
  rating,
  shortDescription,
  portions,
}) => {
  const dispatch = useDispatch();
  const [currentPortion, setCurrentProtion] = useState(portions[0]);
  const isItemInCart = useSelector(itemInCartSelector(id, currentPortion));
  const image = require(`../../shared/assets/productImgs/${id}.jpg`);

  const addToCartHandler = () => {
    const item = {
      id,
      name,
      portion: currentPortion,
      count: 1,
    };
    dispatch(addItemToCart(item));
  };

  const inCartAmount = isItemInCart ? isItemInCart.count : 0;

  return (
    <div className={styles.catalogItemContainer}>
      <Link className={styles.catalogItemLink} to={`/product/${id}`}>
        <div>
          <img src={image} alt={name} />
        </div>
        <h2>{name}</h2>
      </Link>

      <p className={styles.catalogItemDescription}>{shortDescription}</p>

      <PortionSelector
        portionsList={portions}
        selectedPortion={currentPortion}
        onClickHandler={setCurrentProtion}
      />

      <div className={styles.catalogItemFooter}>
        <ProductFavButton likesNubmer={rating} />
        <div>{currentPortion.price} $</div>
        <ProductAddToCartButton
          inCartAmount={inCartAmount}
          onClickHandler={addToCartHandler}
        />
      </div>
    </div>
  );
};

export default CatalogItem;
