// import React, { useState, useEffect } from 'react';
// import { FaRegClock } from 'react-icons/fa';
// import { FiMapPin } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
// import { eventsData } from './eventsData';

// // Mock function to simulate fetching events from the backend
// const fetchEventsFromBackend = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([
//         {
//           id: 1,
//           title: "Cricket Tournament",
//           date: new Date("2024-09-21T10:00:00"),
//           location: "Main Ground, Gandhinagar Sports Academy",
//           description: "Join us for an exciting cricket tournament featuring local teams and experienced players.",
//           image: "/cricketcard.png",
//         },
//         {
//           id: 2,
//           title: "Football Coaching Camp",
//           date: new Date("2024-09-20T11:00:00"),
//           location: "Football Ground, Gandhinagar Sports Academy",
//           description: "A special coaching camp with professional coaches for all age groups.",
//           image: "/footballcard.png",
//         },
//         {
//           id: 3,
//           title: "Yoga Workshop",
//           date: new Date("2024-10-05T09:00:00"),
//           location: "Indoor Hall, Gandhinagar Sports Academy",
//           description: "A relaxing yoga workshop focusing on breathing techniques and posture alignment.",
//           image: "/yogaworkshop.png",
//         },
//         {
//           id: 4,
//           title: "Badminton Championship",
//           date: new Date("2024-10-10T15:00:00"),
//           location: "Indoor Court, Gandhinagar Sports Academy",
//           description: "Compete with the best in the city at our annual badminton championship.",
//           image: "/badmintonchampionship.png",
//         }
//       ]);
//     }, 1000); // Simulate a network delay
//   });
// };

// const Events: React.FC = () => {
//   const [events, setEvents] = useState<any[]>([]);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [nextEvent, setNextEvent] = useState<any | null>(null);
//   const [timeRemaining, setTimeRemaining] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch events data from mock backend
//     fetchEventsFromBackend().then((data: any) => {
//       setEvents(data);
//       const closestEvent = getNextEvent(data);
//       setNextEvent(closestEvent);
//     });
//   }, []);


//   const handleLearnMore = (eventId: number) => {
//     navigate(`/event/${eventId}`); // Navigate to the event details page with the event ID
//   };


//   // Calculate the next upcoming event from the list
//   const getNextEvent = (events: any[]) => {
//     const now = new Date();
//     const upcomingEvents = events.filter((event) => event.date > now);

//     // Correct the reduce method with explicit typing
//     const closestEvent = upcomingEvents.reduce<{ 
//       title: string; 
//       date: Date; 
//       location: string; 
//       description: string; 
//       image: string; 
//     } | null>((closest, event) => {
//       if (!closest || event.date < closest.date) {
//         return event;
//       }
//       return closest;
//     }, null);

//     return closestEvent;
//   };

//   // Handle countdown timer for the next event
//   useEffect(() => {
//     if (!nextEvent) return;
//     const interval = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = nextEvent.date.getTime() - now;

//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);

//       if (distance < 0) {
//         clearInterval(interval);
//         setTimeRemaining("Event started!");
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [nextEvent]);

//   const filteredEvents = selectedDate
//     ? events.filter(event => event.date.toDateString() === selectedDate.toDateString())
//     : events;

//   const handleDateClick = (date: Date) => {
//     setSelectedDate(date);
//   };

//   const CalendarComponent = () => {
//     const dates = events.map(event => event.date.toDateString());
//     const uniqueDates = Array.from(new Set(dates));

//     return (
//       <div className="bg-white shadow-lg rounded-lg p-4 mb-8 md:mb-0 w-full md:w-1/3 lg:w-1/4 mx-auto md:mx-0">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Filter by Date</h3>
//         <ul className="space-y-2">
//           {uniqueDates.map((dateStr, index) => (
//             <li
//               key={index}
//               className={`cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition ${
//                 selectedDate && selectedDate.toDateString() === dateStr ? "bg-blue-100" : ""
//               }`}
//               onClick={() => handleDateClick(new Date(dateStr))}
//             >
//               {dateStr}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl md:text-4xl font-oswald font-bold text-gray-800 text-center mb-8">Upcoming Events</h2>

//         {/* Event Timer */}
//         {nextEvent && (
//           <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg p-4 mb-8 shadow-md">
//             <FaRegClock className="mr-2" size={24} />
//             <p className="text-lg">
//               <strong>{nextEvent.title}</strong> starts in: <span className="font-bold">{timeRemaining}</span>
//             </p>
//           </div>
//         )}

//         {/* Event Cards and Filter Section */}
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Filter Component */}
//           <CalendarComponent />

//           {/* Event Cards */}
//           {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-grow">
//             {filteredEvents.map((event, index) => (
//               <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
//                 <div className="relative">
//                   <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-t-lg" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//                   <div className="absolute bottom-0 p-4 text-white">
//                     <h3 className="text-lg md:text-2xl font-semibold">{event.title}</h3>
//                     <p className="mt-2 text-sm flex items-center">
//                       <FiMapPin className="mr-2" /> {event.location}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <p className="text-gray-600 text-sm md:text-base mb-4">{event.description}</p>
//                   <button className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300">Learn More</button>
//                 </div>
//               </div>
//             ))}
//           </div> */}

// <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-grow">
//       {filteredEvents.map((event, index) => (
//         <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
//           <div className="relative">
//             <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-t-lg" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//             <div className="absolute bottom-0 p-4 text-white">
//               <h3 className="text-lg md:text-2xl font-semibold">{event.title}</h3>
//               <p className="mt-2 text-sm flex items-center">
//                 <FiMapPin className="mr-2" /> {event.location}
//               </p>
//             </div>
//           </div>
//           <div className="p-4">
//             <p className="text-gray-600 text-sm md:text-base mb-4">{event.description}</p>
//             {/* Learn More button with dynamic navigation */}
//             <button 
//               onClick={() => handleLearnMore(event.id)} 
//               className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300">
//               Learn More
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//         </div>
        
//         {/* Additional Content */}
//         <div className="mt-16 text-center">
//           <h3 className="text-2xl font-oswald text-gray-700 mb-4">Why Join Our Events?</h3>
//           <p className="text-gray-600 max-w-2xl mx-auto mb-8">
//             Our events are designed to bring together sports enthusiasts of all levels. Whether you are a beginner or a seasoned player, you will find something that challenges and inspires you.
//           </p>
//           <button
//             onClick={() => navigate('/academy')}
//             className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition duration-300"
//           >
//             Discover More Events
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Events;



// import React, { useState, useEffect } from 'react';
// import { FaRegClock } from 'react-icons/fa';
// import { FiMapPin } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
// import eventsData from './eventsData';
// // Function to fetch events from mock data
// const fetchEventsFromBackend = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(eventsData);
//     }, 1000); // Simulate a network delay
//   });
// };

// const Events: React.FC = () => {
//   const [events, setEvents] = useState<any[]>([]);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [nextEvent, setNextEvent] = useState<any | null>(null);
//   const [timeRemaining, setTimeRemaining] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch events data from mock backend
//     fetchEventsFromBackend().then((data: any) => {
//       setEvents(data);
//       const closestEvent = getNextEvent(data);
//       setNextEvent(closestEvent);
//     });
//   }, []);

//   const handleLearnMore = (eventId: number) => {
//     navigate(`/event/${eventId}`); // Navigate to the event details page with the event ID
//   };

//   // Calculate the next upcoming event from the list
//   const getNextEvent = (events: any[]) => {
//     const now = new Date();
//     const upcomingEvents = events.filter((event) => event.date > now);

//     const closestEvent = upcomingEvents.reduce<{
//       title: string;
//       date: Date;
//       location: string;
//       description: string;
//       image: string;
//     } | null>((closest, event) => {
//       if (!closest || event.date < closest.date) {
//         return event;
//       }
//       return closest;
//     }, null);

//     return closestEvent;
//   };

//   // Handle countdown timer for the next event
//   useEffect(() => {
//     if (!nextEvent) return;
//     const interval = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = nextEvent.date.getTime() - now;

//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);

//       if (distance < 0) {
//         clearInterval(interval);
//         setTimeRemaining("Event started!");
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [nextEvent]);

//   const filteredEvents = selectedDate
//     ? events.filter((event) => event.date.toDateString() === selectedDate.toDateString())
//     : events;

//   const handleDateClick = (date: Date) => {
//     setSelectedDate(date);
//   };

//   const CalendarComponent = () => {
//     const dates = events.map((event) => event.date.toDateString());
//     const uniqueDates = Array.from(new Set(dates));

//     return (
//       <div className="bg-white shadow-lg rounded-lg p-4 mb-8 md:mb-0 w-full md:w-1/3 lg:w-1/4 mx-auto md:mx-0">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Filter by Date</h3>
//         <ul className="space-y-2">
//           {uniqueDates.map((dateStr, index) => (
//             <li
//               key={index}
//               className={`cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition ${
//                 selectedDate && selectedDate.toDateString() === dateStr ? "bg-blue-100" : ""
//               }`}
//               onClick={() => handleDateClick(new Date(dateStr))}
//             >
//               {dateStr}
//             </li>
//           ))}
//         </ul
//       </div>
//     );
//   };

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl md:text-4xl font-oswald font-bold text-gray-800 text-center mb-8">Upcoming Events</h2>

//         {/* Event Timer */}
//         {nextEvent && (
//           <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg p-4 mb-8 shadow-md">
//             <FaRegClock className="mr-2" size={24} />
//             <p className="text-lg">
//               <strong>{nextEvent.title}</strong> starts in: <span className="font-bold">{timeRemaining}</span>
//             </p>
//           </div>
//         )}

//         {/* Event Cards and Filter Section */}
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Filter Component */}
//           <CalendarComponent />

//           {/* Event Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-grow">
//             {filteredEvents.map((event) => (
//               <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
//                 <div className="relative">
//                   <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-t-lg" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//                   <div className="absolute bottom-0 p-4 text-white">
//                     <h3 className="text-lg md:text-2xl font-semibold">{event.title}</h3>
//                     <p className="mt-2 text-sm flex items-center">
//                       <FiMapPin className="mr-2" /> {event.location}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <p className="text-gray-600 text-sm md:text-base mb-4">{event.description}</p>
//                   {/* Learn More button with dynamic navigation */}
//                   <button
//                     onClick={() => handleLearnMore(event.id)}
//                     className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300"
//                   >
//                     Learn More
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Additional Content */}
//         <div className="mt-16 text-center">
//            <h3 className="text-2xl font-oswald text-gray-700 mb-4">Why Join Our Events?</h3>
//            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
//              Our events are designed to bring together sports enthusiasts of all levels. Whether you are a beginner or a seasoned player, you will find something that challenges and inspires you.
//            </p>
           
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Events;



// HARSH's CODE


// import React, { useState, useEffect } from 'react';
// import { FaRegClock } from 'react-icons/fa';
// import { FiMapPin } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // Function to fetch events from the backend API
// const fetchEventsFromBackend = async () => {
//   try {
//     const response = await axios.get('http://gsa.nuviontech.com:8000/api/events/');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     return [];
//   }
// };

// const EventsFiltered: React.FC = () => {
//   const [events, setEvents] = useState<any[]>([]);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [nextEvent, setNextEvent] = useState<any | null>(null);
//   const [timeRemaining, setTimeRemaining] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch events data from the API
//     fetchEventsFromBackend().then((data) => {
//       setEvents(data);
//       const closestEvent = getNextEvent(data);
//       setNextEvent(closestEvent);
//     });
//   }, []);

//   const handleLearnMore = (eventId: number) => {
//     navigate(`/event/${eventId}`); // Navigate to event details page
//   };

//   // Function to calculate the next upcoming event
//   const getNextEvent = (events: any[]) => {
//     const now = new Date();
//     const upcomingEvents = events.filter((event) => new Date(`${event.date}T${event.time}`) > now);

//     const closestEvent = upcomingEvents.reduce<any | null>((closest, event) => {
//       const eventDate = new Date(`${event.date}T${event.time}`);
//       if (!closest || eventDate < closest.date) {
//         return { ...event, date: eventDate };
//       }
//       return closest;
//     }, null);

//     return closestEvent;
//   };

//   // Handle countdown timer for the next event
//   useEffect(() => {
//     if (!nextEvent) return;
//     const interval = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = nextEvent.date.getTime() - now;

//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);

//       if (distance < 0) {
//         clearInterval(interval);
//         setTimeRemaining("Event started!");
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [nextEvent]);

//   const filteredEvents = selectedDate
//     ? events.filter((event) => new Date(`${event.date}T${event.time}`).toDateString() === selectedDate.toDateString())
//     : events;

//   const handleDateClick = (date: Date) => {
//     setSelectedDate(date);
//   };

//   const CalendarComponent = () => {
//     const dates = events.map((event) => new Date(`${event.date}T${event.time}`).toDateString());
//     const uniqueDates = Array.from(new Set(dates));

//     return (
//       <div className="bg-white shadow-lg rounded-lg p-4 mb-8 md:mb-0 w-full md:w-40 lg:w-48 mx-auto md:mx-0">
//                <h3 className="text-xl font-semibold text-gray-800 mb-4">Filter by Date</h3>
//                <ul className="space-y-2 w-full">
//                  {uniqueDates.map((dateStr, index) => (
//                   <li
//                     key={index}
//                     className={`cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition ${
//                       selectedDate && selectedDate.toDateString() === dateStr ? "bg-blue-100" : ""
//                     }`}
//                     onClick={() => handleDateClick(new Date(dateStr))}
//                   >
//                     {dateStr}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//     );
//   };

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <h2 className="events-title text-3xl md:text-4xl font-oswald font-bold text-gray-800 text-center mb-8">
//           Upcoming Events
//         </h2>

//         {/* Next Event Countdown Timer */}
//         {nextEvent && (
//           <div className="next-event-timer flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg p-4 mb-8 shadow-md">
//             <FaRegClock className="mr-2" size={24} />
//             <p className="text-lg">
//               <strong>{nextEvent.title}</strong> starts in:{" "}
//               <span className="font-bold">{timeRemaining}</span>
//             </p>
//           </div>
//         )}

//         {/* Filter and Event List */}
//         <div className="events-container flex flex-col md:flex-row gap-8">
//           {/* Date Filter */}
//           <CalendarComponent />

//           {/* Event Cards */}
//           <div className="events-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-grow">
//             {filteredEvents.map((event) => (
//               <div
//                 key={event.id}
//                 className="event-card bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
//               >
//                 <div className="event-image relative">
//                   <img
//                     src={`http://gsa.nuviontech.com:8000${event.image_url}`}
//                     alt={event.title}
//                     className="w-full h-64 object-cover rounded-t-lg"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//                   <div className="event-info absolute bottom-0 p-4 text-white">
//                     <h3 className="event-title text-lg md:text-2xl font-semibold">
//                       {event.title}
//                     </h3>
//                     <p className="event-location mt-2 text-sm flex items-center">
//                       <FiMapPin className="mr-2" /> {event.location}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="event-description p-4">
//                   <p className="text-gray-600 text-sm md:text-base mb-4">
//                     {event.description}
//                   </p>
//                   {/* Learn More Button */}
//                   <button
//                     onClick={() => handleLearnMore(event.id)}
//                     className="event-learn-more w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300"
//                   >
//                     Learn More
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Additional Content */}
//         <div className="additional-content mt-16 text-center">
//           <h3 className="additional-title text-2xl font-oswald text-gray-700 mb-4">
//             Why Join Our Events?
//           </h3>
//           <p className="additional-text text-gray-600 max-w-2xl mx-auto mb-8">
//             Our events are designed to bring together sports enthusiasts of all levels. Whether you are a beginner or a seasoned player, you will find something that challenges and inspires you.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EventsFiltered;


// OM's CODE STARTS HERE
import React, { useState, useEffect } from 'react';
import { FaRegClock } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Function to fetch events from the backend API
const fetchEventsFromBackend = async () => {
  try {
    const response = await axios.get('http://gsa.nuviontech.com:8000/api/events/');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

const EventsFiltered: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [nextEvent, setNextEvent] = useState<any | null>(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch events data from the API
    fetchEventsFromBackend().then((data) => {
      setEvents(data);
      const closestEvent = getNextEvent(data);
      setNextEvent(closestEvent);
    });
  }, []);

  const handleLearnMore = (eventId: number) => {
    navigate(`/event/${eventId}`); // Navigate to event details page
  };

  // Function to calculate the next upcoming event
  const getNextEvent = (events: any[]) => {
    const now = new Date();
    const upcomingEvents = events.filter((event) => new Date(`${event.date}T${event.time}`) > now);

    const closestEvent = upcomingEvents.reduce<any | null>((closest, event) => {
      const eventDate = new Date(`${event.date}T${event.time}`);
      if (!closest || eventDate < closest.date) {
        return { ...event, date: eventDate };
      }
      return closest;
    }, null);

    return closestEvent;
  };

  // Handle countdown timer for the next event
  useEffect(() => {
    if (!nextEvent) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextEvent.date.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (distance < 0) {
        clearInterval(interval);
        setTimeRemaining("Event started!");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextEvent]);

  const filteredEvents = selectedDate
    ? events.filter((event) => new Date(`${event.date}T${event.time}`).toDateString() === selectedDate.toDateString())
    : events;

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const CalendarComponent = () => {
    const dates = events.map((event) => new Date(`${event.date}T${event.time}`).toDateString());
    const uniqueDates = Array.from(new Set(dates));

    return (
      <div className="bg-white shadow-lg rounded-lg p-4 mb-8 md:mb-0 w-full md:w-40 lg:w-48 mx-auto md:mx-0">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Filter by Date</h3>
        <ul className="space-y-2 w-full">
          {uniqueDates.map((dateStr, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition ${
                selectedDate && selectedDate.toDateString() === dateStr ? "bg-blue-100" : ""
              }`}
              onClick={() => handleDateClick(new Date(dateStr))}
              style={{
                whiteSpace: "nowrap",  // Prevents date from wrapping to multiple lines
                overflow: "hidden",    // Ensures no overflow text is visible
                textOverflow: "ellipsis" // Adds "..." if the text overflows
              }}
            >
              {dateStr}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="events-title text-3xl md:text-4xl font-oswald font-bold text-gray-800 text-center mb-8">
          Upcoming Events
        </h2>

        {/* Next Event Countdown Timer */}
        {nextEvent && (
          <div className="next-event-timer flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg p-4 mb-8 shadow-md">
            <FaRegClock className="mr-2" size={24} />
            <p className="text-lg">
              <strong>{nextEvent.title}</strong> starts in:{" "}
              <span className="font-bold">{timeRemaining}</span>
            </p>
          </div>
        )}

        {/* Filter and Event List */}
        <div className="events-container flex flex-col md:flex-row gap-8">
          {/* Date Filter */}
          <CalendarComponent />

          {/* Event Cards */}
          <div className="events-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-grow">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="event-card bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  minHeight: "350px",  // Sets a consistent minimum height for all event cards
                }}
              >
                <div className="event-image relative">
                  <img
                    src={`http://gsa.nuviontech.com:8000${event.image_url}`}
                    alt={event.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="event-info absolute bottom-0 p-4 text-white">
                    <h3 className="event-title text-lg md:text-2xl font-semibold">
                      {event.title}
                    </h3>
                    <p className="event-location mt-2 text-sm flex items-center">
                      <FiMapPin className="mr-2" /> {event.location}
                    </p>
                  </div>
                </div>
                <div className="event-description p-4">
                  <p className="text-gray-600 text-sm md:text-base mb-4">
                    {event.description}
                  </p>
                  {/* Learn More Button */}
                  <button
                    onClick={() => handleLearnMore(event.id)}
                    className="event-learn-more w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Content */}
        <div className="additional-content mt-16 text-center">
          <h3 className="additional-title text-2xl font-oswald text-gray-700 mb-4">
            Why Join Our Events?
          </h3>
          <p className="additional-text text-gray-600 max-w-2xl mx-auto mb-8">
            Our events are designed to bring together sports enthusiasts of all levels. Whether you are a beginner or a seasoned player, you will find something that challenges and inspires you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventsFiltered;