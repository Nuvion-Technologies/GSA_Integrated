// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import LogoImage from '/gsa_logo.jpg'; // Replace with your logo path

// const SignUp: React.FC = () => {
//   const navigate = useNavigate();

//   // State for form fields
//   const [formData, setFormData] = useState({
//     name: '',
//     mobile: '',
//     email: '',
//     dob: '',
//     gender: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   // Regex for mobile and email validation
//   const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile number regex
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation

//   // Function to handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setErrors({ confirmPassword: 'Passwords do not match' });
//       return;
//     }

//     if (!mobileRegex.test(formData.mobile)) {
//       setErrors({ mobile: 'Please enter a valid Indian mobile number' });
//       return;
//     }

//     if (!emailRegex.test(formData.email)) {
//       setErrors({ email: 'Please enter a valid email address' });
//       return;
//     }

//     navigate('/verify'); // Redirect to the verify page
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//     setErrors({}); // Reset errors when user starts typing
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center bg-gray-100 p-4 min-h-screen">
//       {/* Logo and Heading */}
//       <div className="absolute top-4 left-4 flex items-center space-x-3">
//         <img src={LogoImage} alt="Logo" className="w-10 h-10 rounded-full" />
//         <h1 className="text-lg md:text-2xl font-bold text-gray-800">Gandhinagar Sports Academy</h1>
//       </div>

//       {/* Signup Container */}
//       <div className="relative z-10 bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden max-w-md md:max-w-5xl w-full md:my-12 my-20">
//         {/* Image Side */}
//         <div className="hidden md:block w-1/3 p-2">
//           <img
//             src="/gallery_5.jpg"
//             alt="Sports Background"
//             className="object-cover h-full w-full rounded-md"
//           />
//         </div>

//         {/* Form Side */}
//         <div className="w-full md:w-2/3 p-6 md:p-8">
//           <Link to="/" className="text-blue-500 hover:underline mb-4 block">
//             &larr; Back to Home
//           </Link>

//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">Sign Up</h2>

//           <form onSubmit={handleSubmit}>
//             {/* Name Input - Full Width */}
//             <div className="mb-4 md:mb-6">
//               <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Enter your name"
//                 required
//               />
//             </div>

//             {/* Mobile and Email Inputs - Side by Side */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Mobile Input */}
//               <div className="mb-4 md:mb-6">
//                 <label htmlFor="mobile" className="block text-gray-700 mb-2">Mobile No</label>
//                 <input
//                   type="tel"
//                   id="mobile"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.mobile ? 'border-red-500' : ''}`}
//                   placeholder="Enter your mobile number"
//                   required
//                 />
//                 {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
//               </div>

//               {/* Email Input */}
//               <div className="mb-4 md:mb-6">
//                 <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-500' : ''}`}
//                   placeholder="Enter your email"
//                   required
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//               </div>
//             </div>

//             {/* Date of Birth and Gender */}
//             <div className="md:col-span-2 grid grid-cols-2 gap-4">
//               {/* Date of Birth Input */}
//               <div className="mb-4 md:mb-6">
//   <label htmlFor="dob" className="block text-gray-700 mb-2">Date of Birth</label>
//   <input
//     type="date"
//     id="dob"
//     value={formData.dob}
//     onChange={handleChange}
//     className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//       !formData.dob ? 'text-gray-400' : 'text-black'
//     }`}
//     style={{
//       textTransform: 'uppercase',
//     }}
//     placeholder="DD/MM/YYYY" // Placeholder hint for date format
//     required
//   />
// </div>

//               {/* Gender Dropdown */}
//               <div className="mb-4 md:mb-6">
//   <label htmlFor="gender" className="block text-gray-700 mb-2">Gender</label>
//   <select
//     id="gender"
//     value={formData.gender}
//     onChange={handleChange}
//     className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//       !formData.gender ? 'text-gray-400' : 'text-black'
//     }`}
//     required
//   >
//     <option value="" className="text-gray-400 uppercase">Select your gender</option>
//     <option value="Male">Male</option>
//     <option value="Female">Female</option>
//     <option value="Other">Other</option>
//   </select>
// </div>


//             </div>

//             {/* Password Input */}
//             <div className="md:col-span-2 grid grid-cols-2 gap-4">
//             <div className="mb-4 md:mb-6">
//               <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             {/* Confirm Password Input */}
//             <div className="mb-4 md:mb-6">
//               <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.confirmPassword ? 'border-red-500' : ''}`}
//                 placeholder="Confirm your password"
//                 required
//               />
//               {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
//             </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
//             >
//               Sign Up
//             </button>
//           </form>

//           {/* Login Link */}
//           <p className="mt-6 md:mt-8 text-center text-gray-600">
//             Already have an account?{' '}
//             <Link to="/login" className="text-blue-500 hover:underline">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Footer Links */}
//       <div className="absolute bottom-4 right-4 text-right space-y-2 z-10">
//         <Link to="/privacy-policy" className="text-gray-500 hover:underline">Privacy Policy</Link><br />
//         <Link to="/terms-conditions" className="text-gray-500 hover:underline">Terms & Conditions</Link><br />
//         <Link to="/refund-policy" className="text-gray-500 hover:underline">Refund Policy</Link>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import LogoImage from '/gsa_logo.jpg'; // Replace with your logo path

// const SignUp: React.FC = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '',
//     mobile: '',
//     email: '',
//     dob: '',
//     gender: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const mobileRegex = /^[6-9]\d{9}$/;
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   // Function to handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setErrors({ confirmPassword: 'Passwords do not match' });
//       return;
//     }

//     if (!mobileRegex.test(formData.mobile)) {
//       setErrors({ mobile: 'Please enter a valid Indian mobile number' });
//       return;
//     }

//     if (!emailRegex.test(formData.email)) {
//       setErrors({ email: 'Please enter a valid email address' });
//       return;
//     }

//     // Convert DOB to DD-MM-YYYY format
//     const formattedDOB = new Date(formData.dob).toLocaleDateString('en-GB').replace(/\//g, '-');

//     const requestData = {
//       ...formData,
//       dob: formattedDOB, // Ensure DOB is in correct format
//     };

//     try {
//       const response = await fetch('http://gsa.nuviontech.com:8000/api/signup/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Sign-up successful:', data);
//         navigate('/verify'); // Redirect to verify page on success
//       } else {
//         const errorData = await response.json();
//         console.error('Sign-up failed:', errorData);
//         setErrors(errorData); // Handle API validation errors
//       }
//     } catch (error) {
//       console.error('Error submitting sign-up form:', error);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//     setErrors({});
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center bg-gray-100 p-4 min-h-screen">
//       <div className="absolute top-4 left-4 flex items-center space-x-3">
//         <img src={LogoImage} alt="Logo" className="w-10 h-10 rounded-full" />
//         <h1 className="text-lg md:text-2xl font-bold text-gray-800">Gandhinagar Sports Academy</h1>
//       </div>

//       <div className="relative z-10 bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden max-w-md md:max-w-5xl w-full md:my-12 my-20">
//         <div className="hidden md:block w-1/3 p-2">
//           <img src="/gallery_5.jpg" alt="Sports Background" className="object-cover h-full w-full rounded-md" />
//         </div>

//         <div className="w-full md:w-2/3 p-6 md:p-8">
//           <Link to="/" className="text-blue-500 hover:underline mb-4 block">
//             &larr; Back to Home
//           </Link>

//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">Sign Up</h2>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4 md:mb-6">
//               <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Enter your name"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="mb-4 md:mb-6">
//                 <label htmlFor="mobile" className="block text-gray-700 mb-2">Mobile No</label>
//                 <input
//                   type="tel"
//                   id="mobile"
//                   value={formData.mobile}
//                   maxLength={10}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.mobile ? 'border-red-500' : ''}`}
//                   placeholder="Enter your mobile number"
//                   required
//                 />
//                 {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
//               </div>

//               <div className="mb-4 md:mb-6">
//                 <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-500' : ''}`}
//                   placeholder="Enter your email"
//                   required
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="mb-4 md:mb-6">
//                 <label htmlFor="dob" className="block text-gray-700 mb-2">Date of Birth</label>
//                 <input
//                   type="date"
//                   id="dob"
//                   value={formData.dob}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   required
//                 />
//               </div>

//               <div className="mb-4 md:mb-6">
//                 <label htmlFor="gender" className="block text-gray-700 mb-2">Gender</label>
//                 <select
//                   id="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   required
//                 >
//                   <option value="">Select your gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="mb-4 md:mb-6">
//                 <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   required
//                 />
//               </div>

//               <div className="mb-4 md:mb-6">
//                 <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.confirmPassword ? 'border-red-500' : ''}`}
//                   required
//                 />
//                 {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
//               </div>
//             </div>

//             <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
//               Sign Up
//             </button>
//           </form>

//           <p className="mt-6 md:mt-8 text-center text-gray-600">
//             Already have an account?{' '}
//             <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoImage from '/gsa_logo.jpg'; // Replace with your logo path
import HCaptcha from "@hcaptcha/react-hcaptcha";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    dob: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null); // Store hCaptcha token
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const mobileRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token); // Store the token when hCaptcha is completed
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null); // Reset the token when hCaptcha expires
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      setErrors({ captcha: 'Please complete the captcha verification' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    if (!mobileRegex.test(formData.mobile)) {
      setErrors({ mobile: 'Please enter a valid Indian mobile number' });
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    // Convert DOB to DD-MM-YYYY format
    const formattedDOB = new Date(formData.dob).toLocaleDateString('en-GB').replace(/\//g, '-');

    const requestData = {
      ...formData,
      dob: formattedDOB,
      captchaToken, // Send the captcha token to your backend for verification
    };

    try {
      const response = await fetch('http://gsa.nuviontech.com:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Sign-up successful:', data);
        navigate('/verify'); // Redirect to verify page on success
      } else {
        const errorData = await response.json();
        console.error('Sign-up failed:', errorData);
        setErrors(errorData); // Handle API validation errors
      }
    } catch (error) {
      console.error('Error submitting sign-up form:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({});
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-gray-100 p-4 min-h-screen">
      <div className="absolute top-4 left-4 flex items-center space-x-3">
        <img src={LogoImage} alt="Logo" className="w-10 h-10 rounded-full" />
        <h1 className="text-lg md:text-2xl font-bold text-gray-800">Gandhinagar Sports Academy</h1>
      </div>

      <div className="relative z-10 bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden max-w-md md:max-w-5xl w-full md:my-12 my-20">
        <div className="hidden md:block w-1/3 p-2">
          <img src="/gallery_5.jpg" alt="Sports Background" className="object-cover h-full w-full rounded-md" />
        </div>

        <div className="w-full md:w-2/3 p-6 md:p-8">
          <Link to="/" className="text-blue-500 hover:underline mb-4 block">
            &larr; Back to Home
          </Link>

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 md:mb-6">
              <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4 md:mb-6">
                <label htmlFor="mobile" className="block text-gray-700 mb-2">Mobile No</label>
                <input
                  type="tel"
                  id="mobile"
                  value={formData.mobile}
                  maxLength={10}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.mobile ? 'border-red-500' : ''}`}
                  placeholder="Enter your mobile number"
                  required
                />
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
              </div>

              <div className="mb-4 md:mb-6">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4 md:mb-6">
                <label htmlFor="dob" className="block text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="mb-4 md:mb-6">
                <label htmlFor="gender" className="block text-gray-700 mb-2">Gender</label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4 md:mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="mb-4 md:mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  required
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {errors.captcha && <p className="text-red-500 text-sm mt-1">{errors.captcha}</p>}
            <HCaptcha
                sitekey="0c5428a0-f780-455c-af54-5298b6eedfd2" // Replace with your hCaptcha site key
                onVerify={handleCaptchaVerify}
              onExpire={handleCaptchaExpire}
            />

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-300" disabled={!captchaToken}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;