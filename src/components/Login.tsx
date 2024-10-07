// import React from 'react';
// import { Link,useNavigate } from 'react-router-dom';
// import LogoImage from '/gsa_logo.jpg'; // Replace with your logo path

// const Login: React.FC = () => {
//   const navigate = useNavigate(); // Initialize navigate

//     // Function to handle form submission
//     const handleSubmit = (e: React.FormEvent) => {
//       e.preventDefault(); // Prevent the default form submission behavior
//       // Here you can add the logic to send the OTP to the user's email
//       // After sending the OTP, navigate to the /verify page
//       navigate('/verify'); // Redirect to the verify page
//     };
//   return (
    
//     <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
//       {/* Logo and Heading outside the login box in the top-left corner */}
//       <div className="absolute top-4 left-4 flex items-center space-x-2 md:space-x-3 md:top-8 md:left-8">
//         <img src={LogoImage} alt="Logo" className="w-10 h-10 rounded-full md:w-12 md:h-12" />
//         <h1 className="text-lg md:text-2xl font-bold text-gray-800">Gandhinagar Sports Academy</h1>
//       </div>

//       {/* Login Container with image and form side-by-side */}
//       <div className="relative z-10 bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden max-w-md md:max-w-4xl w-full">
//         {/* Image Side */}
//         <div className="hidden md:block md:w-1/2">
//           <img
//             src="/cric.png"
//             alt="Sports Background"
//             className="object-cover h-full w-full"
//           />
//         </div>

//         {/* Form Side */}
//         <div className="w-full md:w-1/2 p-6 md:p-8">
//           {/* Back to Home */}
//           <Link to="/" className="text-blue-500 hover:underline mb-4 block">
//             &larr; Back to Home
//           </Link>

//           {/* Heading */}
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">Login</h2>

//           {/* Form */}
//           <form>
//             {/* Email Input */}
//             <div className="mb-4 md:mb-6">
//               <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             {/* Password Input */}
//             <div className="mb-4 md:mb-6">
//               <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             {/* Forgot Password Link */}
//             <div className="mb-4 md:mb-6 text-right">
//               <Link to="/forgotpassword" className="text-sm text-blue-500 hover:underline">
//                 Forgot Password?
//               </Link>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
//             >
//               Login
//             </button>
//           </form>

//           {/* Sign Up Link */}
//           <p className="mt-6 md:mt-8 text-center text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/signup" className="text-blue-500 hover:underline">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Footer Links with spacing in the bottom right corner */}
//       <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-right space-y-1 md:space-y-2 z-10">
//         <Link to="/privacy-policy" className="text-xs md:text-sm hover:underline block">Privacy Policy</Link>
//         <Link to="/terms-and-conditions" className="text-xs md:text-sm hover:underline block">Terms and Conditions</Link>
//         <Link to="/refund-policy" className="text-xs md:text-sm hover:underline block">Refund Policy</Link>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import LogoImage from '/gsa_logo.jpg'; // Replace with your logo path
// import axios from 'axios'; // Import axios for making API requests

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState<string>(''); // State for email input
//   const [password, setPassword] = useState<string>(''); // State for password input
//   const [error, setError] = useState<string | null>(null); // State for error messages

//   // Function to handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); // Prevent default form submission

//     try {
//       // Send the login request to the backend API
//       const response = await axios.post('http://gsa.nuviontech.com:8000/api/login/', {
//         email: email,
//         password: password,
//       });

//       // Check if login is successful
//       if (response.status === 200) {
//         const { token, username, user_email } = response.data;

//         // Store the token in localStorage (or sessionStorage)
//         localStorage.setItem('token', token);
//         localStorage.setItem('username', username);
//         localStorage.setItem('user_email', user_email);

//         // Redirect to the dashboard or verify page
//         navigate('/dashboard'); // Adjust to your desired route
//       }
//     } catch (err) {
//       // Handle error, such as invalid credentials
//       setError('Invalid credentials. Please try again.');
//     }
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
//       {/* Logo and Heading outside the login box in the top-left corner */}
//       <div className="absolute top-4 left-4 flex items-center space-x-2 md:space-x-3 md:top-8 md:left-8">
//         <img src={LogoImage} alt="Logo" className="w-10 h-10 rounded-full md:w-12 md:h-12" />
//         <h1 className="text-lg md:text-2xl font-bold text-gray-800">Gandhinagar Sports Academy</h1>
//       </div>

//       {/* Login Container with image and form side-by-side */}
//       <div className="relative z-10 bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden max-w-md md:max-w-4xl w-full">
//         {/* Image Side */}
//         <div className="hidden md:block md:w-1/2">
//           <img
//             src="/cric.png"
//             alt="Sports Background"
//             className="object-cover h-full w-full"
//           />
//         </div>

//         {/* Form Side */}
//         <div className="w-full md:w-1/2 p-6 md:p-8">
//           {/* Back to Home */}
//           <Link to="/" className="text-blue-500 hover:underline mb-4 block">
//             &larr; Back to Home
//           </Link>

//           {/* Heading */}
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">Login</h2>

//           {/* Form */}
//           <form onSubmit={handleSubmit}>
//             {/* Email Input */}
//             <div className="mb-4 md:mb-6">
//               <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Password Input */}
//             <div className="mb-4 md:mb-6">
//               <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Error Message */}
//             {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//             {/* Login Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
//             >
//               Login
//             </button>
//           </form>

//           {/* Sign Up Link */}
//           <p className="mt-6 md:mt-8 text-center text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/signup" className="text-blue-500 hover:underline">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Footer Links */}
//       <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-right space-y-1 md:space-y-2 z-10">
//         <Link to="/privacy-policy" className="text-xs md:text-sm hover:underline block">Privacy Policy</Link>
//         <Link to="/terms-and-conditions" className="text-xs md:text-sm hover:underline block">Terms and Conditions</Link>
//         <Link to="/refund-policy" className="text-xs md:text-sm hover:underline block">Refund Policy</Link>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoImage from '/gsa_logo.jpg'; // Replace with your logo path
import axios from 'axios'; // Import axios for making API requests
import HCaptcha from '@hcaptcha/react-hcaptcha'; // Import hCaptcha

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>(''); // State for email input
  const [password, setPassword] = useState<string>(''); // State for password input
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // To disable button and add animation
  const [captchaToken, setCaptchaToken] = useState<string | null>(null); // State for hCaptcha token

  // Handle hCaptcha verification
  const handleCaptchaVerification = (token: string) => {
    setCaptchaToken(token);
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Check if hCaptcha is completed
    if (!captchaToken) {
      setError('Please complete the hCaptcha verification.');
      return;
    }

    setIsSubmitting(true); // Disable the button and show animation

    try {
      // Send the login request to the backend API
      const response = await axios.post('http://gsa.nuviontech.com:8000/api/weblogin/', {
        email: email,
        password: password,
        'h-captcha-response': captchaToken, // Send captcha token to backend
      });

      console.log(response.data);
      // Check if login is successful
      if (response.status === 200) {
        const { token, username, user_email } = response.data;
        // Store the token in localStorage (or sessionStorage)
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('user_email', user_email);
        console.log(response.data.profile_image);
        localStorage.setItem('profileImage', response.data.profile_image);
        localStorage.setItem('csrfToken', response.data.csrfToken);

        // Redirect to the dashboard or verify page
        navigate('/dashboard'); // Adjust to your desired route
      }
    } catch (err) {
      // Handle error, such as invalid credentials
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsSubmitting(false); // Re-enable the button after submission
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Logo and Heading outside the login box in the top-left corner */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 md:space-x-3 md:top-8 md:left-8">
        <img src={LogoImage} alt="Logo" className="w-10 h-10 rounded-full md:w-12 md:h-12" />
        <h1 className="text-lg md:text-2xl font-bold text-gray-800">Gandhinagar Sports Academy</h1>
      </div>

      {/* Login Container with image and form side-by-side */}
      <div className="relative z-10 bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden max-w-md md:max-w-4xl w-full">
        {/* Image Side */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/cric.png"
            alt="Sports Background"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          {/* Back to Home */}
          <Link to="/" className="text-blue-500 hover:underline mb-4 block">
            &larr; Back to Home
          </Link>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">Login</h2>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4 md:mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4 md:mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* Forgot Password Link */}
             <div className="mb-4 md:mb-6 text-right">
               <Link to="/forgotpassword" className="text-sm text-blue-500 hover:underline">
                 Forgot Password?
               </Link>
             </div>

            {/* hCaptcha */}
            <div className="mb-4" style={{ display: 'flex', justifyContent: 'center' }}>
              <HCaptcha
                sitekey="0c5428a0-f780-455c-af54-5298b6eedfd2" // Replace with your hCaptcha site key
                onVerify={handleCaptchaVerification}
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Login Button with animation */}
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg transition-transform duration-300 transform ${isSubmitting ? 'scale-95' : 'hover:scale-105'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 md:mt-8 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-right space-y-1 md:space-y-2 z-10">
        <Link to="/privacy-policy" className="text-xs md:text-sm hover:underline block">Privacy Policy</Link>
        <Link to="/terms-and-conditions" className="text-xs md:text-sm hover:underline block">Terms and Conditions</Link>
        <Link to="/refund-policy" className="text-xs md:text-sm hover:underline block">Refund Policy</Link>
      </div>
    </div>
  );
};

export default Login; 