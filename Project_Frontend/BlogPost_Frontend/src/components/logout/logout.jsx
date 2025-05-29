import React ,{useState,useEffect}from 'react'
import {useDispatch} from 'react-redux'
import { addUserData, login_status_toggle } from '../../authStore/authSlice';
import {Link, useSearchParams} from 'react-router-dom'
import axios from 'axios'

function Logout(){
  const dispatch=useDispatch()
  const [isLogout,setIsLogout]=useState(false);
  useEffect(()=>{
    const handleLogout=async()=>{
        try {
            const response=await axios.post("/api/v1/users/logout",{ withCredentials: true });
            localStorage.removeItem("userData");
            dispatch(login_status_toggle(false))
            dispatch(addUserData(null))
            setIsLogout(true);
            alert("Logout Successfully ")
        } catch (error) {
            console.log("Error: ",error);
            setIsLogout(false);
            alert("Logout failed")
        }
      }
      handleLogout();
  },[])
  if(!isLogout)
  {
    return (<h1>Logout failed</h1>);
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex flex-col items-center justify-center px-4">
      <div className="bg-gray-800 shadow-2xl rounded-3xl p-10 max-w-md w-full text-center border border-gray-700">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-16 w-16 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 11-4 0v-1m0-8v-1a2 2 0 114 0v1"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-orange-400 mb-3">
          Logged Out
        </h1>
        <p className="text-gray-300 mb-8">
          You've successfully logged out. Come back soon!
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition duration-300 shadow-lg"
          >
            Login Again
          </Link>
          <Link
            to="/"
            className="text-orange-400 border border-orange-500 hover:bg-orange-600 hover:text-white font-semibold py-2 rounded-full transition duration-300 shadow"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
//   const handleLogout=async(e)=>{
//     try {
//         const response=await axios.post("http://localhost:8000/api/v1/users/logout");
//         dispatch(login_status_toggle(false))
//         dispatch(addUserData(null))
//         alert("Logout Successfully ")
//     } catch (error) {
//         console.log("Error: ",error);
//         alert("Logout failed")
//     }
//   }
//   return (
//     <>
//     </>
//   )
}
export default Logout