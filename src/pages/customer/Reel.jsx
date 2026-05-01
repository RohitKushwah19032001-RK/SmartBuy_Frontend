import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Reel.module.css";
import Footer from '../../components/Footer.jsx'
import SearchBar from "../../components/SearchBar.jsx";
import API from "../../../api.js";

const Reels = () => {
  const [reels, setReels] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchReels = async () => {
    const { data } = await axios.get(`${API}/api/reel/all`);
    setReels(data.reels);
  };

  useEffect(() => {
    fetchReels();
  }, []);

  const filteredReels = reels.filter((item) =>
    (item.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <div className={styles.container}>

      {/* HEADER + SEARCH */}
      <div className={styles.topBar}>
        <h1 className={styles.title}>Reels</h1>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className={styles.grid}>
        {filteredReels.map((item) => (
          <div
            key={item._id}
            className={styles.card}
            onClick={() => navigate(`/reels/${item._id}`)}
          >
            <video
              src={item.video}
              className={styles.video}
              muted={false}
              loop
              playsInline
              onMouseEnter={(e) => {
                e.target.muted = false;
                e.target.play();
              }}
              onMouseLeave={(e) => {
                e.target.pause();
                e.target.currentTime = 0;
              }}
            />

            <div
              className={styles.shopName}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/shop/${item.shopId._id}`);
              }}
            >
              {item.shopId?.shopName || "Shop"}
            </div>

            <div className={styles.overlay}>
              <p className={styles.overlay1}>{item.title || "Reel"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </>
  );
};

export default Reels;