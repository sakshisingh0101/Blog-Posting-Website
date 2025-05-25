import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

import './profile.css'
function Profile(){
    // const [user,setUserData]=useState(null);
    
    // const [isLogin,setIsLogin]=useState(false);
    const isLogin=useSelector(state=>state.auth.login_status)
    const user=useSelector(state => state.auth.userData.data)


    console.log(user)
    // useEffect(()=>{
      
    //     setIsLogin(useSelector(state=>state.auth.login_status))
    //     setUserData(useSelector(state => state.auth.userData));
    // },[])
    if(!isLogin) {
        return <h1> Please Login To see your Profile </h1>;
    }
    return (<>
     <div className="profile-container">
      <div className="cover-photo">
        
        <img src={ user.coverImage? user.coverImage : null} alt="Cover" />
      </div>
      <div className="profile-content">
        <div className="avatar-box">
          <img src={user.avtar} alt="Avatar" />
        </div>
        <h2>Username: {user.userName}</h2>
        <p className="fullname">FullName: {user.firstName} {user.lastName}</p>
        <p className="email">Email: {user.email}</p>
        <p className="age">Age: {user.age}</p>
        <Link to={`/all_post`}>All Posts </Link>
      </div>
    </div>
    </>)
}
export default Profile