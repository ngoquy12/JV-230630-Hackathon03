import React from "react";
import Header from "./Header";
import ListProduct from "./ListProduct";
import { CartProvider } from "./CartProvider";

export default function Index() {
  return (
    <>
      <CartProvider>
        <Header />
        <ListProduct />
      </CartProvider>
    </>
  );
}
