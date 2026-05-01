import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../../api.js";

// CSS Module
import styles from "../../styles/vendorLogin.module.css";

const VendorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${API}/api/shop/login`,
      formData
    );

    if (res.data.success) {
      // ✅ SAVE TOKEN
      localStorage.setItem("vendorToken", res.data.token);
      localStorage.setItem("vendor", JSON.stringify(res.data.shop));

      navigate("/vendor");
    } else {
      setError(res.data.message);
    }

  } catch (err) {
    console.log(err);
    setError("Something went wrong!");
  }
};

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Vendor Login</h2>
      {error && <p className={styles.errorMsg}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className={styles.inputField}
          type="email"
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
        <button className={styles.submitButton} type="submit">Login</button>
        <p onClick={()=>navigate('/vendor/register')}>Shop Register</p>
        
      </form>
    </div>
  );
};

export default VendorLogin;