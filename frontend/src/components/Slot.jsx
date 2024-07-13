import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createSlot } from '../slices/slotSlices/slotSlice';
import { usePostSlotMutation } from '../slices/slotSlices/slotApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import toast from 'react-hot-toast'

const Slot = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [recordingType, setRecordingType] = useState('');
  const [sessionDuration, setSessionDuration] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const {id} = useParams()
  const dispatch = useDispatch() 
  const navigate = useNavigate()

  const {userTime} = useSelector(state => state.time)
  const {userInfo} = useSelector(state => state.auth)
  const [postSlot] = usePostSlotMutation()

  useEffect(() => {
   userTime.map(item => {
    if(item._id === id) {
      setDate(item.date)
      setTime(item.time)
      setName(userInfo.name)
      setEmail(userInfo.email)
    }
   })
  },[userTime, userInfo])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
     const response =  await fetch(`/api/time/edit-time/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: false }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
  
      if(response.ok) {
        const slotData = {
          name,
          email,
          date,
          time,
          recording_type: recordingType,
          session_duration: sessionDuration,
        };
    
        const res = await postSlot(slotData).unwrap();
        dispatch(createSlot({ ...res }));
        toast.success('Slot created successfully');
        navigate('/all-slot');
      }
      
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }finally {
      setIsLoading(false)
    }
  };
  return (
    <div className="bg-white flex justify-center mb-10">
      <div className="w-9/12 mt-2">
        <div className="text-center">
          <h2 className="text-3xl mb-4 relative inline-block">Your Slot</h2>
          <div className="w-32 bg-orange-500 mx-auto mb-10" style={{ height: '2px' }}></div>
        </div>
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-12">Sunday 31 Mar 2024 5PM</label>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Recording Type</label>
              <div className="relative">
              <select id="recording-type" 
               value={recordingType}
               onChange={(e) => setRecordingType(e.target.value)}
               className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4        py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
               required>
                 <option value="">Select an option</option>
                 <option value="Poetry">Poetry</option>
                 <option value="Music/ Music cover">Music/ Music cover</option>
                 <option value="Podcast">Podcast</option>
                 <option value="Voice over">Voice over</option>
                 <option value="Dubbing">Dubbing</option>
                 <option value="Documentary">Documentary</option>
                 <option value="Visuals">Visuals</option>
               </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Session Duration</label>
              <div className="relative">
              <select id="session-duration" 
               value={sessionDuration}
               onChange={(e) => setSessionDuration(e.target.value)}
               className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4        py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
               required>
                 <option value="">Select a duration</option>
                 <option value="30 minutes">30 minutes</option>
                 <option value="1 hour">1 hour</option>
                 <option value="1 hour 30 minutes">1 hour 30 minutes</option>
                 <option value="2 hours">2 hours</option>
                 <option value="2 hours 30 minutes">2 hours 30 minutes</option>
                 <option value="3 hours">3 hours</option>
                 <option value="3 hours 30 minutes">3 hours 30 minutes</option>
                 <option value="4 hours">4 hours</option>
                 <option value="4 hours 30 minutes">4 hours 30 minutes</option>
                 <option value="5 hours">5 hours</option>
               </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            {isLoading && <Spinner/>}
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold mt-4 mb-8 py-1 px-4 w-full rounded"
            >
              Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Slot;