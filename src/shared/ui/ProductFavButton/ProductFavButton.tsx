import React, { useState } from "react";
import styles from "./ProductFavButton.module.scss";

import { UilHeart } from "@iconscout/react-unicons";

type ProductFavProps = {
  likesNubmer: number;
};

const ProductFavButton: React.FC<ProductFavProps> = ({ likesNubmer }) => {
  const [liked, setLiked] = useState(false);

  const calcLikesNumber = liked ? likesNubmer + 1 : likesNubmer;

  return (
    <div className={styles.productFavButton}>
      <button
        onClick={() => setLiked(!liked)}
        className={`${styles.favButton} ${liked ? styles.liked : ""}`}
      >
        <UilHeart />
      </button>
      <span className={styles.favCount}>{calcLikesNumber}</span>
    </div>
  );
};

export default ProductFavButton;
