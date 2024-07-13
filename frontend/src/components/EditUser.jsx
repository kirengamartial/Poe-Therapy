import React, { useState, useEffect } from 'react';
import { getCredentials } from '../slices/userSlices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEditUserMutation } from '../slices/userSlices/userApiSlice';
import { useGetUserSlotQuery } from '../slices/slotSlices/slotApiSlice';
import toast from 'react-hot-toast'
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [editUser, {isLoading}] = useEditUserMutation()
  const {data: slot, error, refetch} = useGetUserSlotQuery()

  const {userInfo} = useSelector(state => state.auth)

  useEffect(() => {
   if(userInfo || slot){
    refetch()
    setName(userInfo.name)
    setEmail(userInfo.email)
   }
  }, [userInfo, slot])
  

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
          if(password === confirmPassword) {
            const data = {
              name,
              email,
              password
            }
            const res = await editUser(data).unwrap()
            
          dispatch(getCredentials({...res}))
          toast.success("edited successfully")
          navigate('/')
          }else {
            toast.error("Password mismatch")
          }
        
    } catch (err) {
      console.log(err)
      toast.error(err?.dat?.message || err.error)
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

  return isLoading ? <Spinner/> :(
    <div className='flex justify-center mb-10'>
      <div className="flex flex-col md:flex-row">
        <form onSubmit={handleSubmit} className="md:w-1/3 p-4">
          <h2 className="text-xl font-bold mb-4">User Profile</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div>
          {isLoading && <Spinner/>}
          <button type='submit' className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
            Update
          </button>
        </form>
        <div className="md:w-2/3 p-4">
          <h2 className="text-xl font-bold mb-4">My Sessions</h2>
          <table className="w-full border">
            
            <thead>
              <tr>
                <th className="px-4 py-2 text-sm">DATE & TIME</th>
                <th className="px-4 py-2 text-sm">RECORDING TYPE</th>
                <th className="px-4 py-2 text-sm">SESSION DURATION</th>
              </tr>
            </thead>
            <tbody>
  {isLoading ? <Spinner/> : slot && slot.length > 0 ? (
   slot.map((order) => (
    <tr key={order._id} className="odd:bg-gray-100">
      <td className="px-4 py-2 border text-sm">
        {order.date} {order.time}
      </td>
      <td className="px-4 py-2 border text-sm">{order.recording_type}</td>
      <td className="px-4 py-2 border text-sm">{order.session_duration}</td>
    </tr>
  ))
  ): <tr>
  <td colSpan="3" className="text-center py-4">
    You Don't have Any slot
  </td>
</tr>}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
