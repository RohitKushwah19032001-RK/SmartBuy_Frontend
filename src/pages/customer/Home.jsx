import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import Footer from "../../components/Footer";

import HeroSection from "../../components/Home/HeroSection";
import ProductsSection from "../../components/Home/ProductsSection";
import ShopsSection from "../../components/Home/ShopsSection";
import BannerSection from "../../components/Home/BannerSection";
import ReelsSection from "../../components/Home/ReelsSection";
import InfoSection from "../../components/Home/InfoSection";

import front from "../../assets/front1.jpg";
import reelImg from "../../assets/reel.jpg";
import store from "../../assets/store2.png";

import home1 from '../../assets/h1.jpg'
import home2 from '../../assets/h5.jpg'
import home3 from '../../assets/h4.jpg'
import API from "../../../api.js";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchShops();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get(`${API}/api/product/all`);
    setProducts(data.products.slice(0, 3));
  };

  const fetchShops = async () => {
    const { data } = await axios.get(`${API}/api/shop/all`);
    setShops(data.shops.slice(0, 1));
  };

  return (
    <>
      <div className={styles.home}>
        <HeroSection images={[home1, home2, home3]} />

        <ProductsSection products={products} />

        <ShopsSection shops={shops} storeImg={store} />

        <BannerSection image={front} />

        <ReelsSection image={reelImg} />

        <InfoSection />
      </div>

      <Footer />
    </>
  );
};

export default Home;