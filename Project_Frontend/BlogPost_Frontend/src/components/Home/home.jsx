import React, { useEffect } from 'react'
import {useState} from 'react'
import { useSelector } from 'react-redux';
import PostCard from './postContainer.jsx';
import axios from 'axios'
function Home(){
    const [allPost,setAllPost]=useState([]);
    const isLoggedIn = useSelector(state => state.auth.login_status);
    useEffect(()=>{
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
            }
        }
        handlepost();
    },[])
    if(!isLoggedIn)
    {
        return <h1>Loggin to see the post</h1>
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
