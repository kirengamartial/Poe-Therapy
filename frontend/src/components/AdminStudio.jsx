import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setVideo, deleteVideo } from '../slices/videoSlices/videoSlice';
import Spinner from './Spinner';
import { toast } from 'react-toastify';


const AdminStudio = () => {
  const [studios, setStudios] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const {userVideo} = useSelector(state => state.video)

  useEffect(() => {
    const handleData = async() => {
      setIsLoading(true)
      if(userVideo) {
        try {
          const res = await fetch('/api/studio/all-video', {
            method: 'GET'
          })
          const data = await res.json()
          dispatch(setVideo(data))
          setStudios(data)
        } catch (err) {
          console.log(err)
          toast.error(err?.data?.message || err.error)
        }finally {
          setIsLoading(false)
        }
      }
    }
    handleData()
  }, [])
 

  const handleDeleteStudio = async(id) => {
    setIsLoading(true)
  try {
    await fetch(`/api/studio/delete-video/${id}`, {
        method: 'DELETE',
        credentials: "include"
       })
       dispatch(deleteVideo(id))
       setStudios(studios.filter(video => video._id !== id))
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
          {studios.map((studio) => (
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