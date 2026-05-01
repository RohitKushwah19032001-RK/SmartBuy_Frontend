import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/searchBar.module.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ value, onChange, onClose, pages = [] }) => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (pages.length > 0) {
      const match = pages.some((page) =>
        location.pathname.includes(page)
      );
      setVisible(match);
    } else {
      setVisible(true);
    }
  }, [location, pages]);

  if (!visible) return null;

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search..."
          className={styles.input}
        />
        <span className={styles.icon}><FaSearch className={styles.icon1}/></span>
      </div>

      {onClose && (
        <button className={styles.closeBtn} onClick={onClose}>
          ✖
        </button>
      )}
    </div>
  );
};

export default SearchBar;