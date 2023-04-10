import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./OneProductPage.module.scss";
import axios from "axios";

import { IProductItem } from "modules/ProductsModule";
import ProductDetailed from "components/ProductDetailed";
import Header from "modules/Header";
import Footer from "components/Footer";

const OneProductPage: React.FC = () => {
  const [product, setProduct] = useState<IProductItem>();
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  // Probably it would be better to put ProductDetailed to separate model and move the request inside...

  useEffect(() => {
    (async function fetchProduct() {
      try {
        const { data } = await axios.get<IProductItem>(
          "https://63d4ec9fc52305feff6abce9.mockapi.io/items/" + id
        );
        setProduct(data);
      } catch (err) {
        console.log(err);
        navigate("/404", { replace: true });
      }
    })();
  }, []);

  return (
    <div className={styles.oneProductPage}>
      <Header />
      {product ? <ProductDetailed productData={product} /> : ""}
      <Footer />
    </div>
  );
};

export default OneProductPage;
