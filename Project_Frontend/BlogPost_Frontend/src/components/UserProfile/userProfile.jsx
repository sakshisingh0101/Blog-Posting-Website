import React, { useEffect,useState } from 'react'
import {useParams} from 'react-router-dom'
import PostCard from '../Home/postContainer'
import axios from 'axios'
function UserProfile()
{   const {userName}=useParams()
    const [userDetails,setUserDetails]=useState({});
    useEffect(()=>{
        const gettingDetails=async()=>{
            try {
                const response=await axios.get(`/api/v1/blogs/getUserAllPost/${userName}` ,{ withCredentials: true })
                if(!response||!response.data?.data)
                {
                    console.log("Error: Didn't get response ")
                }
                else{
                    setUserDetails(response.data.data)
                }
                
            } catch (error) {
                console.log("Error: ", error);
                
            }
        }
        gettingDetails();
    },[])
    if (!userDetails) {
        return <div className="text-center text-orange-400 mt-10">Loading user profile...</div>;
      }
    
      return (
        <div className="min-h-screen bg-gray-950 text-white">
          {/* Cover Image */}
          <div className="w-full h-64 relative">
            <img
              src={userDetails.coverImage}
              alt="Cover"
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-[-40px] left-8">
              <img
                src={userDetails.avtar}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-orange-500"
              />
            </div>
          </div>
    
          {/* User Info */}
          <div className="mt-16 px-8">
            <h1 className="text-3xl font-bold text-orange-400">{userDetails.firstName} {userDetails.lastName}</h1>
            <p className="text-gray-300">@{userDetails.userName}</p>
            <p className="text-gray-400 mt-2">Email: {userDetails.email}</p>
            <p className="text-gray-400">Age: {userDetails.age}</p>
          </div>
    
          {/* User Posts */}
          <div className="px-8 mt-12">
            <h2 className="text-2xl text-orange-400 font-semibold mb-6">Posts by {userDetails.userName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {userDetails.AllBlogPost && userDetails.AllBlogPost.length > 0 ? (
                userDetails.AllBlogPost.map((post, index) => (
                  <PostCard key={index} post={post} />
                ))
              ) : (
                <p className="text-gray-500">No posts available.</p>
              )}
            </div>
          </div>
        </div>
      );
}
export default UserProfile