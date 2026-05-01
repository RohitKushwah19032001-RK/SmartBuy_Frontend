import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/vendorReelUpload.module.css";
import VendorNavbar from "../../components/VendorNavbar";
import API from "../../../api.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VendorReelUpload = () => {
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("vendorToken"); // ✅ TOKEN

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // ✅ validation (optional but good)
    if (file.size > 50 * 1024 * 1024) {
      toast.error("Video too large (max 50MB)");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setFormData({ ...formData, video: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.video) {
      toast.error("Please select a video");
      return;
    }

    setLoading(true);

    const toastId = toast.info("⏳ Uploading reel... please wait", {
      autoClose: false,
    });

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("video", formData.video);

      const res = await axios.post(
        `${API}/api/reel/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIXED
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.dismiss(toastId);

      if (res.data.success) {
        toast.success("🎉 Reel uploaded successfully!");

        setFormData({
          title: "",
          description: "",
          video: null,
        });

        setPreview(null);
      } else {
        toast.error(res.data.message || "Upload failed");
      }
    } catch (err) {
      console.log(err);

      toast.dismiss(toastId);
      toast.error("❌ Error uploading reel");
    }

    setLoading(false);
  };

  return (
    <>
      <VendorNavbar />
      <ToastContainer position="top-center" />

      <div className={styles.container}>
        <h2 className={styles.title}>Upload Reel</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="title"
            placeholder="Reel Title"
            value={formData.title}
            onChange={handleChange}
            className={styles.inputField}
            required
          />

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
              <span className={styles.text}> Add Reels </span>
            </div>

            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              hidden
            />
          </label>

          {preview && (
            <video src={preview} controls className={styles.preview} />
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Uploading..." : "Upload Reel"}
          </button>
        </form>
      </div>
    </>
  );
};

export default VendorReelUpload;