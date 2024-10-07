import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      
      const fetchProfileImage = async () => {
        try {
          const response = await fetch('http://gsa.nuviontech.com:8000/api/user/', {
            method: 'POST', // Using POST to make the request
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Pass the token in Authorization header
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            const profile_img = data.profile; // Assuming 'profileImage' is the field in the response
            setProfileImage(profile_img); // Set profile image URL
          } else {
            console.error('Failed to fetch profile image');
          }
        } catch (error) {
          console.error('Error fetching profile image:', error);
        }
      };
  
      fetchProfileImage(); // Call the function to fetch the profile image
    }
  }, []);

  const handleNavigateAndScroll = (sectionId: string) => {
    if (pathname !== '/') {
      navigate('/');
    }
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md text-gray-900' : 'bg-transparent text-white'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="/gsa_logo.jpg"
            alt="Gandhinagar Sports Academy Logo"
            className="md:w-16 md:h-16 w-14 h-14 rounded-full"
          />
          <div className="md:text-2xl font-bold drop-shadow-lg">
            <Link to="/">Gandhinagar Sports Academy</Link>
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-inherit">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <div className="md:flex items-center space-x-8 hidden font-poppins drop-shadow-lg">
          <button onClick={() => handleNavigateAndScroll('home')} className="hover:text-gray-300 transition duration-300">
            HOME
          </button>
          <button onClick={() => handleNavigateAndScroll('about')} className="hover:text-gray-300 transition duration-300">
            ABOUT US
          </button>
          <button onClick={() => handleNavigateAndScroll('gallery')} className="hover:text-gray-300 transition duration-300">
            GALLERY
          </button>
          <button onClick={() => handleNavigateAndScroll('academy')} className="hover:text-gray-300 transition duration-300">
            ACADEMY
          </button>
          <button onClick={() => handleNavigateAndScroll('playground')} className="hover:text-gray-300 transition duration-300">
            PLAYGROUND
          </button>
          <button onClick={() => handleNavigateAndScroll('contact')} className="hover:text-gray-300 transition duration-300">
            CONTACT US
          </button>

          {isLoggedIn ? (
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <img
                src={profileImage || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                  <Link
                    to="/editprofile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
            >
              LOGIN
            </Link>
          )}
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="font-poppins fixed inset-0 bg-white text-gray-900 flex flex-col items-center justify-center space-y-6 md:hidden z-50"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <button onClick={toggleMenu} className="absolute top-4 right-4 text-gray-900">
                <FaTimes size={24} />
              </button>
              <button
                onClick={() => {
                  handleNavigateAndScroll('home');
                  handleMenuItemClick();
                }}
                className="text-2xl hover:text-gray-600 transition duration-300"
              >
                Home
              </button>
              <button
                onClick={() => {
                  handleNavigateAndScroll('about');
                  handleMenuItemClick();
                }}
                className="text-2xl hover:text-gray-600 transition duration-300"
              >
                About Us
              </button>
              <button
                onClick={() => {
                  handleNavigateAndScroll('gallery');
                  handleMenuItemClick();
                }}
                className="text-2xl hover:text-gray-600 transition duration-300"
              >
                Gallery
              </button>
              <button
                onClick={() => {
                  handleNavigateAndScroll('academy');
                  handleMenuItemClick();
                }}
                className="text-2xl hover:text-gray-600 transition duration-300"
              >
                Academy
              </button>
              <button
                onClick={() => {
                  handleNavigateAndScroll('playground');
                  handleMenuItemClick();
                }}
                className="text-2xl hover:text-gray-600 transition duration-300"
              >
                Playground
              </button>
              <button
                onClick={() => {
                  handleNavigateAndScroll('contact');
                  handleMenuItemClick();
                }}
                className="text-2xl hover:text-gray-600 transition duration-300"
              >
                Contact Us
              </button>

              {isLoggedIn ? (
                <img
                  src={profileImage || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => navigate('/profile')}
                />
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                  onClick={handleMenuItemClick}
                >
                  Login
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const toggleMenu = () => setIsOpen(!isOpen);

//   const handleMenuItemClick = () => {
//     setIsOpen(false);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsLoggedIn(true);
//       const storedProfileImage = localStorage.getItem('profileImage');
//       setProfileImage(storedProfileImage ? 'http://gsa.nuviontech.com:8000' + storedProfileImage : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png');
//     }
//   }, []);

//   const handleNavigateAndScroll = (sectionId: string) => {
//     if (pathname !== '/') {
//       navigate('/');
//     }
//     setTimeout(() => {
//       const section = document.getElementById(sectionId);
//       if (section) {
//         section.scrollIntoView({ behavior: 'smooth' });
//       }
//     }, 100);
//   };

//   return (
//     <nav
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         isScrolled ? 'bg-white shadow-md text-gray-900' : 'bg-transparent text-white'
//       }`}
//     >
//       <div className="container mx-auto px-6 py-4 flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <img
//             src="/gsa_logo.jpg"
//             alt="Gandhinagar Sports Academy Logo"
//             className="md:w-16 md:h-16 w-14 h-14 rounded-full"
//           />
//           <div className="md:text-2xl font-bold drop-shadow-lg">
//             <Link to="/">Gandhinagar Sports Academy</Link>
//           </div>
//         </div>
//         <div className="md:hidden flex items-center">
//           <button onClick={toggleMenu} className="text-inherit">
//             {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>
//         <div className="md:flex items-center space-x-8 hidden font-poppins drop-shadow-lg">
//           <button onClick={() => handleNavigateAndScroll('home')} className="hover:text-gray-300 transition duration-300">
//             HOME
//           </button>
//           <button onClick={() => handleNavigateAndScroll('about')} className="hover:text-gray-300 transition duration-300">
//             ABOUT US
//           </button>
//           <button onClick={() => handleNavigateAndScroll('gallery')} className="hover:text-gray-300 transition duration-300">
//             GALLERY
//           </button>
//           <button onClick={() => handleNavigateAndScroll('academy')} className="hover:text-gray-300 transition duration-300">
//             ACADEMY
//           </button>
//           <button onClick={() => handleNavigateAndScroll('playground')} className="hover:text-gray-300 transition duration-300">
//             PLAYGROUND
//           </button>
//           <button onClick={() => handleNavigateAndScroll('contact')} className="hover:text-gray-300 transition duration-300">
//             CONTACT US
//           </button>

//           {isLoggedIn ? (
//             <img
//               src={profileImage || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
//               alt="Profile"
//               className="w-10 h-10 rounded-full cursor-pointer"
//               onClick={() => navigate('/profile')}
//             />
//           ) : (
//             <Link
//               to="/login"
//               className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
//             >
//               LOGIN
//             </Link>
//           )}
//         </div>

//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               className="font-poppins fixed inset-0 bg-white text-gray-900 flex flex-col items-center justify-center space-y-6 md:hidden z-50"
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ duration: 0.3 }}
//             >
//               <button onClick={toggleMenu} className="absolute top-4 right-4 text-gray-900">
//                 <FaTimes size={24} />
//               </button>
//               <button
//                 onClick={() => {
//                   handleNavigateAndScroll('home');
//                   handleMenuItemClick();
//                 }}
//                 className="text-2xl hover:text-gray-600 transition duration-300"
//               >
//                 Home
//               </button>
//               <button
//                 onClick={() => {
//                   handleNavigateAndScroll('about');
//                   handleMenuItemClick();
//                 }}
//                 className="text-2xl hover:text-gray-600 transition duration-300"
//               >
//                 About Us
//               </button>
//               <button
//                 onClick={() => {
//                   handleNavigateAndScroll('gallery');
//                   handleMenuItemClick();
//                 }}
//                 className="text-2xl hover:text-gray-600 transition duration-300"
//               >
//                 Gallery
//               </button>
//               <button
//                 onClick={() => {
//                   handleNavigateAndScroll('academy');
//                   handleMenuItemClick();
//                 }}
//                 className="text-2xl hover:text-gray-600 transition duration-300"
//               >
//                 Academy
//               </button>
//               <button
//                 onClick={() => {
//                   handleNavigateAndScroll('playground');
//                   handleMenuItemClick();
//                 }}
//                 className="text-2xl hover:text-gray-600 transition duration-300"
//               >
//                 Playground
//               </button>
//               <button
//                 onClick={() => {
//                   handleNavigateAndScroll('contact');
//                   handleMenuItemClick();
//                 }}
//                 className="text-2xl hover:text-gray-600 transition duration-300"
//               >
//                 Contact Us
//               </button>

//               {isLoggedIn ? (
//                 <img
//                   src={profileImage || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
//                   alt="Profile"
//                   className="w-10 h-10 rounded-full cursor-pointer"
//                   onClick={() => navigate('/profile')}
//                 />
//               ) : (
//                 <Link
//                   to="/login"
//                   className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
//                   onClick={handleMenuItemClick}
//                 >
//                   Login
//                 </Link>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const { pathname } = useLocation(); // Get the current path
//   const navigate = useNavigate(); // React Router's navigate function

//   const toggleMenu = () => setIsOpen(!isOpen);

//   const handleMenuItemClick = () => {
//     setIsOpen(false);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50); // Update state based on scroll position
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   // Function to handle navigation and scroll
//   const handleNavigateAndScroll = (sectionId: string) => {
//     if (pathname !== '/') {
//       // If not on the home page, navigate to home page first
//       navigate('/');
//     }
//     // After navigating, scroll to the section
//     setTimeout(() => {
//       const section = document.getElementById(sectionId);
//       if (section) {
//         section.scrollIntoView({ behavior: 'smooth' });
//       }
//     }, 100); // Delay to ensure navigation has completed
//   };

//   return (
//     <nav
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         isScrolled ? 'bg-white shadow-md text-gray-900' : 'bg-transparent text-white'
//       }`}
//     >
//       <div className="container mx-auto px-6 py-4 flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <img
//             src="/gsa_logo.jpg"
//             alt="Gandhinagar Sports Academy Logo"
//             className="md:w-16 md:h-16 w-14 h-14 rounded-full"
//           />
//           <div className="md:text-2xl font-bold drop-shadow-lg">
//             {/* Black shadow for better visibility */}
//             <Link to="/">Gandhinagar Sports Academy</Link>
//           </div>
//         </div>
//         <div className="md:hidden flex items-center">
//           <button onClick={toggleMenu} className="text-inherit">
//             {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>
//         <div className="md:flex items-center space-x-8 hidden font-poppins drop-shadow-lg">
//           {/* Black shadow for text */}
//           <button onClick={() => handleNavigateAndScroll('home')} className="hover:text-gray-300 transition duration-300">
//             HOME
//           </button>
//           <button onClick={() => handleNavigateAndScroll('about')} className="hover:text-gray-300 transition duration-300">
//             ABOUT US
//           </button>
//           <button onClick={() => handleNavigateAndScroll('gallery')} className="hover:text-gray-300 transition duration-300">
//             GALLERY
//           </button>
//           <button onClick={() => handleNavigateAndScroll('academy')} className="hover:text-gray-300 transition duration-300">
//             ACADEMY
//           </button>
//           <button onClick={() => handleNavigateAndScroll('playground')} className="hover:text-gray-300 transition duration-300">
//             PLAYGROUND
//           </button>
//           <button onClick={() => handleNavigateAndScroll('contact')} className="hover:text-gray-300 transition duration-300">
//             CONTACT US
//           </button>
//           <Link
//             to="/login"
//             className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
//           >
//             LOGIN
//           </Link>
//         </div>
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               className="font-poppins fixed inset-0 bg-white text-gray-900 flex flex-col items-center justify-center space-y-6 md:hidden z-50"
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ duration: 0.3 }}
//             >
//               <button onClick={toggleMenu} className="absolute top-4 right-4 text-gray-900">
//                 <FaTimes size={24} />
//               </button>
//               <button
//                 onClick={() => {
//                   handleNavigateAndScroll('home');
//                   handleMenuItemClick();
//                 }}
//                 className="text-2xl hover:text-gray-600 transition duration-300"
//               >
//                 Home
//               </button>
//               <button
//                 onClick={() => {
//                   handleNavigateAndScroll('about');
//                   handleMenuItemClick();
//                 }}
//                 className="text-2xl hover:text-gray-600 transition duration-300"
//               >
//                 About Us
//               </button>
//               <button
//                 onClick={() => {
//                   handleNavigateAndScroll('gallery');
//                   handleMenuItemClick();
//                 }}
//                 className="text-2xl hover:text-gray-600 transition duration-300"
//               >
//                 Gallery
//               </button>
//               <button
//                 onClick={() => {
//                   handleNavigateAndScroll('academy');
//                   handleMenuItemClick();
//                 }}
//                 className="text-2xl hover:text-gray-600 transition duration-300"
//               >
//                 Academy
//               </button>
//               <button
//                 onClick={() => {
//                   handleNavigateAndScroll('playground');
//                   handleMenuItemClick();
//                 }}
//                 className="text-2xl hover:text-gray-600 transition duration-300"
//               >
//                 Playground
//               </button>
//               <button
//                 onClick={() => {
//                   handleNavigateAndScroll('contact');
//                   handleMenuItemClick();
//                 }}
//                 className="text-2xl hover:text-gray-600 transition duration-300"
//               >
//                 Contact Us
//               </button>
//               <Link
//                 to="/login"
//                 className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
//                 onClick={handleMenuItemClick}
//               >
//                 Login
//               </Link>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
