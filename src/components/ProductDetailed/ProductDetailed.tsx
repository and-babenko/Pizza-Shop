import React, { useState } from "react";
import styles from "./ProductDetailed.module.scss";

import { IProductItem } from "modules/ProductsModule";
import PortionSelector from "shared/ui/PortionSelector";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, itemInCartSelector } from "modules/CartModule";
import ProductAddToCartButton from "shared/ui/ProductAddToCartButton";
import ProductFavButton from "shared/ui/ProductFavButton";
import { Link } from "react-router-dom";

type ProductDetailedType = {
  productData: IProductItem;
};

const ProductDetailed: React.FC<ProductDetailedType> = ({ productData }) => {
  const { id, allergens, longDescription, name, rating, portions } =
    productData;

  const dispatch = useDispatch();
  const [currentPortion, setCurrentProtion] = useState(portions[0]);
  const isItemInCart = useSelector(itemInCartSelector(id, currentPortion));
  const inCartAmount = isItemInCart ? isItemInCart.count : 0;
  const addToCartHandler = () => {
    const item = {
      id,
      name,
      portion: currentPortion,
      count: 1,
    };
    dispatch(addItemToCart(item));
  };

  const image = require(`../../shared/assets/productImgs/${id}.jpg`);

  return (
    <div className={styles.productDetailed}>
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.image}>
        <img src={image} alt={name} />
      </div>
      <Link className={styles.returnBtn} to="/">
        <span>Exit</span>
      </Link>
      <p className={styles.description}>{longDescription}</p>
      <p className={styles.allergens}>
        <b>Allergens: </b>
        {allergens}
      </p>
      <div className={styles.sizePicker}>
        <PortionSelector
          portionsList={portions}
          selectedPortion={currentPortion}
          onClickHandler={setCurrentProtion}
        />
      </div>
      <div className={styles.btnBlock}>
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

export default ProductDetailed;
