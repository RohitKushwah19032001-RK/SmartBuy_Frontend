import React, {useState} from "react";
import axios from "axios";
import styles from "../../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import API from "../../../api.js";

const Login = () => {

 const navigate = useNavigate();

 const [form,setForm] = useState({
  email:"",
  password:""
 });

 const changeHandler = (e)=>{
  setForm({
   ...form,
   [e.target.name]:e.target.value
  });
 };

 const submitHandler = async(e)=>{
  e.preventDefault();

  try {

   const res = await axios.post(
    `${API}/api/user/login`,
    form
   );

   if (res.data.success) {

     // 🔥 SAVE TOKEN
     localStorage.setItem("token", res.data.token);
     localStorage.setItem("user", JSON.stringify(res.data.user));

     toast.success(res.data.message);

     setTimeout(() => {
       navigate("/");
       window.location.reload();
     }, 1000);

   } else {
     toast.error(res.data.message);
   }

  } catch (error) {
   console.log(error);
   toast.error("Something went wrong");
  }
 };

 return (
  <div className={styles.container}>
   <form onSubmit={submitHandler} className={styles.form}>

    <h2>Customer Login</h2>

    <input
     type="email"
     name="email"
     placeholder="Email"
     onChange={changeHandler}
     required
    />

    <input
     type="password"
     name="password"
     placeholder="Password"
     onChange={changeHandler}
     required
    />

    <button>Login</button>

    <p onClick={()=>navigate("/register")}>
     Create account
    </p>

   </form>
  </div>
 );
};

export default Login;