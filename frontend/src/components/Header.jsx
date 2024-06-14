import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../slices/userSlices/authSlice';
import logo from '../assets/POETHERAPY 6.png';
import { useLogOutMutation } from '../slices/userSlices/userApiSlice';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast'

const Header = () => {
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
    <header className="bg-gray-900 py-4 flex justify-center mb-5">
      <div className="container mx-auto flex justify-between items-center w-10/12">
        <Link to="/">
          <img src={logo} alt="poeTherapy" className="h-10 cursor-pointer" />
        </Link>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "" : (
            <svg
              className="w-8 h-8"
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
          } text-sm md:flex flex-col md:flex-row items-center justify-center fixed top-0 left-0 w-full h-full md:h-auto bg-gray-900 bg-opacity-90 md:bg-transparent md:static md:w-auto md:overflow-visible md:text-sm`}
          style={{ marginTop: "-20px" }}  // Adjust this margin to move the nav links up
        >
          <button
            className="absolute top-4 right-4 text-white md:hidden"
            onClick={toggleMenu}
          >
            <svg
              className="w-8 h-8"
              style={{marginTop: '25px'}}
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
          <NavLink
            to="/studio"
            className="block md:inline-block text-gray-400 hover:text-white transition-colors duration-300 mt-4 md:mt-0 md:mr-4 py-2"
            onClick={toggleMenu}
            
          >
            Studio
          </NavLink>
          <NavLink
            to="/gallery"
            className="block md:inline-block text-gray-400 hover:text-white transition-colors duration-300 mt-4 md:mt-0 md:mr-4 py-2"
            onClick={toggleMenu}
            
          >
            Gallery
          </NavLink>
          <NavLink
            to="/all-slot"
            className="block md:inline-block text-gray-400 hover:text-white transition-colors duration-300 mt-4 md:mt-0 md:mr-4 py-2"
            onClick={toggleMenu}
            
          >
            Slots
          </NavLink>
          <NavLink
            to="/blogs"
            className="block md:inline-block text-gray-400 hover:text-white transition-colors duration-300 mt-4 md:mt-0 md:mr-4 py-2"
            onClick={toggleMenu}
            
          >
            Blogs
          </NavLink>
          {userInfo && userInfo.isAdmin && (
            <div
              className="relative inline-block text-gray-400 hover:text-white transition-colors duration-300 mt-4 md:mt-0 md:mr-4 py-2"
              onMouseEnter={toggleAdminDropdown}
              onMouseLeave={toggleAdminDropdown}
            >
              <span>Admin</span>
              <div
                className={`absolute z-10 bg-white text-gray-800 rounded-md shadow-lg py-2 mt-2 md:mt-0 ${
                  isAdminDropdownOpen ? '' : 'hidden'
                }`}
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
              className="relative inline-block text-gray-400 hover:text-white transition-colors duration-300 mt-4 md:mt-0 py-2"
              onMouseEnter={toggleUserDropdown}
              onMouseLeave={toggleUserDropdown}
            >
              <span>{userInfo.name}</span>
              <div
                className={`absolute z-10 bg-white text-gray-800 rounded-md shadow-lg py-2 ${
                  isUserDropdownOpen ? '' : 'hidden'
                }`}
              >
                <NavLink
                  to="/edit-user"
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  Profile
                </NavLink>
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
            <NavLink
              to="/login"
              className="text-gray-400 hover:text-white transition-colors duration-300 mt-4 md:mt-0"
              onClick={toggleMenu}
              
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;