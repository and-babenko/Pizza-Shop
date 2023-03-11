import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
//TODO SWITCH AND REDIRECT ???

import "./styles/app.scss";

import Home from "./pages/Home";

// import ProductPage from "./components/ProductPage";
// import NotFound from "./pages/NotFound";
import HeaderLayout from "./layouts/HeaderLayout";
// import Cart from "./pages/Cart";

const ProductPage = React.lazy(
  () => import(/* webpackChunkName: "NotFound"*/ "./components/ProductPage")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound"*/ "./pages/NotFound")
);
const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart"*/ "./pages/Cart")
);

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HeaderLayout />}>
          <Route path="" element={<Home />} />
          <Route
            path="cart"
            element={
              <Suspense fallback={<div>Идёт загрузка...</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="product/:id/"
            element={
              <Suspense fallback={<div>Идёт загрузка...</div>}>
                <ProductPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Идёт загрузка...</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
