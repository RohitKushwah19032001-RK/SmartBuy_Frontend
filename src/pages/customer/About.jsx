import React from "react";
import styles from "../../styles/About.module.css";
import aboutImg from "../../assets/hi1.jpeg";
import Footer from '../../components/Footer.jsx'

const About = () => {
  return (
    <>
    <div className={styles.aboutContainer}>
      
      {/* LEFT IMAGE */}
      <div className={styles.imageSection}>
        <img src={aboutImg} alt="About SmartBuy" />
      </div>

      {/* RIGHT CONTENT */}
      <div className={styles.contentSection}>
        <h1>About SmartBuy</h1>

        <p>
          SmartBuy is a modern eCommerce platform designed to make shopping 
          smarter, faster, and more reliable. We connect customers with trusted 
          local and online shops, giving them the power to explore, compare, 
          and choose the best products.
        </p>

        <p>
          Our platform helps users discover trending products through reels, 
          compare prices across multiple shops, and make informed decisions 
          before buying. Whether you are shopping online or visiting nearby 
          stores, SmartBuy brings everything together in one place.
        </p>

        <p>
          For shop owners, SmartBuy provides an opportunity to grow their 
          business by creating an online presence while continuing offline 
          sales. Vendors can showcase products, upload reels, and reach a 
          larger audience effortlessly.
        </p>

        <p>
          Our mission is to bridge the gap between offline and online shopping 
          and create a smart ecosystem where both customers and sellers benefit.
        </p>
      </div>

    </div>
    <Footer />

    </>
  );
};

export default About;