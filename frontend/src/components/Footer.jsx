import React from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import logo from '../assets/POETHERAPY 6.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-96 flex justify-center">
      <div className="w-11/12 md:w-10/12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <img
              src={logo}
              alt="poeTherapy"
              className="mb-4 h-10 cursor-pointer"
            />
            <h3 className="text-md text-gray-400 mb-4 md:mb-0">Unleash Your Sound</h3>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link
              to="https://www.instagram.com/poetherapy_session/"
              className="hover:cursor-pointer"
            >
              <AiOutlineInstagram className="w-5 h-6" />
            </Link>
            <Link
              to="mailto:a2wskystudios@gmail.com"
              className="hover:cursor-pointer"
              target="_blank"
            >
              <MdOutlineMail className="w-5 h-6" />
            </Link>
            <Link
              to="https://api.whatsapp.com/send?phone=250787771750&text=Hello, whatsapp!"
              className="hover:cursor-pointer"
              target="_blank"
            >
              <FaWhatsapp className="w-4 h-6" />
            </Link>
          </div>
        </div>
        <div className="container mx-auto mt-4 text-center text-gray-400">
          <p>©POETHERAPY INK LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
