import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

import './profile.css'
function Profile(){
    // const [user,setUserData]=useState(null);
    
    // const [isLogin,setIsLogin]=useState(false);
    
    const isLogin=useSelector(state=>state.auth.login_status)
    const user=useSelector(state => state.auth.userData)

    //     console.log("isLogin:", isLogin);
    // console.log("User data from Redux:", user); 


    // console.log(user)
    // useEffect(()=>{
      
    //     setIsLogin(useSelector(state=>state.auth.login_status))
    //     setUserData(useSelector(state => state.auth.userData));
    // },[])
    // if(!isLogin) {
    //     return <h1> Please Login To see your Profile </h1>;
    // }
//       if(loader)
// {
//     return  <>
//        <div className="loader-wrapper">
//     <div className="loader"></div>
//   </div>
      
//     </>
// }
    return (<>
     <div className="profile-container">
      <div className="cover-photo">
        
        <img src={ user.data.coverImage? user.data.coverImage : null} alt="Cover" />
      </div>
      <div className="profile-content">
        <div className="avatar-box">
          <img src={user.data.avtar} alt="Avatar" />
        </div>
        <h2>Username: {user.data.userName}</h2>
        <p className="fullname">FullName: {user.data.firstName} {user.data.lastName}</p>
        <p className="email">Email: {user.data.email}</p>
        <p className="age">Age: {user.data.age}</p>
        <Link to={`/blogOwner/${user.data.userName}`}>All Posts </Link>
      </div>
    </div>
    </>)
}
export default Profile;