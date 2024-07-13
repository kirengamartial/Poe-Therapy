import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCredentials } from '../slices/userSlices/authSlice';
import { useRegisterMutation, useGoogleRegisterMutation } from '../slices/userSlices/userApiSlice';
import toast from 'react-hot-toast'
import Spinner from './Spinner';
import { FcGoogle } from 'react-icons/fc'; 
import { useGoogleLogin } from '@react-oauth/google';

const RegisterUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();
  const [googleRegister] = useGoogleRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (password === confirmPassword) {
        const formData = {
          name: name,
          email: email,
          password: password,
        };

        const user = await register(formData).unwrap();
        dispatch(getCredentials({ ...user }));
        toast.success('register successfully');
        navigate('/');
      } else {
        toast.error('Password mismatch');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const registerByGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      try {
        const accessToken = response.access_token;
        const res = await googleRegister({accessToken}).unwrap()
        if(res.message === 'This email already exists') {
          return toast.error(res.message)
        }
        dispatch(getCredentials({...res}));
        toast.success('register successfully');
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
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>

          <input
            type="text"
            placeholder="Name"
            name="name"
            className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {isLoading && <Spinner />}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white font-semibold focus:ring-orange-500 rounded-md hover:bg-orange-600"
          >
            Create account
          </button>
          <button
            type="button"
            className="flex items-center justify-center bg-white text-gray-700 px-4 py-2 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
            onClick={() => registerByGoogle()}
          >
            <FcGoogle className="mr-2" /> Sign up with Google
          </button>
          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
