import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setVideo } from '../slices/videoSlices/videoSlice';
import { useGetVideosQuery, useDeleteVideoMutation} from '../slices/videoSlices/videoApiSlice';
import Spinner from './Spinner';
import toast from 'react-hot-toast'


const AdminStudio = () => {
  const dispatch = useDispatch()
  const {data: studios, refetch, error, isLoading} = useGetVideosQuery()
  const [deleteVideo] = useDeleteVideoMutation()


  useEffect(() => {
    if(studios) {
      refetch()
      dispatch(setVideo(studios))
    }
   }, [studios])
 

  const handleDeleteStudio = async(id) => {
  try {
       await deleteVideo(id)
       refetch()
       toast.success('deleted successfully')
  } catch (err) {
    console.log(err)
    toast.error(err?.data?.message || err.error)
  }
  }
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

  return isLoading ? <Spinner/> : (
    <div className="flex justify-center mb-10">
        <div className='text-center w-9/12 mt-3'>
        <div className="mb-6">
        <h2 className="text-2xl font-bold text-center">Studio</h2>
      </div>
      <div className="flex justify-between items-center mb-6">
        <Link to="/add-studio">
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Add Studio
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
          {studios && studios.map((studio) => (
            <div key={studio._id} className="p-4 grid grid-cols-3 gap-4 items-center">
              <div>{studio._id}</div>
              <div>{studio.title}</div>
              <div className="flex justify-end">
                <Link to={`/admin-edit-studio/${studio._id}`}>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit
                </button>
                </Link>
                
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => handleDeleteStudio(studio._id)}
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

export default AdminStudio;