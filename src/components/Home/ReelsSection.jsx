// ReelsSection.jsx
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Home.module.css";

const ReelsSection = ({ image }) => {
  const navigate = useNavigate();

  return (
    <section className={styles.reelSection}>
      
      <img src={image} alt="reel" />

      {/* 🔥 YE ADD KARNA THA */}
      <div className={styles.reelOverlay}>
    <h2>Shop Through Reels</h2>
<p>See products in action and shop smarter with real video insights.</p>

        <button onClick={() => navigate("/reels")}>
          View Reels
        </button>
      </div>

    </section>
  );
};

export default ReelsSection