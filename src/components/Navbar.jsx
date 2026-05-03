import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/mainlogo.jpeg";
import API from "../../api.js";

import {
  FaHome,
  FaBoxOpen,
  FaVideo,
  FaShoppingCart,
  FaStore,
  FaUserTie,
  FaTruck,
  FaSignOutAlt,
  FaInfoCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { CiLogin } from "react-icons/ci";
import { AiOutlineShop } from "react-icons/ai";

const Navbar = ({ cartCount, setCartCount }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  // 🔥 LOCK BODY SCROLL WHEN MENU OPEN
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // CART COUNT
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await axios.get(`${API}/api/cart/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCartCount(res.data.cart?.length || 0);
      } catch {
        setCartCount(0);
      }
    };

    if (token) fetchCartCount();
  }, [token]);

  // CHECK USER
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(`${API}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) setUser(res.data.user);
        else setUser(null);

      } catch {
        setUser(null);
      }

      setLoading(false);
    };

    if (token) checkLogin();
    else setLoading(false);

  }, [token]);

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  if (loading) return null;

  return (
    <>
      <div className={styles.navWrapper}>
        <nav className={styles.navbar}>

          {/* LOGO */}
          <div className={styles.logo}>
            {/* <img src={logo} alt="logo" onClick={() => navigate("/")} /> */}
            <h2 onClick={() => navigate("/")}>SmartBuy</h2>
          </div>

          {/* HAMBURGER */}
          <div
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* LINKS */}
          <div className={`${styles.navLinks} ${menuOpen ? styles.activeMenu : ""}`}>

            <Link onClick={closeMenu} to="/" className={location.pathname === "/" ? styles.active : ""}>
              <FaHome /> Home
            </Link>

            <Link onClick={closeMenu} to="/products" className={location.pathname === "/products" ? styles.active : ""}>
              <FaBoxOpen /> Products
            </Link>

            <Link onClick={closeMenu} to="/shops" className={location.pathname === "/shops" ? styles.active : ""}>
              <FaStore /> Shops
            </Link>

            <Link onClick={closeMenu} to="/reels" className={location.pathname === "/reels" ? styles.active : ""}>
              <FaVideo /> Reels
            </Link>

            <Link onClick={closeMenu} to="/cart" className={location.pathname === "/cart" ? styles.active : ""}>
              <FaShoppingCart /> Cart
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </Link>

            <Link onClick={closeMenu} to="/order-trace" className={location.pathname === "/order-trace" ? styles.active : ""}>
              <FaTruck /> Order
            </Link>

            <Link onClick={closeMenu} to="/about" className={location.pathname === "/about" ? styles.active : ""}>
              <FaInfoCircle /> About
            </Link>

            <Link onClick={closeMenu} to="/vendor" className={location.pathname === "/vendor" ? styles.active : ""}>
              <AiOutlineShop /> Vendor
            </Link>

          </div>

          {/* USER */}
          <div className={styles.userSection}>
            {user ? (
              <>
                <span className={styles.userName}>Hi, {user.name}</span>
                <button onClick={logout} className={styles.logoutBtn}>
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.loginBtn}>
                  <CiLogin /> Login
                </Link>
                <Link to="/register" className={styles.loginBtn}>
                  <FaUserTie /> Register
                </Link>
              </>
            )}
          </div>

        </nav>
      </div>

      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default Navbar;