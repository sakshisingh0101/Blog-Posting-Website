import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import PostCard from '../Home/postContainer'
import PostCard2 from './PostCard'
import './loader.css'
function AllPost()
{   
    const [details,setDetails]=useState({ AllBlogPost: []})
     const [loader,setLoader]=useState(false);
    useEffect(()=>{
        setLoader(true);
        const getDetails=async()=>{
            try {
                const response=await axios.get("/api/v1/blogs/getLoggedInUserAllPost",{ withCredentials: true })
                if(!response||!response.data?.data){
                    console.log("Error : Response didn't fetched ")
                }
                else{
                    setDetails(response.data.data);
                }
            } catch (error) {
                console.log("Error: ",error);
                alert("SOME ERROR HAS OCCURRED")
            }finally{setLoader(false)}
        }
        getDetails();
    },[])

console.log(details.AllBlogPost)
 if(loader)
{
    return  <>
       <div className="loader-wrapper">
    <div className="loader"></div>
  </div>
      
    </>
}
if(!details||details.AllBlogPost?.length===0)
{
   return  <p className="text-center text-white">No posts found.</p>
       
      
}
    


    return (<>
    <div className="min-h-screen bg-gray-950 p-6">
      <h1 className="text-3xl text-orange-400 font-bold mb-6 text-center">All Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {details.AllBlogPost.map((post, index) => (
          <PostCard2 key={index} post={post} />
        ))}
      </div>
    </div>
    </>)

}
export default AllPost