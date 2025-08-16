import React from 'react'
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import { addUserData, login_status_toggle } from '../../authStore/authSlice';
import axios from 'axios'
function SignUp(){

    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [age,setAge]=useState();
    const [avtar,setAvtar]=useState(null);
    const [coverImage,setCoverImage]=useState(null);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [loaded,setLoaded]=useState(false)

    const formData=new FormData();
    const handleSubmit=async()=>{

     formData.append("firstName",firstName);
     formData.append("lastName",lastName);
     formData.append("userName",userName);
     formData.append("email",email);
     formData.append("password",password);
     formData.append("age",age);
     formData.append("avtar",avtar);
     formData.append("coverImage",coverImage);
     setLoaded(true);

     try {
        const response=await axios.post("/api/v1/users/register",formData,
           { headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            localStorage.setItem("userData", JSON.stringify(response.data.data));
            dispatch(addUserData(response.data.data))
            dispatch(login_status_toggle(true))
            alert("Registered Successfully")
            navigate("/")
            
    } catch (error) {
        console.log("Error: ", error)
        dispatch(login_status_toggle(false)) 
        alert("SignUp failed")
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
        e.preventDefault()
        handleSubmit();
      }}>
        <h2>Create Account</h2>
        <label>First Name: </label>
        <input type="text" placeholder="First Name" name="FirstName"  onChange={(e)=>{
            setFirstName(e.target.value);
        }}/>
        <label>Last Name: </label>
        <input type="text" placeholder="Last Name" name="LastName"  onChange={(e)=>{
            setLastName(e.target.value);
        }}/>
        <label>User Name: </label>
        <input type="text" placeholder="User Name" name="UserName"  onChange={(e)=>{
            setUserName(e.target.value);
        }}/>
        <label>Email: </label>
        <input type="email" placeholder="Email Address" name="email" onChange={(e)=>{
            setEmail(e.target.value);
        }}/>
        <label>Password: </label>
        <input type="password" placeholder="Password" name="password" onChange={(e)=>{
            setPassword(e.target.value)
        }}/>
        <label>Age: </label>
        <input type="text" placeholder="age" name="age" onChange={e=>(setAge(e.target.value))} />
        <label>Avtar: </label>
        <input type="file" name="avtar" onChange={(e)=>{
            setAvtar(e.target.files[0])
        }} accept='image/*'/>
        <label>CoverImage: </label>
        <input type="file" name="coverImage" onChange={e=>(setCoverImage(e.target.files[0])) } accept="image/*" />

        <button type="submit" disabled={loaded}>{loaded? 'Sign up in process' : 'Sign up'}</button>

        <p className="signin-link">
          Already have an account? <Link to="/login" className="hover:underline">Log in</Link>
        </p>
      </form>
    </div>
    </>)
}
export default SignUp