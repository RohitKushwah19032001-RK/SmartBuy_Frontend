import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import VendorNavbar from "../../components/VendorNavbar";
import styles from "../../styles/vendorReel.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api.js";

const VendorReel = () => {
  const [reels, setReels] = useState([]);
  const videoRefs = useRef([]);

  const token = localStorage.getItem("vendorToken"); 

  // ✅ FETCH REELS
  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await axios.get(
          `${API}/api/reel/my-reels`,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );

        if (res.data.success) {
          setReels(res.data.reels);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to load reels");
      }
    };

    if (token) fetchReels();
  }, [token]);

  
  const handleMouseEnter = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = false;
      video.play();
    }
  };


  const handleMouseLeave = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }
  };

  // DELETE REEL
  const deleteReel = (id) => {
    const toastId = toast.info(
      <div>
        <p>⚠️ Are you sure you want to delete this reel?</p>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            onClick={async () => {
              toast.dismiss(toastId);

              const loadingToast = toast.loading("Deleting reel...");

              try {
                const res = await axios.delete(
                  `${API}/api/reel/delete/${id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`, // ✅ FIXED
                    },
                  }
                );

                if (res.data.success) {
                  setReels((prev) => prev.filter((r) => r._id !== id));

                  toast.update(loadingToast, {
                    render: "🗑️ Reel deleted successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 2500,
                  });
                } else {
                  toast.update(loadingToast, {
                    render: res.data.message || "Delete failed",
                    type: "error",
                    isLoading: false,
                    autoClose: 2500,
                  });
                }
              } catch (error) {
                console.log(error);

                toast.update(loadingToast, {
                  render: "❌ Delete failed!",
                  type: "error",
                  isLoading: false,
                  autoClose: 2500,
                });
              }
            }}
            style={{
              padding: "5px 10px",
              background: "red",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Yes
          </button>

          <button
            onClick={() => toast.dismiss(toastId)}
            style={{
              padding: "5px 10px",
              background: "gray",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  };

  return (
    <>
      <VendorNavbar />
      <ToastContainer position="top-center" />

      {reels.length === 0 && (
        <div className={styles.noreel}>
          <p>No reels added yet!</p>
        </div>
      )}

      <div className={styles.container}>
        {reels.map((reel, index) => (
          <div key={reel._id} className={styles.wrapper}>
            <div className={styles.card}>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={reel.video}
                className={styles.video}
                muted
                loop
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              />

              <div className={styles.shopName}>
                {reel.shopId?.shopName}
              </div>

              <div className={styles.overlay}>
                <h3>{reel.title}</h3>
                <p>{reel.description}</p>
              </div>
            </div>

            <button
              className={styles.deleteBtn}
              onClick={() => deleteReel(reel._id)}
            >
              Delete Reel
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default VendorReel;