import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/vendorAddProduct.module.css";
import VendorNavbar from "../../components/VendorNavbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api.js";

const AddProduct = () => {

  const token = localStorage.getItem("vendorToken"); // 🔥 ADD THIS

  const [shopCategory, setShopCategory] = useState("");

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const subCategoryMap = {
    Electronics: ["mobile","laptop","tablet","earbuds","headphones","charger","speaker","tv","camera","smartwatch","power bank","gaming console","printer"],
    Grocery: ["rice","atta","dal","oil","sugar","salt","tea","coffee","spices","snacks","biscuits","noodles","dry fruits","beverages"],
    Clothes: ["shirt","t-shirt","jeans","jacket","saree","kurti","hoodie","shorts","track pants","blazer","sweater","innerwear"],
    MobileAccessories: ["charger","data cable","earphones","power bank","cover","screen protector","mobile holder","bluetooth headset","car charger"],
    Medical: ["tablet","syrup","bandage","thermometer","mask","sanitizer","first aid kit","bp monitor","glucose meter"],
    Footwear: ["shoes","sandals","slippers","boots","sports shoes","formal shoes","heels","flip flops"],
    Beauty: ["lipstick","cream","perfume","shampoo","conditioner","face wash","makeup kit","hair oil","serum","sunscream"],
    Stationery: ["pen","notebook","marker","file","pencil","eraser","sharpener","highlighter","register"],
    Sports: ["cricket bat","football","badminton","dumbbells","yoga mat","tennis racket","skipping rope"],
    Furniture: ["chair","table","sofa","bed","wardrobe","desk","cabinet","stool"],
    Shoes: ["sports shoes","running shoes","casual shoes","formal shoes","sneakers","boots","sandals","flip flops","loafers","heels"],
    Other: ["general item","gift item","pet product","baby product","tool"]
  };

  // 🔥 FIX: TOKEN HEADER ADD
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get(
          `${API}/api/shop/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 🔥 FIX
            },
          }
        );

        if (res.data.success) {
          setShopCategory(res.data.shop.category);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchShop();
  }, [token]);

  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setFormData({ ...formData, image: file });
  };

  // 🔥 FIX: TOKEN HEADER ADD HERE ALSO
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const loadingToast = toast.loading("Please wait, uploading product...");

    try {
      const data = new FormData();

      data.append("productName", formData.productName);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("category", formData.category);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await axios.post(
        `${API}/api/product/add`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // 🔥 FIX
          },
        }
      );

      if (res.data.success) {
        toast.update(loadingToast, {
          render: "Product added successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        setFormData({
          productName: "",
          price: "",
          description: "",
          category: "",
          image: null,
        });

        setPreview(null);

      } else {
        toast.update(loadingToast, {
          render: "Failed to add product",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }

    } catch (err) {
      console.log(err);

      toast.update(loadingToast, {
        render: "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const subCategories = subCategoryMap[shopCategory] || [];

  return (
    <>
      <VendorNavbar />
      <ToastContainer position="top-center" />

      <div className={styles.container}>
        <h2 className={styles.title}>Add Product</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            className={styles.inputField}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className={styles.inputField}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={styles.inputField}
            required
          >
            <option value="">Select Sub Category</option>
            {subCategories.map((cat) => (
              <option key={cat} value={cat}>
                {capitalizeFirst(cat)}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
          />

          <label className={styles.uploadBox}>
            <div className={styles.uploadContent}>
              <span className={styles.plus}>+ </span>
              <span className={styles.text}> Add Image </span>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>

          {preview && (
            <img src={preview} className={styles.preview} alt="preview" />
          )}

          <button
            className={styles.submitButton}
            disabled={loading}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;