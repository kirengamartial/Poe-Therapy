import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/A2W BLACK 1.png';
import { setVideo } from '../slices/videoSlices/videoSlice';
import Card from '../components/Card';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const StudioPage = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { userVideo } = useSelector(state => state.video);

  useEffect(() => {
    const handleData = async () => {
      if (userVideo) {
        setIsLoading(true);
        try {
          const res = await fetch('/api/studio/all-video', {
            method: 'GET',
          });
          const data = await res.json();
          dispatch(setVideo(data));
          setVideos(data);
        } catch (err) {
          console.log(err);
          toast.error(err?.data?.message || err.error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    handleData();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="flex justify-center mb-24">
      <div className="text-center w-10/12">
        <img src={logo} alt="logo" className="h-20 relative inline-block mb-4 mx-auto" />
        <div className="w-32 bg-orange-500 mx-auto mb-10" style={{ height: '2px' }}></div>
        {videos.length === 0 ? (
          <p>No studio data available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {videos.map(video => (
              <Card
                key={video._id}
                video={video.video}
                description={video.description}
                title={video.title}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudioPage;
