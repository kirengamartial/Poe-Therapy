import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAllTimeQuery } from '../slices/timeSlices/timeApiSlice';
import { setTime } from '../slices/timeSlices/timeSlice';
import toast from 'react-hot-toast'
import Spinner from './Spinner';

const AllSlot = () => {
  const dispatch = useDispatch();

  const {data:time, isLoading, error, refetch} = useAllTimeQuery()
  const {userInfo} = useSelector(state => state.auth)

  const handleClick = () => {
    toast.error('Login first, please');
  };

  useEffect(() => {
    if(time) {
      refetch()
      dispatch(setTime(time))
    }
  }, [dispatch, time]);

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
