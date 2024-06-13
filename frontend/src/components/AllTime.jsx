import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { setTime, deleteTime } from '../slices/timeSlices/timeSlice';
import { useDeleteTimeMutation } from '../slices/timeSlices/timeApiSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

const AllTime = () => {
  const [time, setTimes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const [deleteTimes] = useDeleteTimeMutation()

  useEffect(() => {
    const handleTime = async() => {
      setIsLoading(true)
      try {
        const res = await fetch('/api/time/all-time', {
          method: 'GET',   
        })
        const data = await res.json()
        if(data) {
          setTimes(data)
          dispatch(setTime(data))   
        }
      } catch (error) {
        console.log(error)
      }finally {
        setIsLoading(false)
      }
    }
    handleTime()
  }, [dispatch])

  const handleDelete = async(id) => {
    setIsLoading(true)
    try {
      await deleteTimes(id).unwrap()
       dispatch(deleteTime(id))
       setTimes(time.filter(item => item._id !== id));
       toast.success('deleted successfully')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
      console.log(err)
    }finally {
      setIsLoading(false)
    }
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
              {time.map((item) => (
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