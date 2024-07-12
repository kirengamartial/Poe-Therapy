import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import { setTime, deleteTime } from '../slices/timeSlices/timeSlice';
import { useDeleteTimeMutation } from '../slices/timeSlices/timeApiSlice';
import { useDispatch } from 'react-redux';
import { useAllTimeQuery } from '../slices/timeSlices/timeApiSlice';
import toast from 'react-hot-toast'
import Spinner from './Spinner';

const AllTime = () => {

  const dispatch = useDispatch()

  const [deleteTimes] = useDeleteTimeMutation()
  const {data: time, error, refetch, isLoading} = useAllTimeQuery()

  useEffect(() => {
    if(time) {
      refetch()
      dispatch(setTime(time))
    }
  }, [dispatch, time])

  const handleDelete = async(id) => {
    try {
      await deleteTimes(id).unwrap()
       dispatch(deleteTime(id))
       refetch()
       toast.success('deleted successfully')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
      console.log(err)
    }
  }

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
 
  return isLoading ? <Spinner/> : (
    <div className="flex justify-center mb-10">
      <div className='w-9/12 mt-3'>
        <div className='text-center'>
          <h2 className="text-3xl mb-4 relative inline-block">Time</h2>
          <div className="w-32 bg-orange-500 mx-auto mb-10" style={{ height: '2px' }}></div>
        </div>
        <Link to="/add-time">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md mb-4">
            Add time
          </button>
        </Link>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Time</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {time && time.map((item) => (
                <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{item._id}</td>
                  <td className="py-3 px-6 text-left">{item.time}</td>
                  <td className="py-3 px-6 text-left">{item.date}</td>
                  <td className="py-3 px-6 text-left">
                    <Link to={`/edit-time/${item._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-md mr-2">
                        Edit
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllTime