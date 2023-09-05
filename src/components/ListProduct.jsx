import React, { useState } from "react";
import listProduct from "../data/products.json";
import { useCart } from "./CartProvider";
import { formatMoney } from "./../common/index";
export default function ListProduct() {
  const { Products } = listProduct;

  const { addToCart } = useCart();

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    addToCart(product);
  };
  return (
    <div className="d-flex gap-3 p-3 flex-wrap justify-content-center align-items-center">
      {Products.map((product) => (
        <div
          className="card"
          style={{ width: "18rem" }}
          key={product.product_id}
        >
          <img src={product.image} className="card-img-top" alt="ảnh món ăn " />
          <div className="card-body text-center">
            <h5 className="card-title ">{product.product_name}</h5>
            <p className="card-text ">{formatMoney(product.price)}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="btn btn-primary"
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
