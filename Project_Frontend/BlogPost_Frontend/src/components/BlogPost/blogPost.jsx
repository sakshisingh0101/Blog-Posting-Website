import React from "react";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

function BlogPost(){
  const [post,setPost]=useState(null)
  const {blogId}=useParams();
    const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const posthandle=async()=>{
    try {
        const response = await axios.get(`/api/v1/blogs/getPostbyID/${blogId}`,{withCredentials:true})
        if(response)
        {
            setPost(response.data.data);
        }
    } catch (error) {
         console.log("Error: " , error);
        alert("SEREVR ERROR : POST NOT FETCHED FROM SERVER DUE TO SOME ERROR")
    }finally{
      setLoading(false)
    }
}
posthandle();
  },[blogId])

    if(loading)
{
    return  <>
       <div className="loader-wrapper">
    <div className="loader"></div>
  </div>
      
    </>
}

    return (
        <>
          <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl shadow-lg p-6">

        {post.postImage && (
          <img
            src={post.postImage}
            alt={post.title}
            className="w-full h-72 object-cover rounded-xl mb-6"
          />
        )}

        <h1 className="text-3xl font-bold text-orange-400 mb-4">
          {post?.title}
        </h1>

        <div className="text-sm text-gray-400 mb-6">
          By {post.owner?.firstName} {post.owner?.lastName}
        </div>

        <p className="text-gray-200 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </div>
    </div>
        </>
    )
}
export default BlogPost

