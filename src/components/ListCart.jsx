import React, { useState } from "react";
import { formatMoney } from "./../common/index";
import { useCart } from "./CartProvider";

export default function ListCart({ handleCloseCart }) {
  const { loadData } = useCart(); // Nhận từ component CartProvider thông qua useContext()
  // Lấy dữ liệu trên local
  const [carts, setCarts] = useState(() => {
    const productLocal = JSON.parse(localStorage.getItem("carts")) || [];
    return productLocal;
  });

  /**
   * Tính tổng giá tiền
   */
  const totalPrice = carts.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price * currentValue.quantity;
  }, 0);

  // Kiểm tra vị trí của product trên local
  const checkProductIndex = (id, array) => {
    return array.findIndex((item) => item.product_id === id);
  };

  // Lưu dữ liệu lên local
  const saveCartLocal = (array) => {
    if (!Array.isArray) return;
    localStorage.setItem("carts", JSON.stringify(array));
  };

  /**
   * Hàm lưu và load lại dữ liệu
   * @param {*} newArray mảng cần lưu
   */
  const handleSaveData = (newArray) => {
    saveCartLocal(newArray);
    setCarts(newArray);
    loadData(newArray);
  };

  // Tăng số lượng
  const handleIncrease = (id) => {
    const productIndex = checkProductIndex(id, carts);
    // Tăng số lượng sản phẩm lên
    const updatedCart = [...carts];
    updatedCart[productIndex].quantity += 1;
    handleSaveData(updatedCart);
    // saveCartLocal(updatedCart);
    // setCarts(updatedCart);
    // loadData(updatedCart);
  };

  // Giảm số lượng
  const handleDecrease = (id) => {
    const productIndex = checkProductIndex(id, carts);
    const updatedCart = [...carts];
    // Giảm số lượng sản phẩm đi, nhưng đảm bảo không nhỏ hơn 1
    if (updatedCart[productIndex].quantity > 1) {
      updatedCart[productIndex].quantity -= 1;
      handleSaveData(updatedCart); // Cách 1
      // saveCartLocal(updatedCart); // Cách 2 hơi dài dòng nên tách 1 hàm riêng
      // setCarts(updatedCart);
      // loadData(updatedCart);
    } else {
      const updatedCart = carts.filter((item) => item.product_id !== id);
      handleSaveData(updatedCart); // Cách 1
      // saveCartLocal(updatedCart); // Cách 2 hơi dài dòng nên tách 1 hàm riêng
      // setCarts(updatedCart);
      // loadData(updatedCart);
    }
  };

  return (
    <div
      className="position-absolute end-0 bg-secondary p-3 d-flex flex-column "
      style={{ zIndex: 100, height: "calc(100vh - 90px)" }}
    >
      <h2 className="fw-500 p-3 text-white">Carts</h2>
      <div
        className="d-flex gap-3 flex-column"
        style={{ maxHeight: "470px", overflowY: "auto" }}
      >
        {carts.length === 0 ? (
          <>
            <h3>Chưa có sản phẩm trong giỏ hàng </h3>
            <h3>🤔🤔🤔🤔🤔🤔🤔🤔</h3>
          </>
        ) : (
          <>
            {carts.map((cart) => (
              <div className="d-flex gap-3 align-items-center justify-content-between p-2">
                <img
                  style={{ borderRadius: "50%" }}
                  height={80}
                  width={80}
                  src={cart.image}
                />
                <div className="text-white">{cart.product_name}</div>
                <div className="text-white">{cart.price}</div>
                <div>
                  <button
                    onClick={() => handleDecrease(cart.product_id)}
                    className="btn-count"
                  >
                    -
                  </button>
                  <span className="quantity">{cart.quantity}</span>
                  <button
                    onClick={() => handleIncrease(cart.product_id)}
                    className="btn-count"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div
        className="position-absolute p-3"
        style={{ bottom: 0, width: "97%" }}
      >
        <div className="text-white d-flex justify-content-between align-items-center pt-2">
          <div className="total text-black">
            Total: {formatMoney(totalPrice)}
          </div>
          <button
            onClick={handleCloseCart}
            className="close-btn btn btn-danger"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
