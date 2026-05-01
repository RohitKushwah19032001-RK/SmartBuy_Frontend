import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/VendorOrder.module.css";
import VendorNavbar from "../../components/VendorNavbar";
import { toast } from "react-toastify";
import API from "../../../api.js";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [rejectBox, setRejectBox] = useState(null);
  const [reason, setReason] = useState("");

  const token = localStorage.getItem("vendorToken");


  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/order/shop-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(data.orders || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ ACCEPT (UI SAME)
  const acceptOrder = async (id) => {
    try {
      await axios.post(
        `${API}/api/order/accept-reject`,
        { orderId: id, isAccepted: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order accepted");
      fetchOrders();
    } catch (error) {
      console.log(error);
      toast.error("Failed to accept order");
    }
  };

  // ✅ REJECT (UI SAME)
  const rejectOrder = async () => {
    if (!reason) {
      toast.warning("Select reason");
      return;
    }

    try {
      await axios.post(
        `${API}/api/order/accept-reject`,
        {
          orderId: rejectBox,
          isAccepted: false,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order rejected");
      setRejectBox(null);
      setReason("");
      fetchOrders();
    } catch (error) {
      console.log(error);
      toast.error("Failed to reject order");
    }
  };

  // ✅ STATUS UPDATE
  const updateStatus = async (id, status) => {
    if (status === "Update") return;

    try {
      await axios.post(
        `${API}/api/order/update-status`,
        { orderId: id, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status updated");
      fetchOrders();
    } catch (error) {
      console.log(error);
      toast.error("Status update failed");
    }
  };

  return (
    <>
      <VendorNavbar />

      <div className={styles.container}>
        <div className={styles.tableWrapper}>
          
          {/* HEADER */}
          <div className={styles.header}>
            <div className={styles.header1}>Product</div>
            <div className={styles.header2}>Customer & Address</div>
            <div className={styles.header3}>Payment</div>
            <div className={styles.header4}>Status</div>
            <div className={styles.header5}>Action</div>
          </div>

          {/* ROWS */}
          {orders.map((order) => (
            <div key={order._id} className={styles.row}>

              {/* PRODUCT */}
              <div className={styles.cell}>
                {order.items.map((item, idx) => (
                  <div key={idx} className={styles.product}>
                    <img src={item.image} alt={item.name} />

                    <div className={styles.productInfo}>
                      <p>{item.name}</p>
                      <span>Qty: {item.quantity}</span>
                      <br />
                      <span>₹{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CUSTOMER */}
              <div className={styles.cell}>
                <p className={styles.customerName}>
                  {order.customer.name}
                </p>

                <span className={styles.phone}>
                  {order.customer.phone}
                </span>

                <p className={styles.address}>
                  {order.customer.address},{" "}
                  {order.customer.city},{" "}
                  {order.customer.state} -{" "}
                  {order.customer.pincode}
                </p>
              </div>

              {/* PAYMENT */}
              <div className={styles.cellCenter}>
                <span
                  className={
                    order.payment ? styles.paid : styles.pending
                  }
                >
                  {order.payment ? "Paid" : "Pending"}
                </span>
              </div>

              {/* STATUS */}
              <div className={styles.cellCenter}>
                <span className={styles.status}>
                  {order.status}
                </span>
              </div>

              {/* ACTION (UNCHANGED UI) */}
              <div className={styles.cellCenter}>
                {order.isAccepted === null ? (
                  <div className={styles.actions}>
                    <button
                      className={styles.accept}
                      onClick={() => acceptOrder(order._id)}
                    >
                      Accept
                    </button>

                    <button
                      className={styles.reject}
                      onClick={() => setRejectBox(order._id)}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <select
                    className={styles.select}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                  >
                    <option>Update</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Out for Delivery">
                      Out for Delivery
                    </option>
                    <option value="Delivered">Delivered</option>
                  </select>
                )}
              </div>

              {/* REJECT BOX (UNCHANGED UI) */}
              {rejectBox === order._id && (
                <div className={styles.rejectRow}>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  >
                    <option value="">Select reason</option>
                    <option value="Shop Closed">Shop Closed</option>
                    <option value="Not in Stock">Not in Stock</option>
                    <option value="Delay">Delay</option>
                  </select>

                  <button onClick={rejectOrder}>
                    Submit
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VendorOrders;