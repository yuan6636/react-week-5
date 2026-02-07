import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import { formatCurrency } from "../utils/formatters";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Cart = () => {
  const [cart, setCart] = useState([]);
  
  const getCart = async() => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCart(res.data.data);
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      console.error('取得購物車失敗', errMsg);
    }
  }

  const updateQty = async (cartItem, delta) => {
    const { id: cartId, product: {id: productId}, qty} = cartItem;
    const data = {
      product_id: productId,
      qty: qty + delta > 0 ? qty + delta : 1,
    };
    
    try {
      await axios.put(`${API_BASE}/api/${API_PATH}/cart/${cartId}`, { data });
      getCart();
    } catch (error) {
      console.error('新增產品數量失敗', error?.response?.data?.message);
    }
  };

  const deleteCart = async (cartId) => {
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${cartId}`);
      alert('已成功刪除購物車商品！');
      getCart();
    } catch (error) {
      console.error('刪除購物車商品失敗', error?.response?.data?.message);
    }
  }

  const deleteCartAll = async () => {
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
      alert('已成功清空所有購物車商品！');
      getCart();
    } catch (error) {
      console.error('清空所有購物車商品失敗', error?.response?.data?.message);
    }
  };
  
  useEffect(() => {
    (async() => {
      getCart();
    })()
  }, [])

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h2>購物車列表</h2>
        <div>
          <Link to="/products" type="button" className="btn btn-secondary me-2">
            返回列表
          </Link>
          <button
            type="button"
            className={`btn btn-danger ${cart?.carts?.length === 0 && 'd-none'}`}
            onClick={() => deleteCartAll()}
          >
            清空購物車
          </button>
        </div>
      </div>
      <table className="table align-middle">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">品名</th>
            <th scope="col">數量/單位</th>
            <th scope="col">小計</th>
          </tr>
        </thead>
        <tbody>
          {cart?.carts?.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="fs-3 text-center text-success border-bottom-0"
              >
                購物車目前沒有商品，趕緊去選購吧！
              </td>
            </tr>
          )}
          {cart?.carts?.map((cartItem) => (
            <tr key={cartItem.id}>
              <th scope="row">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteCart(cartItem.id)}
                >
                  刪除
                </button>
              </th>
              <td>{cartItem.product.title}</td>
              <td>
                <div className="input-group w-50">
                  <button
                    className="btn btn-light p-1 border border-light-subtle"
                    type="button"
                    id="button-increaseQty"
                    onClick={() => updateQty(cartItem, 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                  </button>
                  <button
                    className="btn btn-light p-1 border border-light-subtle"
                    type="button"
                    id="button-decreaseQty"
                    onClick={() => updateQty(cartItem, -1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-dash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    className="form-control bg-white"
                    aria-label="商品數量"
                    aria-describedby="product-unit"
                    value={cartItem.qty}
                    disabled
                  />
                  <span className="input-group-text" id="product-unit">
                    {cartItem.product.unit}
                  </span>
                </div>
              </td>
              <td>{`NT${formatCurrency(cartItem.final_total)}`}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-end" colSpan={3}>
              總計
            </td>
            <td>{`NT${formatCurrency(cart.final_total)}`}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Cart;
