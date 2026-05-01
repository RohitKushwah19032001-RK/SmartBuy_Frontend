import React,{useEffect,useState} from "react";
import axios from "axios";
import { useParams , useNavigate } from "react-router-dom";

import styles from "../../styles/SingleShop.module.css";

const SingleShop = ()=>{

 const {id} = useParams();
 const navigate = useNavigate();

 const [shop,setShop] = useState({});
 const [products,setProducts] = useState([]);
 const [reels,setReels] = useState([]);

 useEffect(()=>{

  // shop details
  axios.get(`${API}/api/shop/${id}`)
  .then(res=>{
   setShop(res.data.shop);
  });

  // products
  axios.get(`${API}/api/product/shop/${id}`)
  .then(res=>{
   setProducts(res.data.products);
  });

  // reels
  axios.get(`${API}/api/reel/shop/${id}`)
  .then(res=>{
   setReels(res.data.reels);
  });

 },[id]);


 return(

  <div className={styles.container}>


   {/* SHOP DETAILS */}
   <div className={styles.shopCard}>

    <img
     src={shop.image}
     className={styles.shopImage}
    />


    <div className={styles.shopInfo}>

     <h1>{shop.shopName}</h1>

     <p><b>Owner :</b> {shop.ownerName}</p>

     <p><b>Category :</b> {shop.category}</p>

     <p><b>Phone :</b> {shop.phone}</p>

     <p><b>Address :</b> {shop.address}</p>

     <p className={styles.desc}>
      {shop.description}
     </p>

    </div>

   </div>



   {/* PRODUCTS */}
   <div>

    <h2
     className={styles.title}
     onClick={()=>navigate("/products")}
    >
     Products
    </h2>


    {
     products.length === 0 ?

     <p className={styles.empty}>
      No Products Available
     </p>

     :

     <div className={styles.productGrid}>

      {
       products.map(p=>(

        <div
         key={p._id}
         className={styles.productCard}
         onClick={()=>navigate(`/product/${p._id}`)}
        >

         <img src={p.image}/>

         <h3>{p.productName}</h3>

         <p>₹ {p.price}</p>

        </div>

       ))
      }

     </div>

    }

   </div>



   {/* REELS */}
   <div>

    <h2
     className={styles.title}
     onClick={()=>navigate("/reels")}
    >
     Reels
    </h2>


    {
     reels.length === 0 ?

     <p className={styles.empty}>
      No Reels Available
     </p>

     :

     <div className={styles.reelGrid}>

      {
       reels.map(r=>(

        <div
         key={r._id}
         className={styles.reelCard}
         onClick={()=>navigate(`/reels/${r._id}`)}
        >

         <video
          src={r.video}
          muted
          loop
          playsInline
          onMouseEnter={(e)=> e.target.play()}
          onMouseLeave={(e)=> e.target.pause()}
         />

        </div>

       ))
      }

     </div>

    }

   </div>



  </div>

 )

}

export default SingleShop;