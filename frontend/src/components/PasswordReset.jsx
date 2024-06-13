import React, { useState } from 'react';
import Spinner from './Spinner';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true)
   try {
    const token = window.location.href.split('=').pop();
    const res =  await fetch('/api/users/reset-password', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    });
    const data = await res.json()
    console.log(data)
    toast.success("edited successfully")
    navigate('/login')
   } catch (err) {
    console.log(err)
    toast.error(err?.data?.message || err.error)
   }finally {
    setIsLoading(false)
   }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0C121C]">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter new password"
              className="px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-sm text-gray-600 mt-4">Password requirements:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
              <li>Not less than 6 characters</li>
            </ul>
          </div>
          {isLoading && <Spinner/>}
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 hover:bg-orange-600"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;