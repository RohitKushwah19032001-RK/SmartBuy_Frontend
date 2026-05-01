import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/vendorNavbar.module.css";
import { toast } from "react-toastify";
import API from "../../api.js";

const VendorNavbar = () => {
  const navigate = useNavigate();

  const [shop, setShop] = useState(null);

  // 🔥 GET TOKEN
  const token = localStorage.getItem("vendorToken");

  // ✅ CHECK LOGIN
  useEffect(() => {
    const checkShopLogin = async () => {
      try {
        const res = await axios.get(
          `${API}/api/shop/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (res.data.success) {
          setShop(res.data.shop);
        } else {
          navigate("/vendor/login");
        }

      } catch (err) {
        navigate("/vendor/login");
      }
    };

    if (token) {
      checkShopLogin();
    } else {
      navigate("/vendor/login");
    }

  }, [navigate, token]);

  // ✅ IMAGE UPDATE
  const handleImageUpdate = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.put(
        `${API}/api/shop/update-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        setShop((prev) => ({
          ...prev,
          image: res.data.image,
        }));

        toast.success("Image updated successfully 🚀");
      }

    } catch (err) {
      console.log(err);
      toast.error("Image upload failed ❌");
    }
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendor");
    setShop(null);
    navigate("/vendor/login");
  };

  return (
    <div className={styles.vendorNavbar}>
      {shop && (
        <>
          {/* Header */}
          <div className={styles.vendorHeader}>
            <div className={styles.imageContainer}>
              <div className={styles.imageWrapper}>
                <img
                  src={shop.image || "https://via.placeholder.com/150"}
                  alt="shop"
                  className={styles.shopImage}
                />

                <label className={styles.uploadIcon}>
                  +
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleImageUpdate(e.target.files[0])
                    }
                  />
                </label>
              </div>

              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>

            <div className={styles.shopInfo}>
              <h2>{shop.shopName}</h2>
              <p>Owner : <span>{shop.ownerName}</span></p>
              <p>Category : <span>{shop.category}</span></p>
              <p>Phone : <span>{shop.phone}</span></p>
              <p>Address : <span>{shop.address}</span></p>
              <p>Description : <span>{shop.description}</span></p>
            </div>
          </div>

          {/* Links */}
          <div className={styles.navLinks}>
           <NavLink 
  to="/vendor/add-product" 
  className={({ isActive }) => isActive ? styles.activeLink : ""}
>
  Add Product
</NavLink>

<NavLink 
  to="/vendor/orders" 
  className={({ isActive }) => isActive ? styles.activeLink : ""}
>
  Orders
</NavLink>

<NavLink 
  to="/vendor/reelupload" 
  className={({ isActive }) => isActive ? styles.activeLink : ""}
>
  Reel Upload
</NavLink>

<NavLink 
  to="/vendor/products" 
  className={({ isActive }) => isActive ? styles.activeLink : ""}
>
  My Products
</NavLink>

<NavLink 
  to="/vendor/reel" 
  className={({ isActive }) => isActive ? styles.activeLink : ""}
>
  My Reels
</NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default VendorNavbar;