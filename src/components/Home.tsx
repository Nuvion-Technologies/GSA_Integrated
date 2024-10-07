import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserGraduate, FaImages } from "react-icons/fa";
import { IoFootball } from "react-icons/io5";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import Carousel styles
import SocialLinks from "./Links";// Import the loader context

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle link click
  const handleLinkClick = (path: string) => {// Start the loader
    navigate(path); // Navigate to the path
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      <div
        className="flex-grow flex items-center bg-cover bg-center relative text-white"
        style={{
          backgroundImage: `url(/bg3.png)`,
        }}
      >
        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white bg-opacity-30 bg-black px-4 md:px-8 py-10 w-full">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 mt-32 font-oswald">
            Welcome to Gandhinagar Sports Academy
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-12">
            Discover our world-class facilities and join a vibrant community dedicated to sports excellence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card Component */}
            <motion.div
              className="relative group bg-white text-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center justify-between w-64 mx-auto transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <IoFootball className="text-4xl mb-4 text-blue-500" />
              <h3 className="text-lg font-semibold mb-2">Turf Booking</h3>
              <p className="text-center mb-4 text-sm">
                Book our top-notch turfs for your next game or event.
              </p>
              <button
                onClick={() => handleLinkClick("/bookturf")}
                className="text-blue-500 hover:underline"
              >
                Learn More
              </button>
            </motion.div>

            {/* Join Us Card */}
            <motion.div
              className="relative group bg-white text-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center justify-between w-64 mx-auto transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <FaUserGraduate className="text-4xl mb-4 text-green-500" />
              <h3 className="text-lg font-semibold mb-2">Join Us</h3>
              <p className="text-center mb-4 text-sm">
                Become a part of our academy and enhance your skills with expert training.
              </p>
              <button
                onClick={() => handleLinkClick("/academy")}
                className="text-green-500 hover:underline"
              >
                Learn More
              </button>
            </motion.div>

            {/* Gallery Card */}
            <motion.div
              className="relative group bg-white text-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center justify-between w-64 mx-auto transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <FaImages className="text-4xl mb-4 text-red-500" />
              <h3 className="text-lg font-semibold mb-2">Gallery</h3>
              <p className="text-center mb-4 text-sm">
                Explore the highlights and memorable moments captured at our academy.
              </p>
              <button
                onClick={() => handleLinkClick("/gallery")}
                className="text-red-500 hover:underline"
              >
                Explore Gallery
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      <SocialLinks />
    </div>
  );
};

export default Home;
