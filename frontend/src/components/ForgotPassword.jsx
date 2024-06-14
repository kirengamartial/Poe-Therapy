import React, { useState } from 'react';
import Spinner from './Spinner';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast'

const LoginUser = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/users/reset-request', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0C121C]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border border-gray-300 rounded w-80 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {isLoading && <Spinner />}
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-md w-80 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 hover:bg-orange-600"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default LoginUser;