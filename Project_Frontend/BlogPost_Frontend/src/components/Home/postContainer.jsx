import React from 'react'
import {Link} from 'react-router-dom'
function PostCard({post})
{  console.log(post)
    const preview =post.content.length > 150? post.content.slice(0, 150) + "...": post.content;
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
        <p className="mt-2 text-gray-300 line-clamp-3">{preview}</p>
        {/* <Link className="mt-2 text-gray-300 line-clamp-3"
          to={`/blogPostPageRender/${post?._id}`}
        >Read Full Blog Here-- </Link> */}
        <div className="mt-4">
          <Link
            to={`/blogOwner/${post.owner?.userName}`}
            className="text-sm text-orange-300 hover:underline"
             onClick={(e) => e.stopPropagation()}
          >
            By: {post.owner?.firstName} {post.owner?.lastName}
          </Link>
        </div>
      </div>
    </div>
  
            </Link>
        )

}

export default PostCard