import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Cart.module.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from '../../../api.js'

const Cart = ({ setCartCount }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const delivery = 5;

  // ✅ GET TOKEN (COMMON)
  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // ✅ FETCH CART
  const fetchCart = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/cart/my-cart`,
        getAuthHeader()
      );

      setCart(data.cart?.items || []);
      setCartCount(data.cart?.items?.length || 0);

    } catch (error) {
      console.log("Fetch Cart Error:", error);
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ UPDATE QTY (FIXED)
  const updateQty = async (id, qty) => {
    if (qty < 1) return;

    try {
      await axios.post(
        `${API}/api/cart/update-qty`,
        {
          productId: id,
          quantity: qty,
        },
        getAuthHeader()
      );

      fetchCart();
    } catch (error) {
      console.log("Update Qty Error:", error);
      toast.error("Failed to update quantity");
    }
  };

  // ✅ REMOVE ITEM (FIXED)
  const removeItem = async (id) => {
    try {
      await axios.post(
        `${API}/api/cart/remove`,
        {
          productId: id,
        },
        getAuthHeader()
      );

      toast.success("Item removed from cart!");
      fetchCart();

    } catch (error) {
      console.log("Remove Item Error:", error);
      toast.error("Failed to remove item");
    }
  };

  // ✅ CALCULATIONS
  const subtotal = cart.reduce(
    (acc, item) =>
      acc + (item.productId?.price || 0) * (item.quantity || 0),
    0
  );

  const total = subtotal + delivery;

  return (
    <div className={styles.container}>
      <ToastContainer position="top-center" autoClose={2000} />

      <h1 className={styles.title}>Cart</h1>

      <div className={styles.main}>
        {cart.length === 0 && <p>Your cart is empty 🛒</p>}

        {cart.map((item) => (
          <div
            key={item.productId?._id}
            className={styles.card}
          >
            {/* IMAGE */}
            <img
              src={item.productId?.image || "/default.png"}
              alt=""
            />

            {/* INFO */}
            <div className={styles.info}>
              <h3>{item.productId?.productName}</h3>

              <p className={styles.shop}>
                Shop:{" "}
                {item.productId?.shopId?.shopName || "Unknown"}
              </p>
            </div>

            {/* QTY */}
            <div className={styles.qty}>
              <button
                onClick={() =>
                  updateQty(
                    item.productId?._id,
                    item.quantity - 1
                  )
                }
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  updateQty(
                    item.productId?._id,
                    item.quantity + 1
                  )
                }
              >
                +
              </button>
            </div>

            {/* PRICE */}
            <h3 className={styles.price}>
              ₹ {(item.productId?.price || 0) * item.quantity}
            </h3>

            {/* REMOVE */}
            <button
              className={styles.removeBtn}
              onClick={() =>
                removeItem(item.productId?._id)
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      {cart.length > 0 && (
        <div className={styles.bill}>
          <h3>Summary</h3>

          <div className={styles.row}>
            <span>Subtotal</span>
            <span>₹ {subtotal}</span>
          </div>

          <div className={styles.row}>
            <span>Delivery</span>
            <span>₹ {delivery}</span>
          </div>

          <hr />

          <div className={styles.total}>
            <span>Total</span>
            <span>₹ {total}</span>
          </div>

          <button
            className={styles.orderBtn}
            onClick={() => navigate("/order")}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;