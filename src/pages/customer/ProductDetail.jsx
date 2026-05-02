import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../styles/ProductDetail.module.css";
import SimilarProducts from "../../components/SimilarProducts";
import { toast } from "react-toastify";
import API from "../../../api.js";

const ProductDetail = ({ setCartCount }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [amazonData, setAmazonData] = useState(null);
  const [loadingAmazon, setLoadingAmazon] = useState(false);

  // 🔥 FETCH PRODUCT DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const productRes = await axios.get(`${API}/api/product/${id}`);
        const allRes = await axios.get(`${API}/api/product/all`);

        setProduct(productRes.data.product);
        setAllProducts(allRes.data.products);

      } catch (error) {
        console.log("Fetch Error:", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 🔥 ADD TO CART
  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("Please login first");
        navigate("/register");
        return;
      }

      if (!product?._id) {
        toast.error("Invalid product");
        return;
      }

      await axios.post(
        `${API}/api/cart/add`,
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartCount((prev) => prev + 1);
      toast.success("✅ Added to cart");

    } catch (error) {
      console.log("Add To Cart Error:", error);

      if (error.response?.status === 401) {
        toast.warning("Session expired, login again");
        localStorage.removeItem("userToken");
        navigate("/login");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // 🔥 AMAZON COMPARE (FIXED)
  const compareAmazon = async () => {
    try {
      setLoadingAmazon(true);

      const { data } = await axios.get(
        `${API}/api/product/compare-amazon/${id}`
      );

      setAmazonData(data);

    } catch (error) {
      console.log(error);
      toast.error("Failed to compare");
    } finally {
      setLoadingAmazon(false);
    }
  };

  // 🔥 LOADING
  if (loading) return <h2>Loading product...</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.back} onClick={() => navigate(-1)}>
          ← Back
        </div>

        <div className={styles.left}>
          <img
            src={product?.image || "/default.png"}
            alt={product?.productName}
            className={styles.image}
          />
        </div>

          <div style={{ fontWeight: "normal", fontSize: "18px" }}>
              {product?.productName}
            </div>
          <h2 className={styles.price}>₹ {product?.price}</h2>

          <h3 className={styles.shopName}>
            Shop: {product?.shopId?.shopName || "Unknown"}
          </h3>

          <h4 className={styles.category}>
            Category: {product?.category}
          </h4>

          <div className={styles.tabs}>
            <span className={styles.active}>DESCRIPTION :</span>
            <p className={styles.desc}>
              {product?.description || "No description available"}
            </p>
          </div>

          <div className={styles.actionRow}>
            <button className={styles.cartBtn} onClick={addToCart}>
              ADD TO CART
            </button>

            <button
              className={styles.compareBtn}
              onClick={compareAmazon}
              disabled={loadingAmazon}
            >
              {loadingAmazon ? "Checking..." : "Compare with Amazon"}
            </button>
          </div>

          {/* 🔥 AMAZON RESULT (NEW ADDITION - NO CSS CHANGE) */}
          {amazonData && amazonData.success && (
            <div style={{ marginTop: "20px" }}>
              <h3>🛒 Amazon Comparison</h3>

              <p>
                <b>Local Price:</b> ₹{amazonData.local.price}
              </p>

              <p>
                <b>Amazon Price:</b>{" "}
                {amazonData.amazon.price
                  ? `₹${amazonData.amazon.price}`
                  : "Not available"}
              </p>

              {amazonData.amazon.link && (
                <a
                  href={amazonData.amazon.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Amazon
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <SimilarProducts
        products={allProducts}
        currentProduct={product}
      />
    </>
  );
};

export default ProductDetail;