import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCredentials } from '../slices/userSlices/authSlice';
import { useLoginMutation, useGoogleLoginMutation } from '../slices/userSlices/userApiSlice';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast'
import Spinner from './Spinner';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';

const LoginUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [login] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation()

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(getCredentials({ ...res }));
      toast.success('login successfully');
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loginByGoogle = useGoogleLogin({
    onSuccess: async (response) => {

    setIsLoading(true);
    try {
      const accessToken = response.access_token
      const res = await fetch('/api/users/login-google', {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({accessToken})
      })
      const data = await res.json()
      dispatch(getCredentials(data));
      toast.success('login successfully');
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    },
    onError: (error) => {
      console.log('Google Sign-In failed:', error);
    },

  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0C121C]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border border-gray-300 rounded w-80 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Enter your password"
            className="px-4 py-2 border border-gray-300 rounded w-80 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/forgot" className="block mt-2 text-sm text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </div>
        {isLoading && <Spinner />}
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-md w-80 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 hover:bg-orange-600"
        >
          Login
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-white text-gray-700 px-4 py-2 rounded-md w-80 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
          onClick={() => loginByGoogle()}
        >
          <FcGoogle className="mr-2" /> Login with Google
        </button>
        <p className="text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginUser;