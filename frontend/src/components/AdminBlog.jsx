import React, { useState, useEffect } from 'react';
import { setBlog,deleteBlog } from '../slices/blogSlices/blogSlice';
import Spinner from './Spinner';
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
// import {toast} from 'react-toastify'
import toast from 'react-hot-toast'

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false) 

  const dispatch = useDispatch()

 useEffect(() => {
  const handleBlog = async() => {
    setIsLoading(true)
  try {
    const res = await fetch('/api/blog/all-blog', {
      method: 'GET'
    })
    const data = await res.json()
    dispatch(setBlog(data))
    setBlogs(data)
  } catch (err) {
    console.log(err)
    toast.error(err?.data?.message || err.error)
  }finally {
    setIsLoading(false)
  }
  } 
  handleBlog()
 }, [dispatch])

 const handleDeleteBlog = async(id) => {
  setIsLoading(true)
   try {
     await fetch(`/api/blog/delete-blog/${id}`, {
      method: 'DELETE',
      credentials: "include"
     })
     dispatch(deleteBlog(id))
     setBlogs(blogs.filter(blog => blog._id !== id))
     toast.success('deleted successfully')
   } catch (err) {
     console.log(err)
     toast.error(err?.data?.message || err.error)
   }finally {
    setIsLoading(false)
   }
 }

  return isLoading ? <Spinner/> : (
    <div className="flex justify-center mb-10">
        <div className=" text-center w-9/12 mt-3">
        <div className="mb-6">
        <h2 className="text-2xl font-bold text-center">Blog</h2>
      </div>
      <div className="flex justify-between items-center mb-6">
        <Link to="/add-blog">
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Add Blog
        </button>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 bg-gray-100 rounded-t-lg">
          <div className="grid grid-cols-3 gap-4">
            <div className="font-bold">ID</div>
            <div className="font-bold">Title</div>
            <div className="font-bold">Actions</div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {blogs.map((blog) => (
            <div key={blog._id} className="p-4 grid grid-cols-3 gap-4 items-center">
              <div>{blog.id}</div>
              <div>{blog.title}</div>
              <div className="flex justify-end">
                <Link to={`/admin-edit-blog/${blog._id}`}>
                
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit
                </button>
                </Link>
                
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => handleDeleteBlog(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
    </div>
  );
};

export default AdminBlog;