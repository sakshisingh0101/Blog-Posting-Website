import React,{useState,useEffect} from 'react'
import axios from 'axios'
function AddPost()
{   const [title,setTitle]=useState();
    const [content,setContent]=useState();
    const [postImage,setImage]=useState();
    const [loaded,setLoaded]=useState(false);
    const formdata=new FormData();
    const handleSubmit=async(e)=>{
     
       formdata.append("title",title)
       formdata.append("content",content)
       formdata.append("postImage",postImage);
       setLoaded(true)
       try {
        const response=await axios.post("/api/v1/blogs/blogPost",formdata,
        { headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials:true
          
        });
        if(response) {
            alert("Blog successfully Posted");
        }
       } catch (error) {
        console.log("Error : " , error);
        alert("Some error has occured")
       }finally {setLoaded(false)}
    }
      if(loaded)
{
    return  <>
       <div className="loader-wrapper">
    <div className="loader"></div>
  </div>
      
    </>
}
    return (
        <>
         <div className="min-h-screen bg-gray-950 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-3xl bg-gray-900 text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-orange-400 mb-6 text-center">
          Create New Post
        </h2>
        
        <form className="space-y-6" onSubmit={(e)=>
        {   e.preventDefault();
            handleSubmit(e)
        }}>
          <div>
            <label className="block mb-2 text-sm text-gray-300">Title</label>
            <input
              type="text"
              placeholder="Enter post title"
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={(e)=>setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Content</label>
            <textarea
              rows="6"
              placeholder="Write your post content here..."
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={(e)=>setContent(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Post Image</label>
            <input
              type="file"
              name="postImage"
              accept="image/*"
              className="w-full text-gray-300 bg-gray-800 p-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
              onChange={(e)=>setImage(e.target.files[0])}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-300"
              disabled={loaded}
            >
              {loaded? 'Publishing Post' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
        </>
    )
}
export default AddPost