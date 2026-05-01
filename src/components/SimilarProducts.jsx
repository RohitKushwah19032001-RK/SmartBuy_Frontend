import React from "react";
import styles from "../styles/SimilarProducts.module.css";
import { useNavigate } from "react-router-dom";

const SimilarProducts = ({ products, currentProduct }) => {
  const navigate = useNavigate();

  // 🟢 Filter same category products + exclude current product
  const filtered = products.filter(
    (item) =>
      item.category === currentProduct.category &&
      item._id !== currentProduct._id
  );

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Similar Products</h2>

      <div className={styles.grid}>
        {filtered.slice(0, 5).map((item) => (
          <div
            key={item._id}
            className={styles.card}
            onClick={() => navigate(`/product/${item._id}`)}
          >
            <img src={item.image} alt="" className={styles.image} />
            <h3 className={styles.title}>{item.productName}</h3>
            <p className={styles.price}>₹ {item.price}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className={styles.noItems}>No similar products found.</p>
      )}
    </div>
  );
};

export default SimilarProducts;