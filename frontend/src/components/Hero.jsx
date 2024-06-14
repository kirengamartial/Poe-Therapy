import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/image2.jpg';
import logo from '../assets/POETHERAPY 6.png';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../slices/userSlices/authSlice';
import { useLogOutMutation } from '../slices/userSlices/userApiSlice';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast'

const Hero = () => {
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleAdminDropdown = () => {
    setIsAdminDropdownOpen(!isAdminDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logUserOut, { isLoading }] = useLogOutMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      const res = await logUserOut().unwrap();
      dispatch(logOut());
      navigate('/login');
    } catch (err) {
      toast.error(err?.data.message || err.error);
      console.log(err);
    }
  };

  return (
    <div className="relative">
      <div
        className="bg-cover bg-center min-h-screen flex justify-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="text-white w-10/12 relative z-10">
          <div className="flex justify-between mb-24">
            <img
              src={logo}
              alt="poeTherapy"
              className="mb-8 h-14 cursor-pointer mt-7"
            />
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? "": (
                <svg
                  className="w-8 h-8"
                  style={{marginTop: '-5px'}}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
            <nav
              className={`${
                isMenuOpen ? 'flex' : 'hidden'
              } text-sm md:flex  flex-col md:flex-row items-center justify-center fixed top-0 left-0 w-full h-full md:h-auto bg-gray-900 bg-opacity-90 md:bg-transparent md:static md:w-auto md:overflow-visible md:text-sm`}
              style={{marginTop: "-35px"}}
            >
              <button
                className="absolute top-4 right-4 text-white md:hidden"
                onClick={toggleMenu}
                
              >
                <svg
                  className="w-8 h-8"
                  style={{marginTop: '35px'}}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Link
                 to="/studio"
                  className="block md:inline-block text-white hover:text-gray-400 transition-colors duration-300 mb-4 md:mb-0 md:mr-6 py-2"
                       onClick={toggleMenu}
                   >
                    Studio
              </Link>
              <Link
                to="/gallery"
                className="block md:inline-block text-white hover:text-gray-400 transition-colors duration-300 mb-4 md:mb-0 md:mr-6 py-2"
                onClick={toggleMenu}
              >
                Gallery
              </Link>
              <Link
                to="/all-slot"
                className="block md:inline-block text-white hover:text-gray-400 transition-colors duration-300 mb-4 md:mb-0 md:mr-6 py-2"
                onClick={toggleMenu}
              >
                Slots
              </Link>
              <Link
                to="/blogs"
                className="block md:inline-block text-white hover:text-gray-400 transition-colors duration-300 mb-4 md:mb-0 md:mr-6 py-2"
                onClick={toggleMenu}
              >
                Blogs
              </Link>
              {userInfo && userInfo.isAdmin && (
                <div
                  className="relative inline-block text-white hover:text-gray-400 transition-colors duration-300 mb-4 md:mb-0 md:mr-6 py-2"
                  onMouseEnter={toggleAdminDropdown}
                  onMouseLeave={toggleAdminDropdown}
                >
                  <span>Admin</span>
                  <div
                    className={`absolute z-10 bg-white text-gray-800 rounded-md shadow-lg py-2 mt-2 md:mt-0 ${
                      isAdminDropdownOpen ? '' : 'hidden'
                    }`}
                    style={{
                      marginTop: '-0.005px',
                      left: '20px',
                    }}
                  >
                    <Link
                      to="/all-time"
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                      onClick={toggleMenu}
                    >
                      Time
                    </Link>
                    <Link
                      to="/admin-all-slot"
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                      onClick={toggleMenu}
                    >
                      Slots
                    </Link>
                    <Link
                      to="/admin-blog"
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                      onClick={toggleMenu}
                    >
                      Blog
                    </Link>
                    <Link
                      to="/admin-studio"
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                      onClick={toggleMenu}
                    >
                      Studio
                    </Link>
                    <Link
                      to="/admin-gallery"
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                      onClick={toggleMenu}
                    >
                      Gallery
                    </Link>
                  </div>
                </div>
              )}
              {userInfo && (
                <div
                  className="relative inline-block text-white hover:text-gray-400 transition-colors duration-300 mb-4 md:mb-0 py-2"
                  onMouseEnter={toggleUserDropdown}
                  onMouseLeave={toggleUserDropdown}
                >
                  <span >{userInfo.name}</span>
                  <div
                    className={`absolute z-10 bg-white text-gray-800 rounded-md shadow-lg py-2 ${
                      isUserDropdownOpen ? '' : 'hidden'
                    }`}
                    style={{
                      marginTop: '-0.005px',
                      left: '20px',
                    }}
                  >
                    <Link
                      to="/edit-user"
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                      onClick={toggleMenu}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
              {!userInfo && (
                <Link
                  to="/login"
                  className="text-white hover:text-gray-400 transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
          <h2 className="text-2xl sm:text-md mb-6">Healing Art & Creativity</h2>
          <p className="text-gray-400 text-sm mb-12 max-w-lg">
            Our bodies move to the music that our hearts generate. In a world where everything is moving so fast, art is
            the only thing that can keep us afloat.
          </p>
          <div className="flex">
            <Link to="/all-slot">
              <button className="bg-white text-gray-800 text-sm py-2 px-8 rounded-3xl hover:bg-gray-200 transition-colors duration-300 mr-2 ">
                Book now
              </button>
            </Link>
            {!userInfo && (
              <Link to="/register">
                <button className="bg-transparent text-sm border-solid border-2 border-white-500 text-white py-2 px-8 rounded-3xl hover:bg-orange-600 hover:border-none transition-colors duration-300">
                  Register
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
