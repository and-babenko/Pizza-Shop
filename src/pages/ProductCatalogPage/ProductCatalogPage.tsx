import React from "react";
import styles from "./ProductCatalogPage.module.scss";

import Header from "modules/Header";
import ProductsModule from "modules/ProductsModule";

const ProductCatalogPage: React.FC = () => {
  return (
    <div className={styles.productCatalogPage}>
      <Header />
      <ProductsModule />
    </div>
  );
};

export default ProductCatalogPage;
