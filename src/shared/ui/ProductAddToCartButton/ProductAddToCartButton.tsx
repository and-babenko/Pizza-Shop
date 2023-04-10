import React from "react";
import styles from "./ProductAddToCartButton.module.scss";
import { UilPlus } from "@iconscout/react-unicons";

type ProductAddToCartButtonType = {
  onClickHandler: () => void;
  inCartAmount: number;
};

const ProductAddToCartButton: React.FC<ProductAddToCartButtonType> = ({
  onClickHandler,
  inCartAmount,
}) => {
  return (
    <button className={styles.productAddToCartButton} onClick={onClickHandler}>
      <UilPlus />
      <span>Add</span>
      <i>{inCartAmount}</i>
    </button>
  );
};

export default ProductAddToCartButton;
