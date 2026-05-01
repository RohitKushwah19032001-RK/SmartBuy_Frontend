import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/FullscreenReels.module.css";
import { IoArrowBack } from "react-icons/io5";
import API from "../../../api.js";

const FullscreenReels = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reels, setReels] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    const fetchReels = async () => {
      const { data } = await axios.get(`${API}/api/reel/all`);
      setReels(data.reels);
    };
    fetchReels();
  }, []);

  const initialIndex = reels.findIndex((r) => r._id === id);

  useEffect(() => {
    if (reels.length > 0 && containerRef.current && initialIndex >= 0) {
      const child = containerRef.current.children[initialIndex];
      if (child) child.scrollIntoView({ behavior: "instant" });
    }
  }, [reels, initialIndex]);

  // Auto play/pause
  const handleScroll = () => {
    const children = Array.from(containerRef.current.children);

    children.forEach((child) => {
      const video = child.querySelector("video");
      const rect = child.getBoundingClientRect();

      if (rect.top >= 0 && rect.top < window.innerHeight * 0.5) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  return (
    <div className={styles.pageWrapper}>
      
      {/* BACK BUTTON LEFT TOP FIXED */}
      <button className={styles.close} onClick={() => navigate(-1)}>
        <IoArrowBack />
      </button>

      <div
        className={styles.container}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {reels.map((item) => (
          <div key={item._id} className={styles.reelCard}>

            {/* REEL VIDEO */}
            <video
              src={item.video}
              className={styles.video}
              loop
              playsInline
              muted={false}
            />

            {/* TEXT AREA BELOW VIDEO */}
            <div className={styles.infoBox}>
              <div className={styles.shopName} onClick={() => navigate(`/shop/${item.shopId?._id}`)}>
                {item.shopId?.shopName}
              </div>

              <div className={styles.overlayTitle}>
                {item.title}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default FullscreenReels;