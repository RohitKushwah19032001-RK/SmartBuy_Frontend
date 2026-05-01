import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/customer/Home";
import Products from "./pages/customer/Products";
import Cart from "./pages/customer/Cart";
import Orders from "./pages/customer/Orders";
import Login from "./pages/customer/Login";
import Register from "./pages/customer/Register";
import Shops from "./pages/customer/Shops";
import Reels from "./pages/customer/Reel";
import ProductDetail from "./pages/customer/ProductDetail";
import SingleShop from "./pages/customer/SingleShop";

import VendorNavbar from "./components/VendorNavbar";
import VendorAddProduct from "./pages/vendor/VendorAddProduct";
import VendorOrders from "./pages/vendor/VendorOrders";
import VendorLogin from "./pages/vendor/VendorLogin";
import VendorRegister from "./pages/vendor/VendorRegister";
import VendorReelUpload from "./pages/vendor/VendorReelUpload";
import VendorShopProducts from "./pages/vendor/VendorShopProducts";
import VendorReel from "./pages/vendor/VendorReel";
import VendorDashboard from "./pages/vendor/VendorDashboard";

import Navbar from "./components/Navbar";
import FullscreenReels from "./pages/customer/FullscreenReels";
import OrderTrace from "./pages/customer/OrderTrace";
import OrderSuccess from "./pages/customer/OrderSuccess";
import About from "./pages/customer/About";
import VendorPaymentSuccess from "./pages/vendor/VendorPaymentSuccess";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <Navbar cartCount={cartCount} setCartCount={setCartCount} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart setCartCount={setCartCount}/>} />
        <Route path="/order" element={<Orders />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/product/:id"
          element={<ProductDetail setCartCount={setCartCount} />}
        />

        <Route path="/shop/:id" element={<SingleShop />} />
        <Route path="/reels/:id" element={<FullscreenReels />} />
        <Route path="/order-trace" element={<OrderTrace />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* Vendor */}
        <Route path="/vendor/register" element={<VendorRegister />} />
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor" element={<VendorNavbar />} />
        <Route path="/vendor/add-product" element={<VendorAddProduct />} />
        <Route path="/vendor/orders" element={<VendorOrders />} />
        <Route path="/vendor/reelupload" element={<VendorReelUpload />} />
        <Route path="/vendor/products" element={<VendorShopProducts />} />
        <Route path="/vendor/reel" element={<VendorReel />} />

        <Route path="/vendor/payment-success" element={<VendorPaymentSuccess />}/>
       
      </Routes>

      <ToastContainer position="top-center"  />
    </>
  );
}

export default App;