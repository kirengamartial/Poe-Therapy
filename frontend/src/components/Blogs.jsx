import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setBlog } from '../slices/blogSlices/blogSlice';
import { useAllBlogQuery } from '../slices/blogSlices/blogApiSlice';
import { useDispatch } from 'react-redux';
import Spinner from './Spinner';

const Blogs = () => {
  const {data: blogs, isLoading, error, refetch} = useAllBlogQuery()
  const dispatch = useDispatch();

  useEffect(() => {
   if(blogs) {
    refetch()
    dispatch(setBlog(blogs))
   }
  }, [dispatch]);

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-md shadow-md">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error Occurred</h3>
            <div className="mt-2 text-sm text-red-700">
              <pre className="whitespace-pre-wrap break-words">
                {JSON.stringify(error, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

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