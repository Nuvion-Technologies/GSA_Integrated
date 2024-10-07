import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { FaRegClock } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import axios from 'axios';
import moment from 'moment';

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image_url: string;
  fullDescription: string;
  time: string;
  entry_fees: string;
}


const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get event ID from URL parameter
  const [event, setEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: '',
    entry_fees: '₹100',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirecting after payment

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://gsa.nuviontech.com:8000/api/eventdetails/${id}/`);
        const eventData = response.data[0]; // Access the first object in the array
        eventData.image_url = `http://gsa.nuviontech.com:8000${eventData.image_url}`;
        setEvent(eventData);
      } catch (error) {
        setError('Failed to load event details. Please try again later.');
      }
    };
    if (id) {
      fetchEvent();
    }
  }, [id]);

  // Fetch user data if token exists
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    try {
      const response = await axios.post('http://gsa.nuviontech.com:8000/api/user/', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dobInputFormat = response.data.dob 
        ? moment(response.data.dob, 'DD-MM-YYYY').format('YYYY-MM-DD') 
        : '';
      setFormData({
        ...formData,
        name: response.data.name,
        email: response.data.email,
        mobile: response.data.mobile,
        dob: dobInputFormat, // Set formatted date of birth
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  // Call fetchUserData on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the payment and registration submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {

      const csrfToken = localStorage.getItem('csrfToken');
      console.log(csrfToken);
      console.log(localStorage.getItem('token'));
      const token = localStorage.getItem('token');
      // Step 1: Initiate payment via the backend
      const paymentResponse = await axios.post('http://gsa.nuviontech.com:8000/api/initiate_payment/', {
        amount: formData.entry_fees,
        event_id: id,
      },{
        headers: {
          'X-CSRFToken': csrfToken, 
          'Authorization': `Bearer ${token}`  // Pass the CSRF token here
        },
        withCredentials: true, 
      });
      console.log("Response" + paymentResponse);

      if (paymentResponse.data && paymentResponse.data.redirect_url) {
        // Step 2: Redirect user to PhonePe payment page
        window.location.href = paymentResponse.data.redirect_url;
      } else {
        setError('Failed to initiate payment. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError('Payment initiation failed. Please try again.');
      setLoading(false);
    }
  };

  // Assuming your backend has a payment callback URL like `/payment_callback`
  // You need to implement a route in your frontend that listens to the payment callback response
  const handlePaymentCallback = async () => {
    // Assuming the payment callback sends back some transaction status info
    const transactionId = new URLSearchParams(window.location.search).get('transaction_id');

    if (transactionId) {
      try {
        // Verify the payment status using the transaction_id
        const paymentStatusResponse = await axios.get(`http://gsa.nuviontech.com:8000/api/check_payment_status/${transactionId}/`);
        if (paymentStatusResponse.data.status === 'success') {
          // Step 3: If payment is successful, submit the registration data
          const registrationResponse = await axios.post('http://gsa.nuviontech.com:8000/api/WebEventsubmitdata/', {
            ...formData,
            event_id: id,
            token: localStorage.getItem('token'),
          });

          if (registrationResponse.status === 200) {
            alert('Registration successful!');
            navigate(`/events/${id}`); // Redirect to event details after successful registration
          }
        } else {
          setError('Payment verification failed. Please try again.');
        }
      } catch (error) {
        setError('Error in payment callback handling.');
      }
    }
  };

  useEffect(() => {
    handlePaymentCallback(); // Handle payment callback after redirection
  }, []);

  if (!event) {
    return <p>Loading event details...</p>;
  }

  const date1 = new Date(`${event.date} ${event.time}`);
  const hours1 = date1.getHours();
  const minutes1 = date1.getMinutes();
  const ampm = hours1 >= 12 ? 'PM' : 'AM';
  const formattedHours1 = hours1 % 12 || 12; // Convert 0 to 12 for 12 AM
  const timeString = `${formattedHours1}:${String(minutes1).padStart(2, '0')} ${ampm}`;

  return (
    <>
      {/* Render Event Details */}
      <div className="w-full bg-[#02307C] pt-32 pb-16 md:pt-40 md:pb-20 flex justify-between md:justify-center items-center relative overflow-hidden"></div>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-screen-lg">
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex-shrink-0 w-full md:w-1/2">
              <img src={event.image_url} alt={event.title} className="w-full h-96 object-cover" />
            </div>
            <div className="flex-grow p-8">
              <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
              <div className="flex flex-col mb-4 text-gray-600">
                <div className="flex items-center mb-2">
                  <FaRegClock className="mr-2" />
                  <p>{`${date1.toDateString()} ${timeString}`}</p>
                </div>
                <div className="flex items-center mb-2">
                  <FiMapPin className="mr-2" />
                  <p>{event.location}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{event.description}</p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="mt-16 bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Register for the Event</h3>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-gray-700 mb-2">Mobile</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dob" className="block text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                {loading ? 'Processing...' : 'Pay Now'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetails;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { FaRegClock } from 'react-icons/fa';
// import { FiMapPin } from 'react-icons/fi';
// import axios from 'axios';
// import { set } from 'date-fns';
// import moment from 'moment';

// export interface Event {
//   id: number;
//   title: string;
//   date: string; // Updated to string format
//   location: string;
//   description: string;
//   image_url: string;
//   fullDescription: string;
//   time: string;
//   entry_fees: string;
// }

// const EventDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // Get event ID from URL parameter
//   const [event, setEvent] = useState<Event | null>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     dob: '',
//     entry_fees: '₹100', // Hardcoded for now, dynamically fetched from backend later
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch event details by ID from API
//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const response = await axios.get(`http://gsa.nuviontech.com:8000/api/eventdetails/${id}/`);
//         const eventData = response.data[0]; // Access the first object in the array
        
//         // Append the base URL to the relative image_url
//         eventData.image_url = `http://gsa.nuviontech.com:8000${eventData.image_url}`;

 
//         setEvent(eventData);
//       } catch (error) {
//         setError('Failed to load event details. Please try again later.');
//       }
//     };

//     if (id) {
//       fetchEvent();
//     }
//   }, [id]);

//   // Fetch user data if token exists
//   const fetchUserData = async () => {
//     const token = localStorage.getItem('token'); // Assuming you store the token in local storage
//     if (!token) {
 
//       return;
//     }

//     try {
//       const response = await axios.post('http://gsa.nuviontech.com:8000/api/user/', {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       // Get the date of birth and format it
 
//       const dobFormatted = response.data.dob 
//         ? moment(response.data.dob, 'DD-MM-YYYY').format('DD/MM/YYYY') 
//         : 'Not provided'; // Handle if dob is not available

//       const dobInputFormat = response.data.dob 
//         ? moment(response.data.dob, 'DD-MM-YYYY').format('YYYY-MM-DD') 
//         : '';
//       setFormData({
//         ...formData,
//         name: response.data.name,
//         email: response.data.email,
//         mobile: response.data.mobile,
//         dob: dobInputFormat, // Set formatted date of birth
//       });
  
//     } catch (error) {
//       console.error('Failed to fetch user data:', error);
//     }
//   };

//   // Call fetchUserData on component mount
//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('http://gsa.nuviontech.com:8000/api/WebEventsubmitdata/', {
//         ...formData,
//         event_id: id,
//         token : localStorage.getItem('token')
//         , // Attach the event ID to the form data
//       });

//       if (response.status === 200) {
//         alert('Registration successful!');
//         fetchUserData(); // Fetch user data upon successful registration
//       }
//     } catch (err) {
//       setError('Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!event) {
//     return <p>Loading event details...</p>;
//   }

//   const date1 = new Date(`${event.date} ${event.time}`);
//   const hours1 = date1.getHours();
//   const minutes1 = date1.getMinutes();
//   const ampm = hours1 >= 12 ? 'PM' : 'AM';

//   const formattedHours1 = hours1 % 12 || 12; // Convert 0 to 12 for 12 AM
//   const timeString = `${formattedHours1}:${String(minutes1).padStart(2, '0')} ${ampm}`;

//   return (
//     <>
//       <div className="w-full bg-[#02307C] pt-32 pb-16 md:pt-40 md:pb-20 flex justify-between md:justify-center items-center relative overflow-hidden">
//         {/* Event banner */}
//       </div>

//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4 max-w-screen-lg">
//           <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
//             {/* Event Image */}
//             <div className="flex-shrink-0 w-full md:w-1/2">
//               <img src={event.image_url} alt={event.title} className="w-full h-96 object-cover" />
//             </div>

//             {/* Event Details */}
//             <div className="flex-grow p-8">
//               <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
//               <div className="flex flex-col mb-4 text-gray-600">
//                 <div className="flex items-center mb-2">
//                   <FaRegClock className="mr-2" />
//                   <p>{`${date1.toDateString()} ${timeString}`}</p>
//                 </div>
//                 <div className="flex items-center mb-2">
//                   <FiMapPin className="mr-2" />
//                   <p>{event.location}</p>
//                 </div>
//               </div>
//               <p className="text-gray-600 mb-4">{event.description}</p>
//             </div>
//           </div>

//           {/* Registration Form */}
//           <div className="mt-16 bg-white shadow-lg rounded-lg p-8">
//             <h3 className="text-2xl font-bold mb-4">Register for the Event</h3>
//             {error && <p className="text-red-500">{error}</p>}
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="mobile" className="block text-gray-700 mb-2">Mobile</label>
//                   <input
//                     type="tel"
//                     id="mobile"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="dob" className="block text-gray-700 mb-2">Date of Birth</label>
//                   <input
//                     type="date"
//                     id="dob"
//                     name="dob"
//                     value={formData.dob}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="mb-6">
//                 <label htmlFor="subtotal" className="block text-gray-700 mb-2">Subtotal (Rupees)</label>
//                 <input
//                   type="text"
//                   id="subtotal"
//                   name="subtotal"
//                   value={event.entry_fees}
//                   readOnly
//                   className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className={`w-full bg-blue-500 text-white py-3 rounded-md ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}`}
//                 disabled={loading}
//               >
//                 {loading ? 'Processing...' : 'Pay Now'}
//               </button>
//             </form>
//           </div>

          
//         </div>
//       </section>
//     </>
//   );
// };

// export default EventDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { FaRegClock } from 'react-icons/fa';
// import { FiMapPin } from 'react-icons/fi';
// import axios from 'axios';

// export interface Event {
//   id: number;
//   title: string;
//   date: string; // Updated to string format
//   location: string;
//   description: string;
//   image_url: string;
//   fullDescription: string;
//   time: string;
//   entry_fees: string;
// }

// const EventDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // Get event ID from URL parameter
//   const [event, setEvent] = useState<Event | null>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     dob: '',
//     entry_fees: '₹100', // Hardcoded for now, dynamically fetched from backend later
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch event details by ID from API
//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const response = await axios.get(`http://gsa.nuviontech.com:8000/api/eventdetails/${id}/`);
//         const eventData = response.data[0]; // Access the first object in the array

//         // Append the base URL to the relative image_url
//         eventData.image_url = `http://gsa.nuviontech.com:8000${eventData.image_url}`;

 
//         setEvent(eventData);
//       } catch (error) {
//         setError('Failed to load event details. Please try again later.');
//       }
//     };

//     if (id) {
//       fetchEvent();
//     }
//   }, [id]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('http://gsa.nuviontech.com:8000/api/userevent/', {
//         ...formData,
//         event_id: id, // Attach the event ID to the form data
//       });

//       if (response.status === 200) {
//         alert('Registration successful!');
//       }
//     } catch (err) {
//       setError('Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!event) {
//     return <p>Loading event details...</p>;
//   }
//   const date1 = new Date(`${event.date} ${event.time}`);
// const hours1 = date1.getHours();
// const minutes1 = date1.getMinutes();
// const ampm = hours1 >= 12 ? 'PM' : 'AM';

// const formattedHours1 = hours1 % 12 || 12; // Convert 0 to 12 for 12 AM
// const timeString = `${formattedHours1}:${String(minutes1).padStart(2, '0')} ${ampm}`;


//   return (
//     <>
//       <div className="w-full bg-[#02307C] pt-32 pb-16 md:pt-40 md:pb-20 flex justify-between md:justify-center items-center relative overflow-hidden">
//         {/* Event banner */}
//       </div>

//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4 max-w-screen-lg">
//           <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
//             {/* Event Image */}
//             <div className="flex-shrink-0 w-full md:w-1/2">
//               <img src={event.image_url} alt={event.title} className="w-full h-96 object-cover" />
//             </div>

//             {/* Event Details */}
//             <div className="flex-grow p-8">
//               <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
//               <div className="flex flex-col mb-4 text-gray-600">
//                 <div className="flex items-center mb-2">
//                   <FaRegClock className="mr-2" />
//                   <p>{`${date1.toDateString()} ${timeString}`}</p>
//                 </div>
//                 <div className="flex items-center mb-2">
//                   <FiMapPin className="mr-2" />
//                   <p>{event.location}</p>
//                 </div>
//               </div>
//               <p className="text-gray-600 mb-4">{event.description}</p>
//             </div>
//           </div>

//           {/* Registration Form */}
//           <div className="mt-16 bg-white shadow-lg rounded-lg p-8">
//             <h3 className="text-2xl font-bold mb-4">Register for the Event</h3>
//             {error && <p className="text-red-500">{error}</p>}
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="mobile" className="block text-gray-700 mb-2">Mobile</label>
//                   <input
//                     type="tel"
//                     id="mobile"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="dob" className="block text-gray-700 mb-2">Date of Birth</label>
//                   <input
//                     type="date"
//                     id="dob"
//                     name="dob"
//                     value={formData.dob}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="mb-6">
//                 <label htmlFor="subtotal" className="block text-gray-700 mb-2">Subtotal (Rupees)</label>
//                 <input
//                   type="text"
//                   id="subtotal"
//                   name="subtotal"
//                   value={event.entry_fees}
//                   readOnly
//                   className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className={`w-full bg-blue-500 text-white py-3 rounded-md ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}`}
//                 disabled={loading}
//               >
//                 {loading ? 'Processing...' : 'Pay Now'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default EventDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { FaRegClock } from 'react-icons/fa';
// import { FiMapPin } from 'react-icons/fi';
// import axios from 'axios';

// export interface Event {
//   id: number;
//   title: string;
//   date: Date;
//   location: string;
//   description: string;
//   image_url: string;
//   fullDescription: string;
// }

// const EventDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // Get event ID from URL parameter
//   const [event, setEvent] = useState<Event | null>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     dob: '',
//     subtotal: '₹100', // Hardcoded for now, dynamically fetched from backend later
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch event details by ID from API
//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const response = await axios.get(`http://gsa.nuviontech.com:8000/api/eventdetails/${id}/`);
//         const eventData = {
//           ...response.data,  
//         };

 
 

//         setEvent(eventData);
//       } catch (error) {
//         setError('Failed to load event details. Please try again later.');
//       }
//     };

//     if (id) {
//       fetchEvent();
//     }
//   }, [id]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('http://gsa.nuviontech.com:8000/api/userevent/', {
//         ...formData,
//         event_id: id, // Attach the event ID to the form data
//       });

//       if (response.status === 200) {
//         alert('Registration successful!');
//       }
//     } catch (err) {
//       setError('Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!event) {
//     return <p>Loading event details...</p>;
//   }

//   return (
//     <>
//       <div className="w-full bg-[#02307C] pt-32 pb-16 md:pt-40 md:pb-20 flex justify-between md:justify-center items-center relative overflow-hidden">
//         {/* Event banner */}
//       </div>

//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4 max-w-screen-lg">
//           <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
//             {/* Event Image */}
//             <div className="flex-shrink-0 w-full md:w-1/2">
//               <img src={event.image_url} alt={event.title} className="w-full h-96 object-cover" />
//             </div>

//             {/* Event Details */}
//             <div className="flex-grow p-8">
//               <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
//               <div className="flex flex-col mb-4 text-gray-600">
//                 <div className="flex items-center mb-2">
//                   <FaRegClock className="mr-2" />
//                   <p>{event.date.toDateString()}</p>
//                 </div>
//                 <div className="flex items-center mb-2">
//                   <FiMapPin className="mr-2" />
//                   <p>{event.location}</p>
//                 </div>
//               </div>
//               <p className="text-gray-600 mb-4">{event.fullDescription}</p>
//             </div>
//           </div>

//           {/* Registration Form */}
//           <div className="mt-16 bg-white shadow-lg rounded-lg p-8">
//             <h3 className="text-2xl font-bold mb-4">Register for the Event</h3>
//             {error && <p className="text-red-500">{error}</p>}
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="mobile" className="block text-gray-700 mb-2">Mobile</label>
//                   <input
//                     type="tel"
//                     id="mobile"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="dob" className="block text-gray-700 mb-2">Date of Birth</label>
//                   <input
//                     type="date"
//                     id="dob"
//                     name="dob"
//                     value={formData.dob}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="mb-6">
//                 <label htmlFor="subtotal" className="block text-gray-700 mb-2">Subtotal (Rupees)</label>
//                 <input
//                   type="text"
//                   id="subtotal"
//                   name="subtotal"
//                   value={formData.subtotal}
//                   readOnly
//                   className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className={`w-full bg-blue-500 text-white py-3 rounded-md ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}`}
//                 disabled={loading}
//               >
//                 {loading ? 'Processing...' : 'Pay Now'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default EventDetails;

// // src/components/EventDetails.tsx

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { FaRegClock } from 'react-icons/fa';
// import { FiMapPin } from 'react-icons/fi';
// import { eventsData, Event } from './eventsData'; // Import the centralized event data

// const EventDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // Get the event ID from the URL parameter
//   const [event, setEvent] = useState<Event | null>(null);

//   useEffect(() => {
//     if (id) {
//       const eventData = eventsData.find((event) => event.id === parseInt(id)); // Find the event by ID
//       setEvent(eventData || null);
//     }
//   }, [id]);

//   if (!event) {
//     return <p>Loading event details...</p>;
//   }

//   return (
//     <>
//     <div className="w-full bg-[#02307C] pt-32 pb-16 md:pt-40 md:pb-20 flex justify-between md:justify-center items-center relative overflow-hidden">
// {/* Left Images */}
//       <div className="flex justify-center items-center gap-4 md:absolute md:left-10">
//         {/* Left Side Images */}
//         <img src="/b_cricket.png" alt="Player Icon 1" className="w-8 h-8 md:w-20 md:h-20" />
//         <img src="/b_football.png" alt="Player Icon 2" className="w-8 h-8 md:w-20 md:h-20" />
//       </div>

//       {/* Center Text with Images Aligned in One Line */}
//       <div className="flex flex-col md:flex-row justify-center items-center gap-4">
//         {/* Center Text */}
//         <h1 className="text-white text-5xl md:text-6xl font-bold font-oswald text-center">
//           Register to The Event
//         </h1>
//       </div>

//       {/* Right Images */}
//       <div className="flex justify-center items-center gap-4 md:absolute md:right-10 right-0">
//         {/* Right Side Images */}
//         <img src="/b_football.png" alt="Player Icon 4" className="w-8 h-8 md:w-20 md:h-20" />
//         <img src="/b_cricket.png" alt="Player Icon 3" className="w-8 h-8 md:w-20 md:h-20" />
//       </div>
//     </div>
// <section className="py-16 bg-gray-50">
//   <div className="container mx-auto px-4 max-w-screen-lg">
//     <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
//       {/* Event Image */}
//       <div className="flex-shrink-0 w-full md:w-1/2">
//         <img src={event.image} alt={event.title} className="w-full h-96 object-cover" />
//       </div>

//       {/* Event Details */}
//       <div className="flex-grow p-8">
//         <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
//         <div className="flex flex-col mb-4 text-gray-600">
//           <div className="flex items-center mb-2">
//             <FaRegClock className="mr-2" />
//             <p>{event.date.toDateString()}</p>
//           </div>
//           <div className="flex items-center mb-2">
//             <FiMapPin className="mr-2" />
//             <p>{event.location}</p>
//           </div>
//         </div>
//         <p className="text-gray-600 mb-4">{event.fullDescription}</p>
//       </div>
//     </div>

//     {/* Registration Form */}
//     <div className="mt-16 bg-white shadow-lg rounded-lg p-8">
//       <h3 className="text-2xl font-bold mb-4">Register for the Event</h3>
//       <form>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
//             <input type="text" id="name" name="name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
//             <input type="email" id="email" name="email" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
//           </div>
//           <div>
//             <label htmlFor="mobile" className="block text-gray-700 mb-2">Mobile</label>
//             <input type="tel" id="mobile" name="mobile" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
//           </div>
//           <div>
//             <label htmlFor="dob" className="block text-gray-700 mb-2">Date of Birth</label>
//             <input type="date" id="dob" name="dob" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
//           </div>
//         </div>
//         <div className="mb-6">
//           <label htmlFor="subtotal" className="block text-gray-700 mb-2">Subtotal (Rupees)</label>
//           <input
//             type="text"
//             id="subtotal"
//             name="subtotal"
//             value={`₹${100}`} // Replace `subtotal` with the dynamic value fetched from the backend
//             readOnly
//             className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
//           />
//         </div>
//         <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300">
//           Pay Now
//         </button>
//         <p className="mt-4 text-gray-600 text-sm">
//           Note: Any other charges have to be paid at the event venue.
//         </p>
//       </form>
//     </div>

//     <div className="mt-8 text-center text-gray-600 max-w-screen-lg mx-auto">
//       <p>After successful submission, a confirmation mail will be sent to your email.</p>
//     </div>
//   </div>
// </section>


//   </>
//   );
// };

// export default EventDetails;
