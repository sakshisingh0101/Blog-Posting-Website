
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

function PostCard3({post})
{  console.log(post)
    const [owner,setOwner]= useState({})
    console.log("Post Owner: ",post.owner)
    

    useEffect(()=>{
        const getUser=async()=>{
            try {
                const response=await axios.get(`/api/v1/blogs/getUserDetails/${post.owner}`)
                if(!response.data?.data) {
                    console.log("Response not received")
                }
                else{
                    setOwner(response.data.data)
                }
            } catch (error) {
                console.log("ERROR: " , error)

            }
        }
        getUser();
    },[post.owner])    
    console.log(owner);
        return (
            <Link to={`/blogPostPageRender/${post?._id}`}>
 <div className="max-w-md rounded-2xl shadow-lg bg-gray-900 text-white overflow-hidden border border-orange-500">
      {post.postImage && (
        <img
          src={post.postImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold text-orange-400">{post.title}</h2>
        <p className="mt-2 text-gray-300 line-clamp-3">{post.content}</p>
        <div className="mt-4">
          <Link
            to={`/blogOwner/${owner?.userName}`}
            className="text-sm text-orange-300 hover:underline"
             onClick={(e) => e.stopPropagation()}
          >
            By: {owner?.firstName} {owner?.lastName}
          </Link>
        </div>
      </div>
    </div>
  
            </Link>
        )

}

export default PostCard3