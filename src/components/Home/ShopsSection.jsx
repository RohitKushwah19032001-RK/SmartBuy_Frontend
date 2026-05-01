import { useNavigate } from "react-router-dom";
import styles from "../../styles/Home.module.css";

const ShopsSection = ({ shops, storeImg }) => {
  const navigate = useNavigate();

  return (
    <section className={styles.shopSection}>
      <div className={styles.shopLeft}>
        <img src={storeImg} alt="store" />

        <div className={styles.shopOverlay}>
          
          {/* TOP SPACE */}
          <div className={styles.topSpace}></div>
                 

          {/* SHOP CARDS */}
          <div className={styles.shopRight} >
            {shops.map((shop) => (
              <div key={shop._id} className={styles.shopCard}  onClick={() => navigate(`/shop/${shop._id}`)} >
                <img src={shop.image} alt={shop.name} />

                <div className={styles.shopcard1}>
                  <h4>{shop.name || shop.shopName}</h4>
                  <p>{shop.category || "General"}</p>
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM CONTENT */}
          <div className={styles.shopOverlay1}>
            <h4>Shop Smart with SmartBuy</h4>
            <p>Discover nearby stores and shop smarter every day.</p>

            <button onClick={() => navigate("/shops")}>
              Explore Shops
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShopsSection;