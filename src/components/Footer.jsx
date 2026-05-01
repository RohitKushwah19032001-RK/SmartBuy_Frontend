import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import { FaGlobe, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* BRAND */}
        <div className={styles.section}>
          <h2>SmartBuy</h2>
          <p>
            Your smart shopping partner. Discover products, compare prices,
            and shop from trusted local and online stores.
          </p>
        </div>

        {/* CUSTOMER LINKS */}
        <div className={styles.section}>
          <h3>Customer</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/shops">Shops</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/order">Orders</Link>
          <Link to="/reels">Reels</Link>
        </div>

        {/* ACCOUNT */}
        <div className={styles.section}>
          <h3>Account</h3>
          {/* <Link to="/login">Login</Link>
          <Link to="/register">Register</Link> */}
          <Link to="/order-trace">Track Order</Link>
          
        </div>

        {/* VENDOR */}
        <div className={styles.section}>
          <h3>Become a Seller</h3>
          {/* <Link to="/vendor/register">Register Shop</Link>
          <Link to="/vendor/login">Vendor Login</Link> */}
          <Link to="/vendor">Dashboard</Link>
          <Link to="/vendor/add-product">Add Product</Link>
        </div>

      </div>

      {/* BOTTOM */}
          <div className={styles.bottom}>
      <p>© 2026 SmartBuy. All rights reserved.</p>

      <div className={styles.social}>
        <FaGlobe />
        <FaFacebookF />
        <FaInstagram />
        <FaTwitter />
      </div>
    </div>
  
    </footer>
  );
};

export default Footer;