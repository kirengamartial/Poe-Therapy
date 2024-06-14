import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { createBlog } from '../slices/blogSlices/blogSlice';
// import {toast} from 'react-toastify'
import toast from 'react-hot-toast'
import Spinner from './Spinner'

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('image', image)

      const res = await fetch(`/api/blog/post-blog`, {
        method: 'POST',
        credentials: "include",
        body: formData
      })
      const data = await res.json()
      dispatch(createBlog(data))
      toast.success('created successfully')
      navigate('/admin-blog')
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter title"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter description"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            accept="image/*"
            required
          />
        </div>
        {isLoading && <Spinner/>}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 mt-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Create Blog Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
