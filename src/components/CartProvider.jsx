import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Lấy dữ liệu từ local làm giá trị khởi tạo
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("carts")) || [];
  });

  // Load Lại dữ liệu khi có bất kì sự thay đổi dưới các component con
  const loadData = (newCart) => {
    setCart(newCart);
  };

  // Hàm lưu dữ liệu lên local
  const saveProductLocal = (array) => {
    localStorage.setItem("carts", JSON.stringify(array));
  };

  const addToCart = (product) => {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const productIndex = cart.findIndex(
      (item) => item.product_id === product.product_id
    );

    if (productIndex === -1) {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm nó vào với số lượng là 1
      const newCart = [...cart, { ...product, quantity: 1 }];
      setCart(newCart);
      saveProductLocal(newCart);
    } else {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
      const updatedCart = [...cart];
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
      saveProductLocal(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, loadData }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
