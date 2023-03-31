import { Routes, Route } from "react-router";
import { lazy } from "react";

const ProductCatalogPage = lazy(
  () =>
    import(/* webpackChunkName: "ProductCatalogPage"*/ "./ProductCatalogPage")
);
const CartPage = lazy(
  () => import(/* webpackChunkName: "CartPage"*/ "./CartPage")
);
const OneProductPage = lazy(
  () => import(/* webpackChunkName: "OneProductPage"*/ "./OneProductPage")
);
const NotFoundPage = lazy(
  () => import(/* webpackChunkName: "NotFoundPage"*/ "./NotFoundPage")
);

// TODO: useResetScrollAtEveryPage();

const Routing = () => (
  <Routes>
    <Route path="/" element={<ProductCatalogPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/product/:id/" element={<OneProductPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
export default Routing;
