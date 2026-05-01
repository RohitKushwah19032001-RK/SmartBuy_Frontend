import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Products.module.css";
import SearchBar from "../../components/SearchBar.jsx";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Footer from "../../components/Footer.jsx";
import API from "../../../api.js"; // 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [category, setCategory] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate();

  // ⭐ SUB CATEGORY MAP (same)
  const subCategoryMap = {
    Electronics: [
      "mobile","laptop","tablet","earbuds","headphones","charger","speaker",
      "tv","camera","smartwatch","power bank","gaming console","printer"
    ],
    Grocery: [
      "rice","atta","dal","oil","sugar","salt","tea","coffee",
      "spices","snacks","biscuits","noodles","dry fruits","beverages"
    ],
    Clothes: [
      "shirt","t-shirt","jeans","jacket","saree","kurti",
      "hoodie","shorts","track pants","blazer","sweater","innerwear"
    ],
    MobileAccessories: [
      "charger","data cable","earphones","power bank","cover",
      "screen protector","mobile holder","bluetooth headset","car charger"
    ],
    Medical: [
      "tablet","syrup","bandage","thermometer","mask",
      "sanitizer","first aid kit","bp monitor","glucose meter"
    ],
    Footwear: [
      "shoes","sandals","slippers","boots",
      "sports shoes","formal shoes","heels","flip flops"
    ],
    Beauty: [
      "lipstick","cream","perfume","shampoo",
      "conditioner","face wash","makeup kit","hair oil"
    ],
    Stationery: [
      "pen","notebook","marker","file",
      "pencil","eraser","sharpener","highlighter","register"
    ],
    Sports: [
      "cricket bat","football","badminton",
      "dumbbells","yoga mat","tennis racket","skipping rope"
    ],
    Furniture: [
      "chair","table","sofa",
      "bed","wardrobe","desk","cabinet","stool"
    ],
    Other: [
      "general item","gift item","pet product","baby product","tool"
    ]
  };

  const allSubCategories = Object.values(subCategoryMap).flat();

  const visibleCategories = showAll
    ? allSubCategories
    : allSubCategories.slice(0, 5);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/api/product/all`);
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const filteredProducts = products
    .filter((item) =>
      item.productName.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      category
        ? item.category?.toLowerCase() === category.toLowerCase()
        : true
    )
    .sort((a, b) => {
      if (sortType === "low-high") return a.price - b.price;
      if (sortType === "high-low") return b.price - a.price;
      return 0;
    });

  const capitalize = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <>
      <div className={styles.container}>
        {/* TOP BAR */}
        <div className={styles.topBar}>
          <h1 className={styles.title}>Products</h1>

          <div className={styles.searchWrapper}>
            <SearchBar value={search} onChange={setSearch} />
          </div>

          <select
            className={styles.filter}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="low-high">Low → High</option>
            <option value="high-low">High → Low</option>
          </select>
        </div>

        {/* MAIN */}
        <div className={styles.main}>
          {/* SIDEBAR */}
          <div className={styles.sidebar}>
            <h3>Sub Categories</h3>

            <label>
              <input
                type="radio"
                name="category"
                onChange={() => setCategory("")}
              />
              All
            </label>

            {visibleCategories.map((sub) => (
              <label key={sub}>
                <input
                  type="radio"
                  name="category"
                  value={sub}
                  onChange={(e) => setCategory(e.target.value)}
                />
                {capitalize(sub)}
              </label>
            ))}

            <button
              className={styles.showMoreBtn}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>Show Less <FaChevronUp /></>
              ) : (
                <>Show More <FaChevronDown /></>
              )}
            </button>
          </div>

          {/* PRODUCTS */}
          <div className={styles.products}>
            {loading ? (
              <p>Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              <div className={styles.grid}>
                {filteredProducts.map((item) => (
                  <div key={item._id} className={styles.card}>
                    <img
                      src={item.image}
                      className={styles.image}
                      alt={item.productName}
                    />

                    <h3>{item.productName}</h3>

                    <p className={styles.price}>
                      ₹ {item.price}
                    </p>

                    <span className={styles.categoryTag}>
                      {item.category}
                    </span>

                    <button
                      onClick={() =>
                        navigate(`/product/${item._id}`)
                      }
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Products;