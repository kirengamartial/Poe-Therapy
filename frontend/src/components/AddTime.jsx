import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { usePostTimeMutation } from '../slices/timeSlices/timeApiSlice';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Spinner from './Spinner';

const AddTime = () => {
  const [Date, setDate] = useState(null);
  const [Time, setTime] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const [postDate] = usePostTimeMutation()

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const formattedDate = Date ? Date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '';

      const date = formattedDate.split(',').join('')
      const time = Time
      const res = await postDate({date, time}).unwrap()
      toast.success('Created Time successfully')
      navigate('/all-time')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
      console.log(err)
    }finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="bg-white flex justify-center mb-10">
      <div className="w-9/12 mt-2">
        <div className="text-center">
          <h2 className="text-3xl mb-4 relative inline-block">Add Time</h2>
          <div className="w-32 bg-orange-500 mx-auto mb-10" style={{ height: '2px' }}></div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Time</label>
              <div className="relative">
                <select
                  id="session-duration"
                  value={Time}
                  onChange={(e) => setTime(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" className='text-red'>Select Time</option>
                  <option value="8PM">8AM</option>
                  <option value="9AM">9AM</option>
                  <option value="10AM">10AM</option>
                  <option value="11AM">11AM</option>
                  <option value="12PM">12PM</option>
                  <option value="1PM">1PM</option>
                  <option value="2PM">2PM</option>
                  <option value="3PM">3PM</option>
                  <option value="4PM">4PM</option>
                  <option value="5PM">5PM</option>
                  <option value="6PM">6PM</option>
                  <option value="7PM">7PM</option>
                  <option value="8PM">8PM</option>
                  <option value="9PM">9PM</option>
                  <option value="10PM">10PM</option>
                  <option value="11PM">11PM</option>
                  <option value="12AM">12AM</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Date</label>
              <FaCalendarAlt className="inline text-gray-500 mr-2" />
              <DatePicker
                selected={Date}
                onChange={(date) => setDate(date)}
                placeholderText="Pick Date"
                dateFormat="EEEE dd MMM yyyy"
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" 
                required
              />
            </div>
            {isLoading && <Spinner/>}
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold mt-4 mb-8 py-1 px-4 w-full rounded"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTime;