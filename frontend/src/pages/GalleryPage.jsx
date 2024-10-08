import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGallery } from '../slices/gallerySlices/gallerySlice';
import { useGetImagesQuery } from '../slices/gallerySlices/galleryApiSlice';
import Spinner from '../components/Spinner';

const GalleryPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch()
  const { data: photos, isLoading, error, refetch } = useGetImagesQuery();

  useEffect(() => {
    if (photos) {
      refetch();
      dispatch(setGallery(photos));
    }
  }, [photos, refetch, dispatch]);

 

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getOverlapStyle = (index) => {
    if (isMobile) return {};
    
    switch (index) {
      case 3: return { marginTop: '-121.6%' };
      case 5: return { marginTop: '-44.5%' };
      case 6: return { marginTop: '-88%' };
      case 8: return { marginTop: '-12%' };
      default: return {};
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

  return isLoading ? <Spinner /> :(
    <section className="flex justify-center mb-24">
      <div className="text-center w-10/12">
        <h1 className="text-3xl mb-4 relative inline-block">Gallery</h1>
        <div className="w-32 bg-orange-500 mx-auto mb-10" style={{ height: '2px' }}></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos && photos.map((photo, index) => (
            <div key={photo._id} className={`w-full ${isMobile ? 'mb-4' : ''}`}>
              <img
                src={photo.image.secure_url}
                alt="Gallery Image"
                className="w-full h-auto object-cover object-center"
                style={getOverlapStyle(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
