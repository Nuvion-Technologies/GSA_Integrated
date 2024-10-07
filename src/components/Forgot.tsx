// import React from 'react';
// import { Link,useNavigate } from 'react-router-dom';
// import LogoImage from '/gsa_logo.jpg'; // Replace with your logo path

// const ForgotPassword: React.FC = () => {
//     const navigate = useNavigate(); // Initialize navigate

//   // Function to handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault(); // Prevent the default form submission behavior
//     // Here you can add the logic to send the OTP to the user's email
//     // After sending the OTP, navigate to the /verify page
//     navigate('/verify');};
//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
//       {/* Logo and Heading outside the login box in the top-left corner */}
//       <div className="absolute top-4 left-4 flex items-center space-x-2 md:space-x-3 md:top-8 md:left-8">
//         <img src={LogoImage} alt="Logo" className="w-10 h-10 rounded-full md:w-12 md:h-12" />
//         <h1 className="text-lg md:text-2xl font-bold text-gray-800">Gandhinagar Sports Academy</h1>
//       </div>

//       {/* Forgot Password Container with image and form side-by-side */}
//       <div className="relative z-10 bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden max-w-md md:max-w-4xl w-full">
//         {/* Image Side */}
//         <div className="hidden md:block md:w-1/2 p-2">
//           <img
//             src="/cricketer.jpg"
//             alt="Sports Background"
//             className="object-cover h-full w-full rounded-md"
//           />
//         </div>

//         {/* Form Side */}
//         <div className="w-full md:w-1/2 p-6 md:p-8">
//           {/* Back to Home */}
//           <Link to="/login" className="text-blue-500 hover:underline mb-4 block">
//             &larr; Back to Login
//           </Link>

//           {/* Heading */}
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">Forgot Password</h2>

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
//                 required
//               />
//             </div>

//             {/* Reset Password Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
//             >
//               Send OTP
//             </button>
//           </form>

//           {/* Sign Up Link */}
//           <p className="mt-6 md:mt-8 text-center text-gray-600">
//             Remember your password?{' '}
//             <Link to="/login" className="text-blue-500 hover:underline">
//               Login
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

// export default ForgotPassword;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import HCaptcha from '@hcaptcha/react-hcaptcha'; // hCaptcha component
import LogoImage from '/gsa_logo.jpg'; // Replace with your logo path

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [email, setEmail] = useState<string>(''); // Email state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Button loading state
  const [captchaToken, setCaptchaToken] = useState<string | null>(null); // hCaptcha token state
  const [error, setError] = useState<string | null>(null); // Error message state

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if hCaptcha is completed
    if (!captchaToken) {
      setError('Please complete the CAPTCHA.');
      return;
    }

    setIsSubmitting(true); // Start button loading animation
    setError(null); // Clear previous errors

    try {
      // API request to send OTP
      const response = await axios.post('http://gsa.nuviontech.com:8000/api/forgotpasswordsendotp/', {
        email: email,
        captchaToken: captchaToken, // Send hCaptcha token along with the request
      });

      if (response.status === 200) {
        navigate('/forgotverify'); // Redirect to verify page on success
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsSubmitting(false); // Stop button loading animation
    }
  };

  // Handle hCaptcha verification
  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    setError(null); // Clear error when CAPTCHA is completed
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Logo and Heading outside the login box */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 md:space-x-3 md:top-8 md:left-8">
        <img src={LogoImage} alt="Logo" className="w-10 h-10 rounded-full md:w-12 md:h-12" />
        <h1 className="text-lg md:text-2xl font-bold text-gray-800">Gandhinagar Sports Academy</h1>
      </div>

      {/* Forgot Password Form */}
      <div className="relative z-10 bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden max-w-md md:max-w-4xl w-full">
        <div className="hidden md:block md:w-1/2 p-2">
          <img
            src="/cricketer.jpg"
            alt="Sports Background"
            className="object-cover h-full w-full rounded-md"
          />
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <Link to="/login" className="text-blue-500 hover:underline mb-4 block">
            &larr; Back to Login
          </Link>

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">
            Forgot Password
          </h2>

          <form onSubmit={handleSubmit}>
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

            {/* hCaptcha */}
            <div className="mb-4" style={{ display: 'flex', justifyContent: 'center' }}>
              <HCaptcha
                sitekey="0c5428a0-f780-455c-af54-5298b6eedfd2"// Replace with your hCaptcha site key
                onVerify={handleCaptchaVerify}
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Submit Button with animation */}
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <span className="loader" /> {/* Loading spinner */}
                  <span>Sending...</span>
                </div>
              ) : (
                'Send OTP'
              )}
            </button>
          </form>

          <p className="mt-6 md:mt-8 text-center text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-right space-y-1 md:space-y-2 z-10">
        <Link to="/privacy-policy" className="text-xs md:text-sm hover:underline block">Privacy Policy</Link>
        <Link to="/terms-and-conditions" className="text-xs md:text-sm hover:underline block">Terms and Conditions</Link>
        <Link to="/refund-policy" className="text-xs md:text-sm hover:underline block">Refund Policy</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;