import React, { useState, useEffect } from 'react';
import { FaRegCalendarAlt, FaRegMoneyBillAlt } from 'react-icons/fa';
import { MdOutlineSportsCricket, MdOutlineSportsSoccer } from 'react-icons/md';
import Banner from './Banner';
import axios from 'axios'; // Import axios for API requests
import moment from 'moment';
import ClipLoader from 'react-spinners/ClipLoader'; // Import spinner

const TurfBooking = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [playingHours, setPlayingHours] = useState(1);
  const [billAmount, setBillAmount] = useState(1200); // Default value for 9 AM - 5 PM
  const [sportType, setSportType] = useState('Cricket'); // Default sport type
  const [loading, setLoading] = useState(false); // Loading state
  const [bookingError, setBookingError] = useState(''); // Error message state

  const [bookingType] = useState('Turf'); // Turf booking type

  useEffect(() => {
    const now = new Date();
    const formattedDate = moment(now).format('YYYY-MM-DD'); // HTML input format (YYYY-MM-DD)
    setSelectedDate(formattedDate);
  }, []);

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    const [hours] = time.split(':').map(Number);
    if (hours >= 9 && hours < 17) {
      setBillAmount(1200); // 9 AM - 5 PM
    } else {
      setBillAmount(1500); // 5 PM - 9 AM
    }
  };

  const formatDateForAPI = (date: string) => {
    return moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY'); // Convert to DD-MM-YYYY for API
  };

  const handleBooking = async () => {
    setLoading(true); // Start loading spinner
    setBookingError(''); // Reset error message before booking

    try {
      const token = localStorage.getItem('token');
      const data = {
        bookingType,
        sportstype: sportType,
        date: formatDateForAPI(selectedDate), // Convert the date for API
        selectHour: selectedTime.split(':')[0],
        selectMin: selectedTime.split(':')[1],
        playinghour: playingHours,
        price: billAmount,
        timeSlotIndex: selectedTime < '12:00' ? 0 : 1, // AM or PM slot
      };

      // Send POST request to bookings API
      const response = await axios.post('http://gsa.nuviontech.com:8000/api/bookings/', data, {
        headers: {
          Authorization: `Bearer ${token}`, // Replace with actual token
        },
      });

      if (response.status === 201) {
        alert('Booking created successfully!');
 
      }
    } catch (error: any) {
      console.error('Error creating booking:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setBookingError(error.response.data.error); // Set API error message
      } else {
        setBookingError('Failed to create booking.'); // Fallback error message
      }
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <>
      <Banner />
      <div className="w-full max-w-4xl mx-auto p-6">
        {/* Image Carousel */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="carousel">
            <img src="/bg3.png" alt="Turf Image" className="w-full object-cover rounded-lg" />
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-800">GSA Turf Booking</h1>

          {/* Available Sports */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex flex-col items-center">
              <MdOutlineSportsCricket
                className={`text-4xl ${sportType === 'Cricket' ? 'text-green-500' : 'text-gray-500'}`}
                onClick={() => setSportType('Cricket')}
              />
              <span className="text-sm font-medium">Cricket</span>
            </div>
            <div className="flex flex-col items-center">
              <MdOutlineSportsSoccer
                className={`text-4xl ${sportType === 'Football' ? 'text-green-500' : 'text-gray-500'}`}
                onClick={() => setSportType('Football')}
              />
              <span className="text-sm font-medium">Football</span>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mt-4 text-lg font-semibold">
            <div>₹ 1200 for 9 AM - 5 PM</div>
            <div>₹ 1500 for 5 PM - 9 AM</div>
          </div>

          {/* Booking Form */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              />
            </div>

            {/* Time Selector */}
            <div>
              <label className="block text-sm font-medium">Select Time</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              />
            </div>

            {/* Playing Hours Selector */}
            <div>
              <label className="block text-sm font-medium">Select Playing Hours</label>
              <select
                value={playingHours}
                onChange={(e) => setPlayingHours(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              >
                {[...Array(12).keys()].map((hour) => (
                  <option key={hour + 1} value={hour + 1}>
                    {hour + 1} Hour{hour > 0 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                onClick={handleBooking}
                className="w-full bg-green-500 text-white rounded-md py-2 mt-4"
                disabled={loading} // Disable button when loading
              >
                {loading ? 'Booking...' : 'Book Now'}
              </button>
              {/* Show Spinner when loading */}
              {loading && (
                <div className="flex justify-center items-center mt-4">
                  <ClipLoader color={'#36d7b7'} loading={loading} size={50} />
                </div>
              )}
            </div>
          </div>

          {/* Error Section */}
          {bookingError && (
            <div className="mt-4 text-red-500">
              <p>{bookingError}</p>
            </div>
          )}

          {/* Bill Section */}
          <div className="mt-6 bg-blue-50 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold">Total: ₹ {billAmount}</div>
              <FaRegMoneyBillAlt className="text-2xl text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TurfBooking;

// import React, { useState, useEffect } from 'react';
// import { FaRegCalendarAlt, FaRegMoneyBillAlt } from 'react-icons/fa';
// import { MdOutlineSportsCricket, MdOutlineSportsSoccer } from 'react-icons/md';
// import Banner from './Banner';
// import axios from 'axios'; // Import axios for API requests
// import moment from 'moment';

// const TurfBooking = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedTime, setSelectedTime] = useState('09:00');
//   const [playingHours, setPlayingHours] = useState(1);
//   const [billAmount, setBillAmount] = useState(1200); // Default value for 9 AM - 5 PM
//   const [sportType, setSportType] = useState('Cricket'); // Default sport type
//   const [bookingType] = useState('Turf'); // Turf booking type
//   const [errorMessage, setErrorMessage] = useState(''); // State for handling error message

//   useEffect(() => {
//     const now = new Date();
//     const formattedDate = moment(now).format('YYYY-MM-DD'); // HTML input format (YYYY-MM-DD)
//     setSelectedDate(formattedDate);
//   }, []);

//   const handleTimeChange = (time: string) => {
//     setSelectedTime(time);
//     const [hours] = time.split(':').map(Number);
//     if (hours >= 9 && hours < 17) {
//       setBillAmount(1200); // 9 AM - 5 PM
//     } else {
//       setBillAmount(1500); // 5 PM - 9 AM
//     }
//   };

//   const formatDateForAPI = (date: string) => {
//     return moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY'); // Convert to DD-MM-YYYY for API
//   };

//   const handleBooking = async () => {
//     try {
//       // Clear previous error message
//       setErrorMessage('');

//       // Prepare booking data
//       const token = localStorage.getItem('token');
//       const data = {
//         bookingType,
//         sportstype: sportType,
//         date: formatDateForAPI(selectedDate), // Convert the date for API
//         selectHour: selectedTime.split(':')[0],
//         selectMin: selectedTime.split(':')[1],
//         playinghour: playingHours,
//         price: billAmount,
//         timeSlotIndex: selectedTime < "12:00" ? 0 : 1, // AM or PM slot
//       };

//       // Send POST request to bookings API
//       const response = await axios.post('http://gsa.nuviontech.com:8000/api/bookings/', data, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Replace with actual token
//         },
//       });

//       if (response.status === 201) {
//         alert('Booking created successfully!');
 
//       }
//     } catch (error: any) {
//       // Capture and display error message from backend
//       if (error.response && error.response.data && error.response.data.error) {
//         setErrorMessage(error.response.data.error); // Set error message from backend
//       } else {
//         setErrorMessage('Failed to create booking. Please try again.');
//       }
//     }
//   };

//   return (
//     <>
//       <Banner />
//       <div className="w-full max-w-4xl mx-auto p-6">
//         {/* Image Carousel */}
//         <div className="relative overflow-hidden rounded-lg">
//           <div className="carousel">
//             <img
//               src="/bg3.png"
//               alt="Turf Image"
//               className="w-full object-cover rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Booking Section */}
//         <div className="mt-6">
//           <h1 className="text-3xl font-bold text-gray-800">GSA Turf Booking</h1>

//           {/* Available Sports */}
//           <div className="flex items-center gap-4 mt-4">
//             <div className="flex flex-col items-center">
//               <MdOutlineSportsCricket
//                 className={`text-4xl ${sportType === 'Cricket' ? 'text-green-500' : 'text-gray-500'}`}
//                 onClick={() => setSportType('Cricket')}
//               />
//               <span className="text-sm font-medium">Cricket</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <MdOutlineSportsSoccer
//                 className={`text-4xl ${sportType === 'Football' ? 'text-green-500' : 'text-gray-500'}`}
//                 onClick={() => setSportType('Football')}
//               />
//               <span className="text-sm font-medium">Football</span>
//             </div>
//           </div>

//           {/* Pricing Section */}
//           <div className="mt-4 text-lg font-semibold">
//             <div>₹ 1200 for 9 AM - 5 PM</div>
//             <div>₹ 1500 for 5 PM - 9 AM</div>
//           </div>

//           {/* Booking Form */}
//           <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Date Picker */}
//             <div>
//               <label className="block text-sm font-medium">Select Date</label>
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               />
//             </div>

//             {/* Time Selector */}
//             <div>
//               <label className="block text-sm font-medium">Select Time</label>
//               <input
//                 type="time"
//                 value={selectedTime}
//                 onChange={(e) => handleTimeChange(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               />
//             </div>

//             {/* Playing Hours Selector */}
//             <div>
//               <label className="block text-sm font-medium">Select Playing Hours</label>
//               <select
//                 value={playingHours}
//                 onChange={(e) => setPlayingHours(parseInt(e.target.value))}
//                 className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               >
//                 {[...Array(12).keys()].map((hour) => (
//                   <option key={hour + 1} value={hour + 1}>
//                     {hour + 1} Hour{hour > 0 ? 's' : ''}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Submit Button */}
//             <div className="col-span-2">
//               <button
//                 onClick={handleBooking}
//                 className="w-full bg-green-500 text-white rounded-md py-2 mt-4"
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>

//           {/* Bill Section */}
//           <div className="mt-6 bg-blue-50 p-4 rounded-md">
//             <div className="flex justify-between items-center">
//               <div className="text-xl font-semibold">Total: ₹ {billAmount}</div>
//               <FaRegMoneyBillAlt className="text-2xl text-green-500" />
//             </div>
//           </div>

//           {/* Display Error Message */}
//           {errorMessage && (
//             <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//               <strong className="font-bold">Error: </strong>
//               <span>{errorMessage}</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TurfBooking;

// import React, { useState, useEffect } from 'react';
// import { FaRegCalendarAlt, FaRegMoneyBillAlt } from 'react-icons/fa';
// import { MdOutlineSportsCricket, MdOutlineSportsSoccer } from 'react-icons/md';
// import Banner from './Banner';
// import axios from 'axios'; // Import axios for API requests
// import moment from 'moment';

// const TurfBooking = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedTime, setSelectedTime] = useState('09:00');
//   const [playingHours, setPlayingHours] = useState(1);
//   const [billAmount, setBillAmount] = useState(1200); // Default value for 9 AM - 5 PM
//   const [sportType, setSportType] = useState('Cricket'); // Default sport type
//   const [bookingType] = useState('Turf'); // Turf booking type

//   useEffect(() => {
//     const now = new Date();
//     const formattedDate = moment(now).format('YYYY-MM-DD'); // HTML input format (YYYY-MM-DD)
//     setSelectedDate(formattedDate);
//   }, []);

//   const handleTimeChange = (time: string) => {
//     setSelectedTime(time);
//     const [hours] = time.split(':').map(Number);
//     if (hours >= 9 && hours < 17) {
//       setBillAmount(1200); // 9 AM - 5 PM
//     } else {
//       setBillAmount(1500); // 5 PM - 9 AM
//     }
//   };

//   const formatDateForAPI = (date: string) => {
//     return moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY'); // Convert to DD-MM-YYYY for API
//   };

//   const handleBooking = async () => {
//     try {
//       // Prepare booking data
//       const token = localStorage.getItem('token');
//       const data = {
//         bookingType,
//         sportstype: sportType,
//         date: formatDateForAPI(selectedDate), // Convert the date for API
//         selectHour: selectedTime.split(':')[0],
//         selectMin: selectedTime.split(':')[1],
//         playinghour: playingHours,
//         price: billAmount,
//         timeSlotIndex: selectedTime < "12:00" ? 0 : 1, // AM or PM slot
//       };

//       // Send POST request to bookings API
//       const response = await axios.post('http://gsa.nuviontech.com:8000/api/bookings/', data, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Replace with actual token
//         },
//       });

//       if (response.status === 201) {
//         alert('Booking created successfully!');
 
//       }
//     } catch (error) {
//       console.error('Error creating booking:', error);
      
//     }
//   };

//   return (
//     <>
//       <Banner />
//       <div className="w-full max-w-4xl mx-auto p-6">
//         {/* Image Carousel */}
//         <div className="relative overflow-hidden rounded-lg">
//           <div className="carousel">
//             <img
//               src="/bg3.png"
//               alt="Turf Image"
//               className="w-full object-cover rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Booking Section */}
//         <div className="mt-6">
//           <h1 className="text-3xl font-bold text-gray-800">GSA Turf Booking</h1>

//           {/* Available Sports */}
//           <div className="flex items-center gap-4 mt-4">
//             <div className="flex flex-col items-center">
//               <MdOutlineSportsCricket
//                 className={`text-4xl ${sportType === 'Cricket' ? 'text-green-500' : 'text-gray-500'}`}
//                 onClick={() => setSportType('Cricket')}
//               />
//               <span className="text-sm font-medium">Cricket</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <MdOutlineSportsSoccer
//                 className={`text-4xl ${sportType === 'Football' ? 'text-green-500' : 'text-gray-500'}`}
//                 onClick={() => setSportType('Football')}
//               />
//               <span className="text-sm font-medium">Football</span>
//             </div>
//           </div>

//           {/* Pricing Section */}
//           <div className="mt-4 text-lg font-semibold">
//             <div>₹ 1200 for 9 AM - 5 PM</div>
//             <div>₹ 1500 for 5 PM - 9 AM</div>
//           </div>

//           {/* Booking Form */}
//           <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Date Picker */}
//             <div>
//               <label className="block text-sm font-medium">Select Date</label>
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               />
//             </div>

//             {/* Time Selector */}
//             <div>
//               <label className="block text-sm font-medium">Select Time</label>
//               <input
//                 type="time"
//                 value={selectedTime}
//                 onChange={(e) => handleTimeChange(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               />
//             </div>

//             {/* Playing Hours Selector */}
//             <div>
//               <label className="block text-sm font-medium">Select Playing Hours</label>
//               <select
//                 value={playingHours}
//                 onChange={(e) => setPlayingHours(parseInt(e.target.value))}
//                 className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               >
//                 {[...Array(12).keys()].map((hour) => (
//                   <option key={hour + 1} value={hour + 1}>
//                     {hour + 1} Hour{hour > 0 ? 's' : ''}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Submit Button */}
//             <div className="col-span-2">
//               <button
//                 onClick={handleBooking}
//                 className="w-full bg-green-500 text-white rounded-md py-2 mt-4"
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>

//           {/* Bill Section */}
//           <div className="mt-6 bg-blue-50 p-4 rounded-md">
//             <div className="flex justify-between items-center">
//               <div className="text-xl font-semibold">Total: ₹ {billAmount}</div>
//               <FaRegMoneyBillAlt className="text-2xl text-green-500" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TurfBooking;

// import React, { useState, useEffect } from 'react';
// import { FaRegCalendarAlt, FaRegMoneyBillAlt } from 'react-icons/fa';
// import { MdOutlineSportsCricket, MdOutlineSportsSoccer } from 'react-icons/md';
// import Banner from './Banner';
// import axios from 'axios'; // Import axios for API requests
// import moment from 'moment';
// import { formatDate } from 'date-fns';

// const TurfBooking = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedTime, setSelectedTime] = useState('09:00');
//   const [playingHours, setPlayingHours] = useState(1);
//   const [billAmount, setBillAmount] = useState(1200); // Default value for 9 AM - 5 PM
//   const [sportType, setSportType] = useState('Cricket'); // Default sport type
//   const [bookingType] = useState('Turf'); // Turf booking type

//   useEffect(() => {
//     const now = new Date();
//     const formattedDate = moment(now).format('DD-MM-YYYY');
//     setSelectedDate(formattedDate);
//   }, []);

//   const handleTimeChange = (time: string) => {
//     setSelectedTime(time);
//     const [hours] = time.split(':').map(Number);
//     if (hours >= 9 && hours < 17) {
//       setBillAmount(1200); // 9 AM - 5 PM
//     } else {
//       setBillAmount(1500); // 5 PM - 9 AM
//     }
//   };

//   const handleBooking = async () => {
//     try {
//       // Prepare booking data
//       const token = localStorage.getItem('token');
//       const data = {
//         bookingType,
//         sportstype: sportType,
//         date: formatDate(new Date(selectedDate), 'DD-MM-YYYY'),
//         selectHour: selectedTime.split(':')[0],
//         selectMin: selectedTime.split(':')[1],
//         playinghour: playingHours,
//         price: billAmount,
//         timeSlotIndex: selectedTime < "12:00" ? 0 : 1, // AM or PM slot
//       };

//       // Send POST request to bookings API
//       const response = await axios.post('http://gsa.nuviontech.com:8000/api/bookings/', data, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Replace with actual token
//         },
//       });

//       if (response.status === 201) {
//         alert('Booking created successfully!');
 
//       }
//     } catch (error) {
//       console.error('Error creating booking:', error);
//       alert('Failed to create booking.');
//     }
//   };

//   return (
//     <>
//       <Banner />
//       <div className="w-full max-w-4xl mx-auto p-6">
//         {/* Image Carousel */}
//         <div className="relative overflow-hidden rounded-lg">
//           <div className="carousel">
//             <img
//               src="/bg3.png"
//               alt="Turf Image"
//               className="w-full object-cover rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Booking Section */}
//         <div className="mt-6">
//           <h1 className="text-3xl font-bold text-gray-800">GSA Turf Booking</h1>

//           {/* Available Sports */}
//           <div className="flex items-center gap-4 mt-4">
//             <div className="flex flex-col items-center">
//               <MdOutlineSportsCricket
//                 className={`text-4xl ${sportType === 'Cricket' ? 'text-green-500' : 'text-gray-500'}`}
//                 onClick={() => setSportType('Cricket')}
//               />
//               <span className="text-sm font-medium">Cricket</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <MdOutlineSportsSoccer
//                 className={`text-4xl ${sportType === 'Football' ? 'text-green-500' : 'text-gray-500'}`}
//                 onClick={() => setSportType('Football')}
//               />
//               <span className="text-sm font-medium">Football</span>
//             </div>
//           </div>

//           {/* Pricing Section */}
//           <div className="mt-4 text-lg font-semibold">
//             <div>₹ 1200 for 9 AM - 5 PM</div>
//             <div>₹ 1500 for 5 PM - 9 AM</div>
//           </div>

//           {/* Booking Form */}
//           <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Date Picker */}
//             <div>
//               <label className="block text-sm font-medium">Select Date</label>
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               />
//             </div>

//             {/* Time Selector */}
//             <div>
//               <label className="block text-sm font-medium">Select Time</label>
//               <input
//                 type="time"
//                 value={selectedTime}
//                 onChange={(e) => handleTimeChange(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               />
//             </div>

//             {/* Playing Hours Selector */}
//             <div>
//               <label className="block text-sm font-medium">Select Playing Hours</label>
//               <select
//                 value={playingHours}
//                 onChange={(e) => setPlayingHours(parseInt(e.target.value))}
//                 className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               >
//                 {[...Array(12).keys()].map((hour) => (
//                   <option key={hour + 1} value={hour + 1}>
//                     {hour + 1} Hour{hour > 0 ? 's' : ''}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Submit Button */}
//             <div className="col-span-2">
//               <button
//                 onClick={handleBooking}
//                 className="w-full bg-green-500 text-white rounded-md py-2 mt-4"
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>

//           {/* Bill Section */}
//           <div className="mt-6 bg-blue-50 p-4 rounded-md">
//             <div className="flex justify-between items-center">
//               <div className="text-xl font-semibold">Total: ₹ {billAmount}</div>
//               <FaRegMoneyBillAlt className="text-2xl text-green-500" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TurfBooking;

// import { FaRegCalendarAlt, FaRegMoneyBillAlt } from 'react-icons/fa';
// import { MdOutlineSportsCricket, MdOutlineSportsSoccer } from 'react-icons/md';
// import Banner from './Banner';

// const TurfBooking = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedTime, setSelectedTime] = useState('09:00');
//   const [playingHours, setPlayingHours] = useState(1);
//   const [billAmount, setBillAmount] = useState(1200); // Default value for 9 AM - 5 PM

//   useEffect(() => {
//     const now = new Date();
//     const formattedDate = now.toISOString().split('T')[0];
//     setSelectedDate(formattedDate);
//   }, []);

//   const handleTimeChange = (time: string) => {
//     setSelectedTime(time);
//     const [hours] = time.split(':').map(Number);
//     if (hours >= 9 && hours < 17) {
//       setBillAmount(1200); // 9 AM - 5 PM
//     } else {
//       setBillAmount(1500); // 5 PM - 9 AM
//     }
//   };

//   return (
//     <>
//       <Banner />
//       <div className="w-full max-w-4xl mx-auto p-6">
//         {/* Image Carousel */}
//         <div className="relative overflow-hidden rounded-lg">
//           <div className="carousel">
//             <img
//               src="/bg3.png"
//               alt="Turf Image"
//               className="w-full object-cover rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Booking Section */}
//         <div className="mt-6">
//           <h1 className="text-3xl font-bold text-gray-800">GSA Turf Booking</h1>

//           {/* Available Sports */}
//           <div className="flex items-center gap-4 mt-4">
//             <div className="flex flex-col items-center">
//               <MdOutlineSportsCricket className="text-4xl text-green-500" />
//               <span className="text-sm font-medium">Cricket</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <MdOutlineSportsSoccer className="text-4xl text-green-500" />
//               <span className="text-sm font-medium">Football</span>
//             </div>
//           </div>

//           {/* Pricing Section */}
//           <div className="mt-4 text-lg font-semibold">
//             <div>₹ 1200 for 9 AM - 5 PM</div>
//             <div>₹ 1500 for 5 PM - 9 AM</div>
//           </div>

//           {/* Booking Form */}
//           <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Date Picker */}
//             <div>
//               <label className="block text-sm font-medium">Select Date</label>
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               />
//             </div>

//             {/* Time Selector */}
//             <div>
//               <label className="block text-sm font-medium">Select Time</label>
//               <input
//                 type="time"
//                 value={selectedTime}
//                 onChange={(e) => handleTimeChange(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               />
//             </div>

//             {/* Playing Hours Selector */}
//             <div>
//               <label className="block text-sm font-medium">Select Playing Hours</label>
//               <select
//                 value={playingHours}
//                 onChange={(e) => setPlayingHours(parseInt(e.target.value))}
//                 className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               >
//                 {[...Array(12).keys()].map((hour) => (
//                   <option key={hour + 1} value={hour + 1}>
//                     {hour + 1} Hour{hour > 0 ? 's' : ''}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Form Fields */}
            

//           </div>

//           {/* Bill Section */}
//           <div className="mt-6 bg-blue-50 p-4 rounded-md">
//             <div className="flex justify-between items-center">
//               <div className="text-lg font-semibold">YOUR BILL</div>
//               <div className="text-sm">{new Date().toLocaleDateString()}</div>
//             </div>
//             <div className="text-3xl font-bold text-blue-600 mt-2">Rs. {billAmount}</div>
//           </div>

//           {/* Pay Now Button */}
//           <div className="mt-4">
//             <button className="w-full bg-blue-600 text-white p-3 rounded-md font-medium flex justify-center items-center">
//               PAY NOW <FaRegMoneyBillAlt className="ml-2" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TurfBooking;