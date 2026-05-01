// BannerSection.jsx
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Home.module.css";

const BannerSection = ({ image }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.bannerContainer}>
    <div
      className={styles.banner}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.bannerContent}>
        <h1>Register Your Shop Today</h1>
        <p>Grow your business by reaching more customers just by paying ₹50 , <br/>Selling smarter with our platform .</p>
        
        <button onClick={() => navigate("/vendor")}>
          Register Shop Now
        </button>
      </div>
    </div>
    </div>
  );
};

export default BannerSection;