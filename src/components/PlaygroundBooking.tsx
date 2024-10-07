import React, { useState } from 'react';
import { FaRegCalendarAlt, FaRegMoneyBillAlt } from 'react-icons/fa';
import { MdOutlineSportsCricket, MdOutlineSportsSoccer } from 'react-icons/md';
import Banner from './Banner';
import axios from 'axios'; // For making API requests
import moment from 'moment';

const PlaygroundBooking = () => {
  const [selectedGround, setSelectedGround] = useState('Ground A');
  const [selectedSlot, setSelectedSlot] = useState('Half Day');
  const [selectedTime, setSelectedTime] = useState('09 AM - 12 PM');
  const [selectedDate, setSelectedDate] = useState('');
  const [billAmount, setBillAmount] = useState(8000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleGroundChange = (ground: string) => {
    setSelectedGround(ground);
  };

  const handleSlotChange = (slot: string) => {
    setSelectedSlot(slot);
    setBillAmount(slot === 'Half Day' ? 8000 : 12000);
  };

  const handleSubmitBooking = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const token = localStorage.getItem('token'); // Assume the token is stored in local storage
    
    const formatedate = moment(selectedDate).format('DD-MM-YYYY');

    const bookingData = {
      bookingType: 'Ground',
      ground: selectedGround,
      slot: selectedSlot,
      time: selectedTime,
      date: formatedate,
      price: billAmount,
      sportstype: 'Cricket',
    };
    try {
      const response = await axios.post(
        'http://gsa.nuviontech.com:8000/api/bookings/',
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccessMessage('Booking successful!');
      console.log(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Banner />
      <div className="w-full max-w-4xl mx-auto p-6">
        {/* Image Carousel */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="carousel">
            <img
              src="/bg3.png"
              alt="Ground Image"
              className="w-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-800">GSA Ground Booking</h1>

          {/* Available Sports */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex flex-col items-center">
              <MdOutlineSportsCricket className="text-4xl text-green-500" />
              <span className="text-sm font-medium">Cricket</span>
            </div>
            <div className="flex flex-col items-center">
              <MdOutlineSportsSoccer className="text-4xl text-green-500" />
              <span className="text-sm font-medium">Football</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-8 mt-6 text-lg font-semibold">
            <div>₹ 8000* <span className="text-sm">Half Day</span></div>
            <div>₹ 12000* <span className="text-sm">Full Day</span></div>
          </div>

          {/* Booking Form */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium">Select Date</label>
              <div className="relative mt-1">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <FaRegCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Ground Selector */}
            <div>
              <label className="block text-sm font-medium">Select Ground</label>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => handleGroundChange('Ground A')}
                  className={`px-4 py-2 rounded-md font-medium ${
                    selectedGround === 'Ground A'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  Ground A
                </button>
                <button
                  onClick={() => handleGroundChange('Ground B')}
                  className={`px-4 py-2 rounded-md font-medium ${
                    selectedGround === 'Ground B'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  Ground B
                </button>
              </div>
            </div>

            {/* Slot Selector */}
            <div>
              <label className="block text-sm font-medium">Select Slot</label>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => handleSlotChange('Half Day')}
                  className={`px-4 py-2 rounded-md font-medium ${
                    selectedSlot === 'Half Day'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  Half Day
                </button>
                <button
                  onClick={() => handleSlotChange('Full Day')}
                  className={`px-4 py-2 rounded-md font-medium ${
                    selectedSlot === 'Full Day'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  Full Day
                </button>
              </div>
            </div>

            {/* Time Selector */}
            <div>
              <label className="block text-sm font-medium">Select Time</label>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => setSelectedTime('09 AM - 12 PM')}
                  className={`px-4 py-2 rounded-md font-medium ${
                    selectedTime === '09 AM - 12 PM'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  09 AM - 12 PM
                </button>
                <button
                  onClick={() => setSelectedTime('12 PM - 03 PM')}
                  className={`px-4 py-2 rounded-md font-medium ${
                    selectedTime === '12 PM - 03 PM'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  12 PM - 03 PM
                </button>
              </div>
            </div>

            {/* Price Display */}
            <div className="flex items-center mt-4">
              <FaRegMoneyBillAlt className="text-2xl text-green-600" />
              <span className="ml-2 text-lg font-semibold">₹ {billAmount}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              onClick={handleSubmitBooking}
              disabled={loading}
              className={`px-6 py-2 text-white rounded-md font-semibold ${
                loading ? 'bg-gray-400' : 'bg-blue-600'
              }`}
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>

          {/* Success/Error Messages */}
          {successMessage && <p className="mt-4 text-green-600">{successMessage}</p>}
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default PlaygroundBooking;

// import React, { useState } from 'react';
// import { FaRegCalendarAlt, FaRegMoneyBillAlt } from 'react-icons/fa';
// import { MdOutlineSportsCricket, MdOutlineSportsSoccer } from 'react-icons/md';
// import Banner from './Banner';

// const PlaygroundBooking = () => {
//   const [selectedGround, setSelectedGround] = useState('Ground A');
//   const [selectedSlot, setSelectedSlot] = useState('Half Day');
//   const [selectedTime, setSelectedTime] = useState('09 AM - 12 PM');
//   const [billAmount, setBillAmount] = useState(8000);

//   const handleGroundChange = (ground: string) => {
//     setSelectedGround(ground);
//   };

//   const handleSlotChange = (slot: string) => {
//     setSelectedSlot(slot);
//     setBillAmount(slot === 'Half Day' ? 8000 : 12000);
//   };

//   return (
//     <>
//     <Banner/>
//     <div className="w-full max-w-4xl mx-auto p-6">
//       {/* Image Carousel */}
//       <div className="relative overflow-hidden rounded-lg">
//         <div className="carousel">
//           <img
//             src="/bg3.png"
//             alt="Ground Image"
//             className="w-full object-cover rounded-lg"
//           />
//         </div>
//       </div>

//       {/* Booking Section */}
//       <div className="mt-6">
//         <h1 className="text-3xl font-bold text-gray-800">GSA Ground Booking</h1>

//         {/* Available Sports */}
//         <div className="flex items-center gap-4 mt-4">
//           <div className="flex flex-col items-center">
//             <MdOutlineSportsCricket className="text-4xl text-green-500" />
//             <span className="text-sm font-medium">Cricket</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <MdOutlineSportsSoccer className="text-4xl text-green-500" />
//             <span className="text-sm font-medium">Football</span>
//           </div>
//         </div>

//         {/* Pricing */}
//         <div className="flex items-center gap-8 mt-6 text-lg font-semibold">
//           <div>₹ 8000* <span className="text-sm">Half Day</span></div>
//           <div>₹ 12000* <span className="text-sm">Full Day</span></div>
//         </div>

//         {/* Booking Form */}
//         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Date Picker */}
//           <div>
//             <label className="block text-sm font-medium">Select Date</label>
//             <div className="relative mt-1">
//               <input
//                 type="date"
//                 className="w-full border border-gray-300 rounded-md p-2"
//               />
//               <FaRegCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             </div>
//           </div>

//           {/* Ground Selector */}
//           <div>
//             <label className="block text-sm font-medium">Select Ground</label>
//             <div className="flex gap-2 mt-1">
//               <button
//                 onClick={() => handleGroundChange('Ground A')}
//                 className={`px-4 py-2 rounded-md font-medium ${
//                   selectedGround === 'Ground A'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-200'
//                 }`}
//               >
//                 Ground A
//               </button>
//               <button
//                 onClick={() => handleGroundChange('Ground B')}
//                 className={`px-4 py-2 rounded-md font-medium ${
//                   selectedGround === 'Ground B'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-200'
//                 }`}
//               >
//                 Ground B
//               </button>
//             </div>
//           </div>

//           {/* Slot Selector */}
//           <div>
//             <label className="block text-sm font-medium">Select Slot</label>
//             <div className="flex gap-2 mt-1">
//               <button
//                 onClick={() => handleSlotChange('Half Day')}
//                 className={`px-4 py-2 rounded-md font-medium ${
//                   selectedSlot === 'Half Day'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-200'
//                 }`}
//               >
//                 Half Day
//               </button>
//               <button
//                 onClick={() => handleSlotChange('Full Day')}
//                 className={`px-4 py-2 rounded-md font-medium ${
//                   selectedSlot === 'Full Day'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-200'
//                 }`}
//               >
//                 Full Day
//               </button>
//             </div>
//           </div>

//           {/* Time Selector */}
//           <div>
//             <label className="block text-sm font-medium">Select Time</label>
//             <div className="flex gap-2 mt-1">
//               <button
//                 onClick={() => setSelectedTime('09 AM - 12 PM')}
//                 className={`px-4 py-2 rounded-md font-medium ${
//                   selectedTime === '09 AM - 12 PM'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-200'
//                 }`}
//               >
//                 09 AM - 12 PM
//               </button>
//               <button
//                 onClick={() => setSelectedTime('12 PM - 05 PM')}
//                 className={`px-4 py-2 rounded-md font-medium ${
//                   selectedTime === '12 PM - 05 PM'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-200'
//                 }`}
//               >
//                 12 PM - 05 PM
//               </button>
//             </div>
//           </div>

//           {/* Form Fields */}
//           <div>
//             <label className="block text-sm font-medium">Name</label>
//             <input
//               type="text"
//               placeholder="Enter Your Name"
//               className="w-full border border-gray-300 rounded-md p-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Email ID</label>
//             <input
//               type="email"
//               placeholder="Enter Your Email"
//               className="w-full border border-gray-300 rounded-md p-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Mobile No.</label>
//             <input
//               type="text"
//               placeholder="Enter Your Mobile Number"
//               className="w-full border border-gray-300 rounded-md p-2 mt-1"
//             />
//           </div>
//         </div>

//         {/* Bill Section */}
//         <div className="mt-6 bg-blue-50 p-4 rounded-md">
//           <div className="flex justify-between items-center">
//             <div className="text-lg font-semibold">YOUR BILL</div>
//             <div className="text-sm">{new Date().toLocaleDateString()}</div>
//           </div>
//           <div className="text-3xl font-bold text-blue-600 mt-2">Rs. {billAmount}</div>
//         </div>

//         {/* Pay Now Button */}
//         <div className="mt-4">
//           <button className="w-full bg-blue-600 text-white p-3 rounded-md font-medium flex justify-center items-center">
//             PAY NOW <FaRegMoneyBillAlt className="ml-2" />
//           </button>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default PlaygroundBooking;
