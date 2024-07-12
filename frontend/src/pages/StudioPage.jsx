import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetVideosQuery } from '../slices/videoSlices/videoApiSlice';
import logo from '../assets/A2W BLACK 1.png';
import { setVideo } from '../slices/videoSlices/videoSlice';
import Card from '../components/Card';
import Spinner from '../components/Spinner';


const StudioPage = () => {
  const dispatch = useDispatch();

const {data: videos, error, isLoading, refetch} = useGetVideosQuery()

  useEffect(() => {
    if(videos){
      refetch()
      dispatch(setVideo(videos))
    }
  }, [videos]);

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
