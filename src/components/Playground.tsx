import React from 'react';
import { Link } from 'react-router-dom';
import { FaBaseballBall, FaCalendarCheck } from 'react-icons/fa';
import { PiSoccerBallBold } from 'react-icons/pi';


const Playground: React.FC = () => {
  return (
    <>
    <section className="py-16 bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="container mx-auto px-8">
        <h1 className="text-4xl font-oswald font-bold text-center mb-12">Playground Booking</h1>
        <p className="text-lg text-center mb-8">
          Discover our top-tier sports facilities, ideal for both casual games and competitive events. Whether you’re looking to practice, host a tournament, or just have some fun, our well-maintained grounds are perfect for all your sports needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Turf Booking Card */}
          <div className="relative border-4 border-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="/cricketcard.png"
              alt="GSA Turf Booking"
              className="w-full h-60 object-cover"
            />
            <div className="p-6 bg-white">
              <h2 className="text-3xl font-oswald font-bold text-center mb-4">GSA Turf Booking</h2>
              <p className="text-lg text-gray-700 mb-4 text-center">
                Our turf facilities are designed to provide an exceptional playing experience. Perfect for both football and cricket, you can enjoy high-quality grounds that cater to your needs, whether it’s for practice sessions or competitive matches.
              </p>
              <div className="flex items-center justify-center text-gray-700 mb-6">
                <PiSoccerBallBold className="text-2xl mr-2" />
                <span className="mr-4">Football</span>
                <FaBaseballBall className="text-2xl mr-2" />
                <span>Cricket</span>
              </div>
              <ul className="text-gray-700 mb-6">
                <li className="flex items-center mb-2"><FaCalendarCheck className="text-lg mr-2" /> ₹1200 for 9 AM - 5 PM</li>
                <li className="flex items-center"><FaCalendarCheck className="text-lg mr-2" /> ₹1500 for 5 PM - 9 AM</li>
              </ul>
              <Link to="/bookturf" className="bg-primary text-white py-2 px-6 rounded-lg text-center font-semibold transition duration-300 hover:bg-blue-700">
                Book Now
              </Link>
            </div>
          </div>

          {/* Ground Booking Card */}
          <div className="relative border-4 border-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="/footballcard.png"
              alt="GSA Ground Booking"
              className="w-full h-60 object-cover"
            />
            <div className="p-6 bg-white">
              <h2 className="text-3xl font-oswald font-bold text-center mb-4">GSA Ground Booking</h2>
              <p className="text-lg text-gray-700 mb-4 text-center">
                Book our versatile grounds to host your events, tournaments, and training sessions. Our well-equipped spaces are perfect for all types of sports activities, ensuring a fantastic experience for players and spectators alike.
              </p>
              <div className="flex items-center justify-center text-gray-700 mb-6">
                <PiSoccerBallBold className="text-2xl mr-2" />
                <span className="mr-4">Football</span>
                <FaBaseballBall className="text-2xl mr-2" />
                <span>Cricket</span>
              </div>
              <ul className="text-gray-700 mb-6">
                <li className="flex items-center mb-2"><FaCalendarCheck className="text-lg mr-2" /> ₹1200 for 9 AM - 5 PM</li>
                <li className="flex items-center"><FaCalendarCheck className="text-lg mr-2" /> ₹1500 for 5 PM - 9 AM</li>
              </ul>
              <Link to="/playground" className="bg-primary text-white py-2 px-6 rounded-lg text-center font-semibold transition duration-300 hover:bg-blue-700">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Playground;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaBaseballBall, FaCalendarCheck } from 'react-icons/fa';
// import { PiSoccerBallBold } from 'react-icons/pi';
// import axios from 'axios';

// const Playground: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [turfDetails, setTurfDetails] = useState({

//     bookingType: 'Turf',
//     sportsType: '',
//     date: '',
//     selectHour: '',
//     selectMin: '',
//     timeSlotIndex: '',
//     playingHour: '',
//     price: '',
//   });

//   const navigate = useNavigate();

//   // Handle change in input fields
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setTurfDetails({ ...turfDetails, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     console.log('Booking Details:', turfDetails);
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
    
//     try {
//       const token = localStorage.getItem('token'); // Assuming you're storing token in localStorage

//       const response = await axios.post(
//         'http://localhost:8000/api/bookings/', // Your Django API URL
//         turfDetails,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log('Booking Success:', response.data);
//       setLoading(false);
//       // Navigate to booking confirmation page or show success message
//       navigate('/confirmation');
//     } catch (err: any) {
//       setLoading(false);
//       setError(err.response?.data?.error || 'Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <>
//       <section className="py-16 bg-gradient-to-r from-blue-100 to-blue-200">
//         <div className="container mx-auto px-8">
//           <h1 className="text-4xl font-oswald font-bold text-center mb-12">Playground Booking</h1>
//           <p className="text-lg text-center mb-8">
//             Discover our top-tier sports facilities, ideal for both casual games and competitive events.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Turf Booking Card */}
//             <div className="relative border-4 border-white rounded-lg shadow-lg overflow-hidden">
//               <img
//                 src="/cricketcard.png"
//                 alt="GSA Turf Booking"
//                 className="w-full h-60 object-cover"
//               />
//               <div className="p-6 bg-white">
//                 <h2 className="text-3xl font-oswald font-bold text-center mb-4">GSA Turf Booking</h2>
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Sport Type:</label>
//                     <input
//                       type="text"
//                       name="sportsType"
//                       className="w-full px-3 py-2 border rounded-lg"
//                       value={turfDetails.sportsType}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Date (DD-MM-YYYY):</label>
//                     <input
//                       type="text"
//                       name="date"
//                       className="w-full px-3 py-2 border rounded-lg"
//                       value={turfDetails.date}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Start Time (Hour):</label>
//                     <input
//                       type="number"
//                       name="selectHour"
//                       className="w-full px-3 py-2 border rounded-lg"
//                       value={turfDetails.selectHour}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Start Time (Minutes):</label>
//                     <input
//                       type="number"
//                       name="selectMin"
//                       className="w-full px-3 py-2 border rounded-lg"
//                       value={turfDetails.selectMin}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">AM/PM (0 for AM, 1 for PM):</label>
//                     <input
//                       type="number"
//                       name="timeSlotIndex"
//                       className="w-full px-3 py-2 border rounded-lg"
//                       value={turfDetails.timeSlotIndex}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Playing Hours:</label>
//                     <input
//                       type="number"
//                       name="playingHour"
//                       className="w-full px-3 py-2 border rounded-lg"
//                       value={turfDetails.playingHour}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Price:</label>
//                     <input
//                       type="number"
//                       name="price"
//                       className="w-full px-3 py-2 border rounded-lg"
//                       value={turfDetails.price}
//                       onChange={handleChange}
//                       required
//                     />
                    
//                   </div>
//                   {error && <p className="text-red-500">{error}</p>}
//                   <button
//                     type="submit"
//                     className="bg-primary text-white py-2 px-6 rounded-lg text-center font-semibold transition duration-300 hover:bg-blue-700"
//                     disabled={loading}>
//                     {loading ? 'Booking...' : 'Book Now'}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Playground;
