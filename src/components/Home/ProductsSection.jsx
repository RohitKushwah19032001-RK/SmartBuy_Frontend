import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Home.module.css";

const ProductsSection = ({ products }) => {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      
      {/* HEADER */}
      <div className={styles.sectionHeader}>
        <h2>Products</h2>

        <button
          className={styles.viewAllBtn}
          onClick={() => navigate("/products")}
        >
          View All <FaArrowRight />
        </button>
      </div>

      {/* PRODUCTS */}
      <div className={styles.productGrid}>
        {products.slice(0, 4).map((item) => (
          <div key={item._id} className={styles.card}>
            
            <img src={item.image} alt="" />

            {/* ⚠️ FIX NAME */}
            <h4>{item.productName || item.name}</h4>

            {/* VIEW BUTTON */}
            <button
              className={styles.cardBtn}
              onClick={() => navigate(`/product/${item._id}`)}
            >
              View
            </button>

          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;