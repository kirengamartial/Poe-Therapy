import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setGallery, deleteGallery } from '../slices/gallerySlices/gallerySlice';
import Spinner from './Spinner';
import { toast } from 'react-toastify';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const {galleryInfo} = useSelector(state => state.gallery)

  useEffect(() => {
    const handleData = async() => {
      setIsLoading(true)
      if(galleryInfo) {
        try {
          const res = await fetch('/api/gallery/all-image', {
            method: 'GET'
          })
          const data = await res.json()
          dispatch(setGallery(data))
          setPhotos(data)
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

const handleDeletePhoto = async(id) => {
  setIsLoading(true)
try {
  await fetch(`/api/gallery/delete-image/${id}`, {
      method: 'DELETE',
      credentials: "include"
     })
     dispatch(deleteGallery(id))
     setPhotos(photos.filter(photo => photo._id !== id))
     toast.success('deleted successfully')
} catch (err) {
  console.log(err)
  toast.error(err?.data?.message || err.error)
}finally {
  setIsLoading(false)
}
}
  return isLoading ? <Spinner/> :(
    <div className="flex justify-center mb-10">
        <div className='text-center w-9/12 mt-3'> 
        <div className="mb-6">
        <h2 className="text-2xl font-bold text-center">Gallery</h2>
      </div>
      <div className="flex justify-between items-center mb-6">
        <Link to="/add-gallery">
          
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          
        >
          Add Image
        </button>
        </Link>
       
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 bg-gray-100 rounded-t-lg">
          <div className="grid grid-cols-3 gap-4">
            <div className="font-bold">ID</div>
            <div className="font-bold">Actions</div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {photos.map((photo) => (
            <div key={photo._id} className="p-4 grid grid-cols-3 gap-4 items-center">
              <div>{photo._id}</div>
              
              <div className="flex justify-end">
                <Link to={`/admin-edit-gallery/${photo._id}`}>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 
                >
                  Edit
                </button>
                </Link>
                
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => handleDeletePhoto(photo._id)}
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

export default Gallery;