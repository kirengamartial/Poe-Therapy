import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { editVideo } from '../slices/videoSlices/videoSlice';
import {toast} from 'react-toastify'
import Spinner from './Spinner';

const EditStudio = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);

  const [isLoading, setIsLoading] = useState(false)

  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {userVideo} = useSelector(state => state.video)

  useEffect(() => {
    const handleGetData = () => {
      const editVideo = userVideo.filter(video => video._id === id)
    if(userVideo && editVideo) {
     setTitle(editVideo[0].title)
     setDescription(editVideo[0].description)
    }
    }
    handleGetData()
  }, [userVideo])

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('video', video)

     const res = await fetch(`/api/studio/edit-video/${id}`, {
        method: 'PUT',
        credentials: "include",
        body: formData
      })
      const data = await res.json()
      dispatch(editVideo(data))
      toast.success('edited successfully')
      navigate('/admin-studio')
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    }finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Studio</h2>
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
          <label htmlFor="video" className="block text-gray-700 font-bold mb-2">Upload Video</label>
          <input
            type="file"
            id="video"
            onChange={handleVideoChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            accept="video/*"
            required
          />
        </div>
        {isLoading && <Spinner/>}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Edit Studio
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudio;
