import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer.jsx";
import styles from "../../styles/OrderTrace.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api.js";

const OrderTrace = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${API}/api/order/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(data.orders || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    const token = localStorage.getItem("token");

    toast(
      ({ closeToast }) => (
        <div>
          <p>Cancel this order?</p>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={async () => {
                try {
                  await axios.post(
                    `${API}/api/order/cancel`,
                    { orderId: id },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  toast.success("Order cancelled");
                  fetchOrders();
                  closeToast();
                } catch (error) {
                  toast.error("Failed to cancel order");
                  closeToast();
                }
              }}
            >
              Yes
            </button>

            <button onClick={closeToast}>No</button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const steps = [
    "Order Placed",
    "Confirmed",
    "Dispatched",
    "Out for Delivery",
    "Delivered",
  ];

  return (
    <>
      <ToastContainer position="top-center" />

      <div className={styles.container}>
        <h1>My Orders</h1>

        {loading && <p>Loading...</p>}

        {!loading && orders.length === 0 && <p>No orders found</p>}

        {orders.map((order) => (
          <div key={order._id} className={styles.card}>
            <div className={styles.topRow}>
              <div className={styles.products}>
                {order.items?.map((item, idx) => (
                  <div key={idx} className={styles.item}>
                    <img src={item.image || "/default.png"} />
                    <div>
                      <p>{item.name}</p>
                      <p>Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.info}>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Status: {order.status}</p>
              </div>

              <div>
                {order.status !== "Delivered" &&
                  order.status !== "Cancelled by Customer" && (
                    <button onClick={() => cancelOrder(order._id)}>
                      Cancel Order
                    </button>
                  )}
              </div>
            </div>

            <div className={styles.timeline}>
              {steps.map((step, i) => {
                const active = order.tracking?.some(
                  (t) => t.text === step
                );

                return (
                  <div
                    key={i}
                    className={active ? styles.stepActive : styles.step}
                  >
                    {step}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default OrderTrace;