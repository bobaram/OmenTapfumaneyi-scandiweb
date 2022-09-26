import React from "react";
import classes from "./Body.module.css";
import ProductPage from "./ProductPage/ProductPage";
import { Route, Routes } from "react-router-dom";
import Cart from "./CartPage/Cart";
import Products from "./Products";
import Context from "../context/Context";
class Body extends React.Component {
  render() {
    return (
      <section className={classes.body}>
        <Routes>
          <Route path="products/:id/*" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product-page/:id" element={<ProductPage />} />
        </Routes>
      </section>
    );
  }
}
Body.contextType = Context;
export default Body;
