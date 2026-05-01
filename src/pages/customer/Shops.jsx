import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Shop.module.css";
import SearchBar from "../../components/SearchBar.jsx";
import Footer from '../../components/Footer.jsx'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import API from "../../../api.js";

const Shops = () => {

  const [shops,setShops] = useState([]);

  const [search,setSearch] = useState("");

  const [category,setCategory] = useState("");

  const [showAll,setShowAll] = useState(false);

  const navigate = useNavigate();


  // ⭐ SHOP CATEGORIES
  const categories = [

    "Electronics",
    "Grocery",
    "Clothes",
    "MobileAccessories",
    "Medical",
    "Footwear",
    "Beauty",
    "Stationery",
    "Sports",
    "furniture",
    "Other"

  ];


  const visibleCategories =

  showAll

  ?

  categories

  :

  categories.slice(0,5);


  useEffect(()=>{

    axios
    .get(
      `${API}/api/shop/all`
    )

    .then(res=>{

      setShops(
        res.data.shops
      );

    });

  },[]);


  // 🔎 FILTER
  const filteredShops =

  shops

  .filter(shop=>

    shop.shopName
    .toLowerCase()

    .includes(
      search.toLowerCase()
    )

  )

  .filter(shop=>

    category

    ?

    shop.category
    ?.toLowerCase()

    ===

    category
    .toLowerCase()

    :

    true

  );


  const capitalize = (text)=>{

    if(!text) return "";

    return text
    .charAt(0)
    .toUpperCase()

    + text.slice(1);

  };


  return(
    <>

    <div className={styles.container}>


      {/* TOP */}
      <div className={styles.topBar}>

        <h1 className={styles.title}>
          Shops
        </h1>


        <div className={styles.searchWrapper}>

          <SearchBar
            value={search}
            onChange={setSearch}
          />

        </div>

      </div>



      {/* MAIN */}
      <div className={styles.main}>


        {/* SIDEBAR */}
        <div className={styles.sidebar}>

          <h3>
            Categories
          </h3>


          <label>

            <input
              type="radio"
              name="category"

              onChange={()=>

                setCategory("")

              }
            />

            All

          </label>



          {

            visibleCategories.map(

              (cat)=>(

                <label key={cat}>

                  <input

                    type="radio"

                    name="category"

                    value={cat}

                    onChange={(e)=>

                      setCategory(
                        e.target.value
                      )

                    }

                  />

                  {

                    capitalize(cat)

                  }

                </label>

              )

            )

          }



          <button

            className={styles.showMoreBtn}

            onClick={()=>

              setShowAll(
                !showAll
              )

            }

          >

            {

              showAll

              ?

              <>Show Less <FaChevronUp/></>

              :

              <>Show More <FaChevronDown/></>

            }

          </button>


        </div>



        {/* SHOPS GRID */}
        <div className={styles.shops}>


          <div className={styles.grid}>


            {

              filteredShops.map(

                shop=>(

                  <div
                    key={shop._id}
                    className={styles.card}
                  >


                    <img
                      src={shop.image}
                      className={styles.image}
                    />


                    <h2 className={styles.name}>

                      {shop.shopName}

                    </h2>


                    <p className={styles.categoryTag}>

                      {capitalize(shop.category)}

                    </p>


                    <button

                      className={styles.viewBtn}

                      onClick={()=>

                        navigate(

                          `/shop/${shop._id}`

                        )

                      }

                    >

                      View Shop

                    </button>


                  </div>

                )

              )

            }


          </div>


        </div>


      </div>

    </div>
    <Footer />
    </>

  );

};

export default Shops;