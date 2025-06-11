import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './login.css'
import { addUserData, login_status_toggle } from '../../authStore/authSlice.js';
import axios from 'axios'
function Login(){
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loaded,setLoaded]=useState(false);
    // const formData=new FormData();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleSubmit=async()=>{
        // formData.append("userName",userName);
        // formData.append("email",email);
        // formData.append("password",password);
        setLoaded(true)

        try {
            const response=await axios.post("/api/v1/users/login",{userName,email,password}, { headers: {
                 "Content-Type": "application/json"
              },
              
                withCredentials:true
              
            })
            localStorage.setItem("userData", JSON.stringify(response.data.data));
            dispatch(addUserData(response.data.data));
            dispatch(login_status_toggle(true))
            alert("Login successfull!!")
            navigate("/")
        } catch (error) {
            console.log("Error : ", error);
            dispatch(login_status_toggle(false))
            alert("Login failed");

        }finally{setLoaded(false)}
        
    }
    if(loaded)
{
    return  <>
       <div className="loader-wrapper">
    <div className="loader"></div>
  </div>
      
    </>
}
return (<>
<div className="signup-container">
      <form className="signup-form"  onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit(e);
      }}>
        <h2>Login into your account</h2>

       
        <input type="text" placeholder="User Name" name="UserName"  onChange={(e)=>{
            setUserName(e.target.value);
        }}/>
        <input type="email" placeholder="Email Address" name="email" onChange={(e)=>{
            setEmail(e.target.value);
        }}/>
        <input type="password" placeholder="Password" name="password" onChange={(e)=>{
            setPassword(e.target.value)
        }}/>
      

        <button type="submit" disabled={loaded}>{loaded? 'Logging in ' : 'Login'}</button>

       
      </form>
    </div>

</>)
}
export default Login