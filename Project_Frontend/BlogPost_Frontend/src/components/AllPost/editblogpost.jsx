import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Editpost() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.login_status);
  const userData = useSelector((state) => state.auth.userData);

  // Fetch post by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
       const response = await axios.get(`/api/v1/blogs/getPostbyID/${blogId}`, {
        withCredentials: true,
       
        });

        const data = response.data.data;
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error(error);
        alert("Post not found or server error");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [blogId]);

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }

  if (!post) return <p className="text-center text-white">Post not found</p>;

  const isOwner =
    isLoggedIn &&
    userData?.data._id &&
   post.owner?._id?.toString() === userData.data._id?.toString();

   console.log(isOwner)

  // Save edited post
  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (postImage) formData.append("postImage", postImage);

      const response = await axios.post(
        `/api/v1/blogs/updatePost/${blogId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setPost(response.data.data);
      setEditMode(false);
      alert("Post updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  // Delete post
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/v1/blogs/deletePost/${blogId}`, {
        withCredentials: true,
      });
      alert("Post deleted successfully!");
      navigate("/all_post"); // redirect to all posts page
    } catch (error) {
      console.error(error);
      alert("Failed to delete post. Only owner can delete.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl shadow-lg p-6">
        {post.postImage && (
          <img
            src={post.postImage}
            alt={post.title}
            className="w-full h-72 object-cover rounded-xl mb-6"
          />
        )}

        {editMode ? (
          <>
            <input
              className="w-full p-2 mb-4 rounded bg-gray-800 text-white border border-gray-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full p-2 mb-4 rounded bg-gray-800 text-white border border-gray-600"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <input
              type="file"
              className="text-white mb-4"
              onChange={(e) => setPostImage(e.target.files[0])}
            />
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-orange-500 rounded hover:bg-orange-600"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-orange-400 mb-4">{post.title}</h1>
            <div className="text-sm text-gray-400 mb-6">
              By {post.owner?.firstName} {post.owner?.lastName}
            </div>
            <p className="text-gray-200 leading-relaxed whitespace-pre-line mb-6">{post.content}</p>

            {isOwner && (
              <div className="flex gap-4">
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-orange-500 rounded hover:bg-orange-600"
                >
                  Edit Post
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                >
                  Delete Post
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Editpost;


