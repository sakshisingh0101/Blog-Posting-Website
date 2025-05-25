import React from 'react'
import {useState,useEffect} from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { IsLoggedIn } from '../../hooks/isLoggedIn'
import { useSelector } from 'react-redux';
function Header(){
    const isLogin=useSelector(state=>state.auth.login_status);
    
    const headerComponents=[
        
        { name:"Profile",
            slug:"/profile"
        },
        {
            name:"Home",
            slug:"/"

        },
        {
            name:"Login",
            slug:"/login"
        },
        {
            name:"Logout",
            slug:"/logout"
        },
        {
            name:"SignUp",
            slug:"/signup"
        },
        {
            name:"All Post",
            slug:"/all_post"
        },
        {
            name:"Add Post",
            slug:"/add_post"
        }
    ]
  
    return (<>
          <header className="bg-gradient-to-r from-orange-500 to-gray-700 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center text-white">
        <h1 className="text-2xl font-bold">MyBlog</h1>
        <nav className="space-x-4 font-medium">
        {/* {headerComponents&&headerComponents.map((link)=>{
            if(!isLogin&&(link==="logout"||link==="All Post"||link=="Add Post"||link=="Profile"))
            {
                return null;
            }
            else if(isLogin&&(link==="Login"||link=="SignUp"))
                { return null;
                }
                { */}
        {headerComponents.map((link) => {
  if (!isLogin && ["Logout", "All Post", "Add Post", "Profile"].includes(link.name)) {
    return null;
  } else if (isLogin && ["Login", "SignUp"].includes(link.name)) {
    return null;
  }
  return (
    <Link key={link.slug} to={link.slug} className="hover:underline">
      {link.name}
    </Link>
  );
})}

        {/* return (
            
            <Link key={link.slug} to={link.slug} className="hover:underline">
            {link.name}
          </Link> 
        )}
     })} */}
     </nav>
      </div>
    </header>
    </>)
}
export default Header