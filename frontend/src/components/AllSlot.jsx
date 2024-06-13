import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTime } from '../slices/timeSlices/timeSlice';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

const AllSlot = () => {
  const [time, setTimes] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo } = useSelector(state => state.auth);

  const handleClick = () => {
    toast.error('Login first, please');
  };

  useEffect(() => {
    const handleTime = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/time/all-time', {
          method: 'GET',
        });
        const data = await res.json();
        if (data) {
          setTimes(data);
          dispatch(setTime(data));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch slots");
      } finally {
        setIsLoading(false);
      }
    };
    handleTime();
  }, [dispatch]);

  return isLoading ? <Spinner /> : (
    <div className="flex justify-center mb-20">
      <div className="w-11/12 lg:w-9/12 mt-2">
        <div className="text-center">
          <h2 className="text-xs sm:text-xs md:text-xs lg:text-3xl mb-4 relative inline-block">Studio Slots Available</h2>
          <div className="w-32 bg-orange-500 mx-auto mb-10" style={{ height: '2px' }}></div>
        </div>
        {time.length === 0 ? (
          <div className="text-center text-xs sm:text-xs md:text-xs lg:text-xl text-gray-600">
            No slots available now.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {time.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-xs md:text-xs lg:text-base text-gray-800 font-semibold">{item.date}</p>
                  <div className="flex items-center">
                    <p className="text-xs sm:text-xs md:text-xs lg:text-base text-gray-600 mr-2">Time:</p>
                    <p className="text-xs sm:text-xs md:text-xs lg:text-base text-gray-800 font-semibold">{item.time}</p>
                    <span className="mx-2 text-gray-500">|</span>
                    <p className="text-xs sm:text-xs md:text-xs lg:text-base text-gray-600 mr-2">Status:</p>
                    <p className={item.status ? 'text-xs sm:text-xs md:text-xs lg:text-base text-green-600 font-semibold' : 'text-xs sm:text-xs md:text-xs lg:text-base text-red-600 font-semibold'}>
                      {item.status ? 'Active' : 'Taken'}
                    </p>
                  </div>
                </div>
                {userInfo ? (
                  <Link to={`/slot/${item._id}`}>
                    <button
                      className={`mt-3 text-xs sm:text-xs md:text-xs lg:text-base rounded-md ${
                        item.status ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-orange-300 text-white cursor-not-allowed'
                      }`}
                      style={{ padding: '4px 20px' }}
                      disabled={!item.status}
                    >
                      Book
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={handleClick}
                    className={`mt-3 text-xs sm:text-xs md:text-xs lg:text-base rounded-md ${
                      item.status ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-orange-300 text-white cursor-not-allowed'
                    }`}
                    style={{ padding: '4px 20px' }}
                    disabled={!item.status}
                  >
                    Book
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSlot;
