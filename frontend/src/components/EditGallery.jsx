import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { editGallery } from '../slices/gallerySlices/gallerySlice';
import {toast} from 'react-toastify'
import Spinner from './Spinner';


const EditGallery = () => {
    const [image, setImage] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)

     const res = await fetch(`/api/gallery/edit-image/${id}`, {
        method: 'PUT',
        credentials: "include",
        body: formData
      })
      const data = await res.json()
      dispatch(editGallery(data))
      toast.success('edited successfully')
      navigate('/admin-gallery')
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    }finally {
      setIsLoading(false)
    }
  };
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md mb-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Image</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Upload Image</label>
              <input
                type="file"
                id="image"
                onChange={e => setImage(e.target.files[0])}
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
}

export default EditGallery
