import React, { use, useEffect } from 'react'
import {useState} from 'react'
import { useSelector } from 'react-redux';
import PostCard from './postContainer.jsx';
import axios from 'axios'
import './home.css'
function Home(){
    const [allPost,setAllPost]=useState([]);
    const isLoggedIn = useSelector(state => state.auth.login_status);
    const [loader,setLoader]=useState(false)
    useEffect(()=>{
        setLoader(true);
        const handlepost=async()=>{
            try {
                const response=await axios.get("/api/v1/blogs/getAllPost",{ withCredentials: true })
                if(response&&response.data.data.length!==0)
                {
                    setAllPost(response.data.data);
                    
                }


            } catch (error) {
                console.log("Error: " , error);
                alert("SEREVR ERROR : POST NOT FETCHED FROM SERVER DUE TO SOME ERROR")
            }finally{setLoader(false)}
        }
        handlepost();
    },[])
  if(loader)
{
    return  <>
       <div className="loader-wrapper">
    <div className="loader"></div>
  </div>
      
    </>
}

    if(!isLoggedIn)
    {
        return <h1>Log in to see the post</h1>
    }
    if(allPost.length===0)
    {
        return <h1>Either Nothing is fetched from backend or no post is being posted till now</h1>
    }
  

return (
    <>
       <div className="min-h-screen bg-gray-950 p-6">
      <h1 className="text-3xl text-orange-400 font-bold mb-6 text-center">All Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allPost.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </div>

    </>
)
}
export default Home
