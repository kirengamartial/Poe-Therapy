import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setBlog } from '../slices/blogSlices/blogSlice';
import { useDispatch } from 'react-redux';
import Spinner from './Spinner';
import { toast } from 'react-toastify';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleBlog = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/blog/all-blog', {
          method: 'GET',
        });
        const data = await res.json();
        dispatch(setBlog(data));
        setBlogs(data);
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error);
      } finally {
        setIsLoading(false);
      }
    };
    handleBlog();
  }, [dispatch]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="flex justify-center mb-10">
      <div className="text-center w-9/12 mt-2">
        <h2 className="text-3xl mb-4 relative inline-block">My Blogs</h2>
        <div className="w-32 bg-orange-500 mx-auto mb-10" style={{ height: '2px' }}></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog._id}`}
              className="bg-gray-100 rounded-lg shadow-md flex flex-col"
            >
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={blog.image.secure_url}
                  alt={blog.title}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{blog.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;