import React, {useState} from "react";
import axios from "axios";
import styles from "../../styles/Register.module.css";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import API from "../../../api.js";

const Register = () => {

 const navigate = useNavigate();

 const [form,setForm] = useState({

  name:"",
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
    `${API}/api/user/register`,
     form
    );

   toast.success(res.data.message);

   if(res.data.success){
    

    navigate("/login");

   }

  } catch (error) {

   console.log(error);

  }

 };

 return (

  <div className={styles.container}>

   <form
    onSubmit={submitHandler}
    className={styles.form}
   >

    <h2>Customer Register</h2>

    <input
     type="text"
     name="name"
     placeholder="Name"
     onChange={changeHandler}
     required
    />

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

    <button>
     Register
    </button>

    <p
     onClick={()=>navigate("/login")}
    >
     Already account? Login
    </p>

   </form>

  </div>

 );

};

export default Register;