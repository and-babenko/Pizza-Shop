import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { PizzaItemType } from "../redux/slices/pizzasSlice";

const ProductPage = () => {
  const [product, setProduct] = useState<PizzaItemType>();
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  useEffect(() => {
    // TODO Хук не может быть асинхронным, только функция внутри
    (async function fetchProduct() {
      try {
        const { data } = await axios.get<PizzaItemType>(
          "https://63d4ec9fc52305feff6abce9.mockapi.io/items/" + id
        );
        setProduct(data);
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    })();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {product && (
        <div className="container">
          <img src="" alt="" />
          <h2>{product.name}</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Doloremque, quas.
          </p>
          <h4>{product.price}</h4>
        </div>
      )}
    </>
  );
};

export default ProductPage;
