import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const Academy: React.FC = () => {
  const navigate = useNavigate();

  const handleJoinNowClick = () => {
    navigate('/academy', { state: { scrollToTop: true } });
  };

  return (
    <div className="py-16 bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-oswald font-bold text-gray-800 text-center mb-12">
          Our Academy
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-12 text-center">
          Join our academy to experience top-notch coaching with professional trainers. We offer specialized training programs for various age groups, ensuring a solid foundation and expert guidance for your sports journey.
        </p>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {/* Cricket Academy Card */}
          <div className="w-full md:w-1/2 lg:w-1/3 p-4 transform transition-all hover:scale-105">
            <div className="flex flex-col justify-between h-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="/cricketcard.png"
                alt="Cricket Academy"
                className="w-full h-56 object-cover"
              />
              <div className="p-6 bg-white flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Cricket Coaching</h3>
                <p className="text-sm text-gray-700 mb-4">
                  - U14, U16, U19, and Senior Group wise coaching Experience<br />
                  - Highly Professional Coaches who played IPL & Ranji Trophy Matches
                </p>
                <div className="flex items-center text-gray-800 mb-4">
                  <FaCheckCircle className="text-blue-500 mr-2" />
                  <p className="font-semibold">Batch: Morning & Evening</p>
                </div>
                <div className="flex items-center text-gray-800 mb-4">
                  <FaCheckCircle className="text-blue-500 mr-2" />
                  <p className="font-semibold">Pricing: ₹3000/- Monthly*</p>
                </div>
              </div>
              <div className="p-4 bg-white text-center">
                <button
                  onClick={handleJoinNowClick}
                  className="block w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 font-bold font-poppins"
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
          {/* Football Academy Card */}
          <div className="w-full md:w-1/2 lg:w-1/3 p-4 transform transition-all hover:scale-105">
            <div className="flex flex-col justify-between h-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="/footballcard.png"
                alt="Football Academy"
                className="w-full h-56 object-cover"
              />
              <div className="p-6 bg-white flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Football Coaching</h3>
                <p className="text-sm text-gray-700 mb-4">
                  - U14, U16, U19, and Senior Group wise coaching Experience<br />
                  - Highly Professional Coaches with International Experience
                </p>
                <div className="flex items-center text-gray-800 mb-4">
                  <FaCheckCircle className="text-blue-500 mr-2" />
                  <p className="font-semibold">Batch: Morning & Evening</p>
                </div>
                <div className="flex items-center text-gray-800 mb-4">
                  <FaCheckCircle className="text-blue-500 mr-2" />
                  <p className="font-semibold">Pricing: ₹3000/- Monthly*</p>
                </div>
              </div>
              <div className="p-4 bg-white text-center">
                <button
                  onClick={handleJoinNowClick}
                  className="block w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 font-bold font-poppins"
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academy;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaCheckCircle } from 'react-icons/fa';
// import axios from 'axios';

// const Academy: React.FC = () => {
//   const navigate = useNavigate();

//   const handleJoinNowClick = async () => {
//     try {
//       // Example of the data to send to the API
//       const admissionData = {
//         sport: '1',  // Replace with actual sport ID
//         branch: '1',  // Replace with actual batch/branch ID
//         plan: '1',  // Replace with actual plan ID
//         school_name: 'ABC School',
//         standard: '10',
//         photo: null // Replace this with base64 image data if needed
//       };

//       // Replace 'Bearer YOUR_TOKEN' with your actual token
//       const response = await axios.post(
//         'http://gsa.nuviontech.com:8000/api/admission/',
//         admissionData,
//         {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       console.log(response.data);
//       // After successful submission, navigate to the academy or another page
//       navigate('/academy', { state: { scrollToTop: true } });
//     } catch (error) {
//       console.error('Error submitting admission form', error);
//     }
//   };

//   return (
//     <div className="py-16 bg-gradient-to-r from-blue-100 to-blue-200">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl md:text-4xl font-oswald font-bold text-gray-800 text-center mb-12">
//           Our Academy
//         </h2>
//         <p className="text-lg md:text-xl text-gray-700 mb-12 text-center">
//           Join our academy to experience top-notch coaching with professional trainers.
//         </p>
//         <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
//           {/* Cricket Academy Card */}
//           <div className="w-full md:w-1/2 lg:w-1/3 p-4 transform transition-all hover:scale-105">
//             <div className="flex flex-col justify-between h-full bg-white rounded-2xl shadow-lg overflow-hidden">
//               <img
//                 src="/cricketcard.png"
//                 alt="Cricket Academy"
//                 className="w-full h-56 object-cover"
//               />
//               <div className="p-6 bg-white flex-grow">
//                 <h3 className="text-2xl font-bold mb-2 text-gray-900">Cricket Coaching</h3>
//                 <p className="text-sm text-gray-700 mb-4">
//                   - U14, U16, U19, and Senior Group wise coaching Experience
//                 </p>
//                 <div className="flex items-center text-gray-800 mb-4">
//                   <FaCheckCircle className="text-blue-500 mr-2" />
//                   <p className="font-semibold">Batch: Morning & Evening</p>
//                 </div>
//                 <div className="flex items-center text-gray-800 mb-4">
//                   <FaCheckCircle className="text-blue-500 mr-2" />
//                   <p className="font-semibold">Pricing: ₹3000/- Monthly*</p>
//                 </div>
//               </div>
//               <div className="p-4 bg-white text-center">
//                 <button
//                   onClick={handleJoinNowClick}
//                   className="block w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 font-bold font-poppins"
//                 >
//                   Join Now
//                 </button>
//               </div>
//             </div>
//           </div>
//           {/* Football Academy Card */}
//           <div className="w-full md:w-1/2 lg:w-1/3 p-4 transform transition-all hover:scale-105">
//             <div className="flex flex-col justify-between h-full bg-white rounded-2xl shadow-lg overflow-hidden">
//               <img
//                 src="/footballcard.png"
//                 alt="Football Academy"
//                 className="w-full h-56 object-cover"
//               />
//               <div className="p-6 bg-white flex-grow">
//                 <h3 className="text-2xl font-bold mb-2 text-gray-900">Football Coaching</h3>
//                 <p className="text-sm text-gray-700 mb-4">
//                   - U14, U16, U19, and Senior Group wise coaching Experience
//                 </p>
//                 <div className="flex items-center text-gray-800 mb-4">
//                   <FaCheckCircle className="text-blue-500 mr-2" />
//                   <p className="font-semibold">Batch: Morning & Evening</p>
//                 </div>
//                 <div className="flex items-center text-gray-800 mb-4">
//                   <FaCheckCircle className="text-blue-500 mr-2" />
//                   <p className="font-semibold">Pricing: ₹3000/- Monthly*</p>
//                 </div>
//               </div>
//               <div className="p-4 bg-white text-center">
//                 <button
//                   onClick={handleJoinNowClick}
//                   className="block w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 font-bold font-poppins"
//                 >
//                   Join Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Academy;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaCheckCircle } from 'react-icons/fa';
// import axios from 'axios';

// const Academy = () => {
//   const navigate = useNavigate();

//   const [sports, setSports] = useState([]);
//   const [batches, setBatches] = useState([]);
//   const [plans, setPlans] = useState([]);
//   const [selectedSport, setSelectedSport] = useState('');
//   const [selectedBatch, setSelectedBatch] = useState('');
//   const [selectedPlan, setSelectedPlan] = useState('');

//   // Fetch sports data on component load
//   useEffect(() => {
//     const fetchSportsData = async () => {
//       console.log(localStorage.getItem('token'));
//       try {
//         const response = await axios.get('http://gsa.nuviontech.com:8000/api/sports/', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setSports(response.data.sports);
//         console.log(response.data.sports);
//       } catch (error) {
//         console.error('Error fetching sports:', error);
//       }
//     };

//     fetchSportsData();
//   }, []);

//   // Fetch batches when a sport is selected
//   const handleSportChange = async (sportId) => {
//     setSelectedSport(sportId);
//     try {
//       const response = await axios.get(`http://gsa.nuviontech.com:8000/api/batches/${sportId}/`, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setBatches(response.data.batches);
//       setSelectedBatch('');  // Reset batch selection
//       setPlans([]);  // Reset plans when a new sport is selected
//     } catch (error) {
//       console.error('Error fetching batches:', error);
//     }
//   };

//   // Fetch plans when a batch is selected
//   const handleBatchChange = async (batchId) => {
//     setSelectedBatch(batchId);
//     try {
//       const response = await axios.get(`http://gsa.nuviontech.com:8000/api/plans/${selectedSport}/${batchId}/`, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setPlans(response.data.plans);
//       setSelectedPlan('');  // Reset plan selection
//     } catch (error) {
//       console.error('Error fetching plans:', error);
//     }
//   };

//   // Handle form submission
//   const handleJoinNowClick = async () => {
//     try {
//       const admissionData = {
//         sport: selectedSport,
//         branch: selectedBatch,
//         plan: selectedPlan,
//         school_name: 'ABC School',  // Add your own data
//         standard: '10',             // Add your own data
//         photo: null,                // Replace this with actual image data if needed
//       };

//       const response = await axios.post('http://gsa.nuviontech.com:8000/api/admission/', admissionData, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log(response.data);
//       navigate('/academy', { state: { scrollToTop: true } });
//     } catch (error) {
//       console.error('Error submitting admission form', error);
//     }
//   };

//   return (
//     <div className="py-16 bg-gradient-to-r from-blue-100 to-blue-200">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl md:text-4xl font-oswald font-bold text-gray-800 text-center mb-12">
//           Our Academy
//         </h2>
//         <p className="text-lg md:text-xl text-gray-700 mb-12 text-center">
//           Join our academy to experience top-notch coaching with professional trainers.
//         </p>
        
//         {/* Sport Selection */}
//         <div className="mb-4">
//           <label className="block mb-2 text-gray-700">Select Sport</label>
//           <select
//             value={selectedSport}
//             onChange={(e) => handleSportChange(e.target.value)}
//             className="w-full border-2 border-gray-300 p-3 rounded"
//           >
//             <option value="">Select Sport</option>
//             {sports.map((sport) => (
//               <option key={sport.id} value={sport.id}>
//                 {sport.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Batch Selection */}
//         {selectedSport && (
//           <div className="mb-4">
//             <label className="block mb-2 text-gray-700">Select Batch</label>
//             <select
//               value={selectedBatch}
//               onChange={(e) => handleBatchChange(e.target.value)}
//               className="w-full border-2 border-gray-300 p-3 rounded"
//             >
//               <option value="">Select Batch</option>
//               {batches.map((batch) => (
//                 <option key={batch.id} value={batch.id}>
//                   {batch.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Plan Selection */}
//         {selectedBatch && (
//           <div className="mb-4">
//             <label className="block mb-2 text-gray-700">Select Plan</label>
//             <select
//               value={selectedPlan}
//               onChange={(e) => setSelectedPlan(e.target.value)}
//               className="w-full border-2 border-gray-300 p-3 rounded"
//             >
//               <option value="">Select Plan</option>
//               {plans.map((plan) => (
//                 <option key={plan.id} value={plan.id}>
//                   {plan.name} - ₹{plan.price}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
//           {/* Example Cricket Academy Card */}
//           <div className="w-full md:w-1/2 lg:w-1/3 p-4 transform transition-all hover:scale-105">
//             <div className="flex flex-col justify-between h-full bg-white rounded-2xl shadow-lg overflow-hidden">
//               <img src="/cricketcard.png" alt="Cricket Academy" className="w-full h-56 object-cover" />
//               <div className="p-6 bg-white flex-grow">
//                 <h3 className="text-2xl font-bold mb-2 text-gray-900">Cricket Coaching</h3>
//                 <p className="text-sm text-gray-700 mb-4">
//                   - U14, U16, U19, and Senior Group wise coaching Experience
//                 </p>
//                 <div className="flex items-center text-gray-800 mb-4">
//                   <FaCheckCircle className="text-blue-500 mr-2" />
//                   <p className="font-semibold">Batch: Morning & Evening</p>
//                 </div>
//                 <div className="flex items-center text-gray-800 mb-4">
//                   <FaCheckCircle className="text-blue-500 mr-2" />
//                   <p className="font-semibold">Pricing: ₹3000/- Monthly*</p>
//                 </div>
//               </div>
//               <div className="p-4 bg-white text-center">
//                 <button
//                   onClick={handleJoinNowClick}
//                   className="block w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 font-bold font-poppins"
//                 >
//                   Join Now
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Example Football Academy Card */}
//           <div className="w-full md:w-1/2 lg:w-1/3 p-4 transform transition-all hover:scale-105">
//             <div className="flex flex-col justify-between h-full bg-white rounded-2xl shadow-lg overflow-hidden">
//               <img src="/footballcard.png" alt="Football Academy" className="w-full h-56 object-cover" />
//               <div className="p-6 bg-white flex-grow">
//                 <h3 className="text-2xl font-bold mb-2 text-gray-900">Football Coaching</h3>
//                 <p className="text-sm text-gray-700 mb-4">
//                   - U14, U16, U19, and Senior Group wise coaching Experience
//                 </p>
//                 <div className="flex items-center text-gray-800 mb-4">
//                   <FaCheckCircle className="text-blue-500 mr-2" />
//                   <p className="font-semibold">Batch: Morning & Evening</p>
//                 </div>
//                 <div className="flex items-center text-gray-800 mb-4">
//                   <FaCheckCircle className="text-blue-500 mr-2" />
//                   <p className="font-semibold">Pricing: ₹3000/- Monthly*</p>
//                 </div>
//               </div>
//               <div className="p-4 bg-white text-center">
//                 <button
//                   onClick={handleJoinNowClick}
//                   className="block w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 font-bold font-poppins"
//                 >
//                   Join Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Academy;