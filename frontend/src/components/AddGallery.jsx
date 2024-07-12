import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { usePostImageMutation } from '../slices/gallerySlices/galleryApiSlice';
import toast from 'react-hot-toast'
import Spinner from './Spinner'

const AddGallery = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const navigate = useNavigate()
  const [createGallery, {isLoading, error}] = usePostImageMutation()


  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('image', image)

     await createGallery(formData).unwrap()
      toast.success('created successfully')
      navigate('/admin-gallery')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
      console.log(err)
    }finally{
       setIsLoading(false)
    }
  };

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

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Image</h2>
      <form onSubmit={handleSubmit}>
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
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGallery;
