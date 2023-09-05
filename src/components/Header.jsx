import React, { useEffect, useState } from "react";
import ListCart from "./ListCart";
import { useCart } from "./CartProvider";

export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const { cart } = useCart(); // Lấy giỏ hàng từ CartContext

  // Đóng danh sách cart
  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <>
      <header
        style={{ zIndex: 101 }}
        className="d-flex position-sticky top-0 align-items-end justify-content-between p-4 bg-warning"
      >
        <div className="d-flex gap-3">
          <div className="currsor-pointer text-white fw-semibold">
            Shopping Cart
          </div>
          <div className="currsor-pointer text-white fw-semibold">
            Trang chủ
          </div>
          <div className="currsor-pointer text-white fw-semibold">
            Danh mục sản phẩm
          </div>
          <div className="currsor-pointer text-white fw-semibold">
            Về chúng tôi
          </div>
          <div className="currsor-pointer text-white fw-semibold">Liên hệ</div>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setShowCart(!showCart)}
        >
          <i className="fa-solid fa-cart-shopping position-relative fs-4">
            <span
              style={{ fontSize: 10 }}
              className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            >
              {cart.length}
            </span>
          </i>
        </div>
      </header>
      {showCart && <ListCart handleCloseCart={handleCloseCart} />}
    </>
  );
}
