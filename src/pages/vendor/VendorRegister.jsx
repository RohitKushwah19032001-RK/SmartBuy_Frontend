import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/vendorRegister.module.css";
import API from "../../../api.js";

const VendorRegister = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    shopName: "",
    email: "",
    password: "",
    ownerName: "",
    phone: "",
    address: "",
    city: "",      
    state: "",     
    pincode: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const categories = [
    { label: "Electronics", value: "Electronics" },
    { label: "Grocery", value: "Grocery" },
    { label: "Clothes", value: "Clothes" },
    { label: "Mobile Accessories", value: "MobileAccessories" },
    { label: "Medical", value: "Medical" },
    { label: "Footwear", value: "Footwear" },
    { label: "Beauty", value: "Beauty" },
    { label: "Stationery", value: "Stationery" },
    { label: "Sports", value: "Sports" },
    { label: "Furniture", value: "Furniture" },
    { label: "Shoes", value: "Shoes" },
    { label: "Other", value: "Other" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "shopName" ? value.toUpperCase() : value,
    }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  //   setPreview(URL.createObjectURL(file));
  // };

  //   const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  //   setPreview(URL.createObjectURL(file));
  // };


  // 🔥 UPDATED ONLY THIS FUNCTION (STRIPE ADDED)
 const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const data = new FormData();

    Object.keys(formData).forEach((key) =>
      data.append(key, formData[key])
    );

    if (image) data.append("image", image);

    // ✅ DIRECT REGISTER (NO STRIPE)
    const res = await axios.post(
      `${API}/api/shop/register`,
      data
    );

    if (res.data.success) {
      toast.success(res.data.message);
      navigate("/vendor/login");
    } else {
      toast.error(res.data.message);
    }

  } catch (err) {
    console.log(err);
    toast.error("❌ Server error");
  }

  setLoading(false);
};


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Shop Registration Here</h2>

      <form onSubmit={handleSubmit}>
        <input
          className={styles.inputField}
          name="shopName"
          placeholder="Shop Name"
          onChange={handleChange}
          required
        />

        <input
          className={styles.inputField}
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          className={styles.inputField}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <input
          className={styles.inputField}
          name="ownerName"
          placeholder="Owner Name"
          onChange={handleChange}
          required
        />

        <input
          className={styles.inputField}
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />

        <input
          className={styles.inputField}
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <div className={styles.row}>
  <input
    className={styles.inputField}
    name="city"
    placeholder="City"
    onChange={handleChange}
    required
  />

  <input
    className={styles.inputField}
    name="state"
    placeholder="State"
    onChange={handleChange}
    required
  />

  <input
    className={styles.inputField}
    name="pincode"
    placeholder="Pin Code"
    onChange={handleChange}
    required
  />
</div>

        <select
          name="category"
          className={styles.inputField}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <input
          className={styles.inputField}
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        {/* <input
          className={styles.inputField}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        /> */}
{/* 
        {preview && (
          <div className={styles.previewContainer}>
            <img
              src={preview}
              alt="Preview"
              className={styles.previewImage}
            />
          </div>
        )} */}

        <button
          className={styles.submitButton}
          type="submit"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Register Your Shop"}
        </button>

        <p onClick={() => navigate("/vendor/login")}>Login</p>
      </form>
    </div>
  );
};

export default VendorRegister;