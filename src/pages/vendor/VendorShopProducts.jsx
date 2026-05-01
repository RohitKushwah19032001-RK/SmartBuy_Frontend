import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/vendorShopProducts.module.css";
import VendorNavbar from "../../components/VendorNavbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api.js";

const VendorShopProducts = () => {

  const token = localStorage.getItem("vendorToken"); // 🔥 ADD THIS

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${API}/api/product/my-products`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 FIX
          },
        }
      );

      if (res.data.success) setProducts(res.data.products);

    } catch (err) {
      console.log(err);
      toast.error("Failed to load products");
    }
  };

  // DELETE
  const handleDelete = (id) => {
    toast.dismiss();

    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete?</p>

          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <button
              onClick={async () => {
                closeToast();

                const loadingToast = toast.loading("Deleting product...");

                try {
                  const res = await axios.delete(
                    `${API}/api/product/delete/${id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`, // 🔥 FIX
                      },
                    }
                  );

                  if (res.data.success) {
                    toast.update(loadingToast, {
                      render: "Product deleted successfully!",
                      type: "success",
                      isLoading: false,
                      autoClose: 2500,
                    });

                    setProducts((prev) =>
                      prev.filter((p) => p._id !== id)
                    );

                  } else {
                    toast.update(loadingToast, {
                      render: res.data.message || "Delete failed",
                      type: "error",
                      isLoading: false,
                      autoClose: 2500,
                    });
                  }

                } catch (err) {
                  console.log(err);

                  toast.update(loadingToast, {
                    render: "Error deleting product",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                  });
                }
              }}
              style={{
                background: "green",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Yes
            </button>

            <button
              onClick={() => closeToast()}
              style={{
                background: "red",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <VendorNavbar />
      <ToastContainer position="top-center" />

      <div className={styles.container}>
        {products.length === 0 && <p>No products added yet!</p>}

        <div className={styles.productGrid}>
          {products.map((p) => (
            <div key={p._id} className={styles.productCard}>
              <img src={p.image} alt={p.productName} className={styles.image} />

              <div className={styles.details}>
                <h3>{p.productName}</h3>
                <p>₹{p.price}</p>
                <p>{p.category}</p>
                <p className={styles.desc}>{p.description}</p>

                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VendorShopProducts;