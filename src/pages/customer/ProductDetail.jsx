import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../styles/ProductDetail.module.css";
import SimilarProducts from "../../components/SimilarProducts";
import {toast} from 'react-toastify'
import API from '../../../api.js'

const ProductDetail = ({ setCartCount }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [amazonData, setAmazonData] = useState(null);
  const [loadingAmazon, setLoadingAmazon] = useState(false);

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const productRes = await axios.get(
          `${API}/api/product/${id}`
        );

        const allRes = await axios.get(
          `${API}/api/product/all`
        );

        setProduct(productRes.data.product);
        setAllProducts(allRes.data.products);
      } catch (error) {
        console.log("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 🔥 AMAZON COMPARE
  const compareAmazon = async () => {
    try {
      setLoadingAmazon(true);

      const { data } = await axios.get(
        `${API}/api/product/compare-amazon/${id}`
      );

      setAmazonData(data);
    } catch (error) {
      console.log("Amazon Compare Error:", error);
    } finally {
      setLoadingAmazon(false);
    }
  };

  // 🔥 ADD TO CART
  const addToCart = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Please login first");
      navigate("/login");
      return;
    }

    await axios.post(
      `${API}/api/cart/add`,
      { productId: product._id, quantity: 1 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCartCount((prev) => prev + 1);
    toast.success("Added to cart");

  } catch (error) {
    console.log(error);

    if (error.response?.status === 401) {
      toast.warning("Session expired, login again");
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      toast.error("Something went wrong");
    }
  }
};

  // 🔥 GOOGLE COMPARE
  const comparePrice = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/compare/${id}`
      );

      if (data.googleCompareLink) {
        window.open(data.googleCompareLink, "_blank");
      } else {
        toast.info("Compare link not available");
      }
    } catch (error) {
      console.log("Compare Error:", error);
    }
  };

  // 🔥 LOADING UI
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

        <div className={styles.right}>
          <h1 className={styles.title}>{product?.productName}</h1>
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

          {/* 🔥 AMAZON RESULT */}
          {amazonData && (
            <div className={styles.amazonContainer}>
              <h3>Amazon Price</h3>

              <div className={styles.amazonBox}>
                <div className={styles.amazonBox2}>
                  {amazonData.amazonImage && (
                    <img
                      src={amazonData.amazonImage}
                      alt="amazon"
                      className={styles.amazonImage}
                    />
                  )}

                  {amazonData.amazonLink && (
                    <a
                      href={amazonData.amazonLink}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.amazonLink}
                    >
                      View on Amazon
                    </a>
                  )}
                </div>

                <div className={styles.amazonBox1}>
                  {amazonData.amazonPrice ? (
                    <>
                      <p>
                        {product?.shopId?.shopName} Price: ₹{" "}
                        {amazonData.localPrice}
                      </p>
                      <p>Amazon Price: ₹ {amazonData.amazonPrice}</p>
                    </>
                  ) : (
                    <p className={styles.notFound}>
                      Product not found on Amazon
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <p className={styles.compareBtng} onClick={comparePrice}>
            🔍 Compare on Google Shopping
          </p>
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