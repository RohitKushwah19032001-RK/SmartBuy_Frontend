import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay,Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Home.module.css";

const HeroSection = ({ images }) => {
  const navigate = useNavigate();

  return (
    <Swiper   modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}   // ⭐ DOTS ENABLE
              loop={true} >

      {/* 🔥 SLIDE 1 */}
      <SwiperSlide>
        <div
          className={styles.slide}
          style={{ backgroundImage: `url(${images[0]})` }}
        >
          <div className={styles.darkOverlay}></div>

          <div className={styles.overlay}>
            <h1>Shop Smart,<br/> Shop Better,<br/> Shop with SmartBuy</h1>
            <p>
              Compare prices, shop from local stores, and get the best deals all
              in one place. Fast delivery and trusted vendors.
            </p>
            <button onClick={() => navigate("/products")}>
              Shop Now
            </button>
          </div>
        </div>
      </SwiperSlide>

      {/* 🔥 SLIDE 2 (RIGHT SIDE) */}
      <SwiperSlide>
        <div
          className={styles.slide}
          style={{ backgroundImage: `url(${images[1]})` }}
        >
          <div className={styles.rightOverlay}></div>

          <div className={`${styles.overlay} ${styles.rightContent}`}>
            <h1>Explore Reels & Trending Products</h1>
            <p>
              Watch product reels, discover trending items and shop smarter.
              Entertainment + Shopping in one platform.
            </p>
            <button onClick={() => navigate("/reels")}>
              Watch Reels
            </button>
          </div>
        </div>
      </SwiperSlide>

      {/* 🔥 SLIDE 3 */}
      <SwiperSlide>
        <div
          className={styles.slide}
          style={{ backgroundImage: `url(${images[2]})` }}
        >
          <div className={styles.darkOverlay}></div>

          <div className={styles.overlay}>
            <h1>Start Your Online Shop Today</h1>
            <p>
              Create your shop for just ₹50, sell products & grow your business with Smart_Buy.
            </p>
            <button onClick={() => navigate("/vendor")}>
              Register Shop
            </button>
          </div>
        </div>
      </SwiperSlide>

    </Swiper>
  );
};

export default HeroSection;