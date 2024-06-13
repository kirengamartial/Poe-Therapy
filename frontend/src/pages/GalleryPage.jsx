import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGallery } from '../slices/gallerySlices/gallerySlice';
import Spinner from '../components/Spinner';

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { galleryInfo } = useSelector((state) => state.gallery);

  useEffect(() => {
    const handleData = async () => {
      setIsLoading(true);
      if (galleryInfo) {
        try {
          const res = await fetch('/api/gallery/all-image', {
            method: 'GET',
          });
          const data = await res.json();
          dispatch(setGallery(data));
          setPhotos(data);
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
    <section className="flex justify-center mb-24">
      <div className="text-center w-10/12">
        <h1 className="text-3xl mb-4 relative inline-block">Gallery</h1>
        <div className="w-32 bg-orange-500 mx-auto mb-10" style={{ height: '2px' }}></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
          {photos.map((photo) => (
            <div key={photo._id} className="w-full h-56 overflow-hidden">
              <img
                src={photo.image.secure_url}
                alt="Gallery Image"
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
