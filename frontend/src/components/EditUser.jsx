import React, { useState, useEffect } from 'react';
import { getCredentials } from '../slices/userSlices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [slot, setSlot] = useState([])
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {userInfo} = useSelector(state => state.auth)

  useEffect(() => {
    const handleSlot = async() => {
      setIsLoading(true)
      try {
        if(userInfo) {
          const res = await fetch('/api/slot/single-slot', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: userInfo.email}),
            credentials: "include"
            
          })
          const data = await res.json()
          setSlot(data)

          setName(userInfo.name)
          setEmail(userInfo.email)
        }
      } catch (error) {
        console.log(error)
      }finally {
        setIsLoading(false)
      }
    }
    handleSlot()
  }, [userInfo])
  

  const handleSubmit = async(e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
          if(password === confirmPassword) {
            const data = {
              name,
              email,
              password
            }
            const res = await fetch('/api/users/edit', {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify(data)
          })
            
          const myData = await res.json()
          dispatch(getCredentials({...myData}))
          toast.success("edited successfully")
          navigate('/')
          }else {
            toast.error("Password mismatch")
          }
        
    } catch (err) {
      console.log(err)
      toast.error(err?.dat?.message || err.error)
    }finally {
      setIsLoading(false)
    }
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
  {slot === null || slot.length === 0 ? (
    <tr>
      <td colSpan="3" className="text-center py-4">
        You Don't have Any slot
      </td>
    </tr>
  ) : Array.isArray(slot) ? ( 
    slot.map((order) => (
      <tr key={order._id} className="odd:bg-gray-100">
        <td className="px-4 py-2 border text-sm">
          {order.date} {order.time}
        </td>
        <td className="px-4 py-2 border text-sm">{order.recording_type}</td>
        <td className="px-4 py-2 border text-sm">{order.session_duration}</td>
      </tr>
    ))
  ) : (
    <tr className="odd:bg-gray-100">
      <td className="px-4 py-2 border text-sm">
        {slot.date} {slot.time}
      </td>
      <td className="px-4 py-2 border text-sm">{slot.recording_type}</td>
      <td className="px-4 py-2 border text-sm">{slot.session_duration}</td>
    </tr>
  )}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
