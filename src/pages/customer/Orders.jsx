import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../../styles/OrderCustomer.module.css";
import API from "../../../api.js";

const Orders = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [method, setMethod] = useState("COD");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${API}/api/cart/my-cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(data.cart?.items || []);
    } catch (error) {
      console.log("Fetch Cart Error:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cart.reduce(
    (acc, item) =>
      acc + (item.productId?.price || 0) * (item.quantity || 0),
    0
  );

  const delivery = 5;
  const total = subtotal + delivery;

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${API}/api/order/place`,
        {
          name: form.firstName + " " + form.lastName,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          paymentMethod: method,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!data.success) {
        toast.warning(data.message);
        return;
      }

      if (method === "COD") {
        navigate("/order-trace");
        return;
      }

      const stripe = await axios.post(
        `${API}/api/payment/stripe/customer`,
        {
          amount: data.amount,
          orderId: data.orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.href = stripe.data.url;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Checkout Order</h2>

      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.main}>
        {/* LEFT FORM */}
        <div className={styles.left}>
          <h2>Delivery Address</h2>

          <div className={styles.row2}>
            <input placeholder="First Name"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />

            <input placeholder="Last Name"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />
          </div>

          <input placeholder="Phone Number"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <input placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          <div className={styles.row2}>
            <input placeholder="City"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
            />

            <input placeholder="State"
              value={form.state}
              onChange={(e) =>
                setForm({ ...form, state: e.target.value })
              }
            />
          </div>

          <input placeholder="Pincode"
            value={form.pincode}
            onChange={(e) =>
              setForm({ ...form, pincode: e.target.value })
            }
          />
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <h2>Order Summary</h2>

          {/* ITEMS */}
          <div className={styles.itemsBox}>
            {cart.map((item) => (
              <div key={item.productId?._id} className={styles.item}>
                <img src={item.productId?.image || "/default.png"} />

                <div>
                  <p className={styles.proName}>
                    {item.productId?.productName}
                  </p>
                  <p className={styles.qty}>Qty: {item.quantity}</p>
                </div>

                <p className={styles.price}>
                  ₹ {(item.productId?.price || 0) * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* BILL */}
          <div className={styles.billBox}>
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
          </div>

          {/* PAYMENT */}
          <div className={styles.payment}>
            <label>
              <input
                type="radio"
                checked={method === "COD"}
                onChange={() => setMethod("COD")}
              />
              COD
            </label>

            <label>
              <input
                type="radio"
                checked={method === "Stripe"}
                onChange={() => setMethod("Stripe")}
              />
              Card
            </label>
          </div>

          <button className={styles.orderBtn} onClick={placeOrder}>
            Checkout Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;