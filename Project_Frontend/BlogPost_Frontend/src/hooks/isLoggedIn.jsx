import { useEffect, useState } from "react"
import axios from 'axios'
import { useDispatch } from "react-redux";
import { login_status_toggle } from "../authStore/authSlice";

export const IsLoggedIn=()=>{
    const [isLogin,setIsLogin]=useState();
    const dispatch =useDispatch();
   
    useEffect(()=>{
        const checkLogin=async()=>{
        try {
            const res=await axios.get("/api/v1/users/isLoggedIn",{ withCredentials: true });
            if(!res) {
                console.log("Response not received")
                
            }
            else{
                setIsLogin(res.data.isLoggedIn);
                dispatch(res.data.data)
                dispatch(login_status_toggle(true))

            }
        } catch (error) {
            console.log("ERROR ENCOUNTERED: ",error)
            setIsLogin(false);
            dispatch(login_status_toggle(false))
        }
    }
    checkLogin();
    },[])

    return isLogin;
}
