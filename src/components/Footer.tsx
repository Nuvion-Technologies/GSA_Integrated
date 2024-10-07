import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-900 py-16">
      <div className="container mx-auto px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Sitemap Links */}
          <div className="w-full">
            <h2 className="text-xl font-oswald font-bold mb-6">Sitemap</h2>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-blue-500 transition duration-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-500 transition duration-300">About Us</Link></li>
              <li><Link to="/gallery" className="hover:text-blue-500 transition duration-300">Gallery</Link></li>
              <li><Link to="/academy" className="hover:text-blue-500 transition duration-300">Academy</Link></li>
              <li><Link to="/playground" className="hover:text-blue-500 transition duration-300">Playground</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500 transition duration-300">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="w-full">
            <h2 className="text-xl font-oswald font-bold mb-6">Our Services</h2>
            <ul className="space-y-3">
              <li><Link to="/coaching" className="hover:text-blue-500 transition duration-300">Sports Coaching</Link></li>
              <li><Link to="/ground-booking" className="hover:text-blue-500 transition duration-300">Ground Booking</Link></li>
              <li><Link to="/turf-booking" className="hover:text-blue-500 transition duration-300">Turf Booking</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full">
            <h2 className="text-xl font-oswald font-bold mb-6">Contact Us</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FaPhoneAlt className="text-gray-600" size={20} />
                <a href="tel:+1234567890" className="hover:text-blue-500 transition duration-300">+1 (234) 567-890</a>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-gray-600" size={20} />
                <p className="hover:text-blue-500 transition duration-300">123 Sports Avenue, Gandhinagar, Gujarat</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-600" size={20} />
                <a href="mailto:info@gandhinagarsportsacademy.com" className="hover:text-blue-500 transition duration-300">info@gandhinagarsportsacademy.com</a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex space-x-4">
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-500 transition duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <FaFacebookF size={24} />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-500 transition duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <FaTwitter size={24} />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-500 transition duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <FaInstagram size={24} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-500 transition duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <FaLinkedinIn size={24} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="mb-12">
          <h2 className="text-xl font-oswald font-bold mb-6">Find Us</h2>
          <div className="w-full h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2130.6684730513057!2d72.65459278071714!3d23.207337277791908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b6ab992d373%3A0xc9c5fa26655cd42e!2sGSA%20Box%20Cricket!5e1!3m2!1sen!2sin!4v1725007025312!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Gandhinagar Sports Academy. All rights reserved.</p>
          <p className="mt-2">Designed by <a href="https://www.nuviontech.com" className="hover:text-blue-500 transition duration-300">Nuvion Technologies</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
