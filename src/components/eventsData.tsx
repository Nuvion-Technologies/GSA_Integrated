import React, { useEffect, useState } from "react";
import axios from "axios";

export interface Event {
  id: number;
  title: string;
  date: Date;
  location: string;
  description: string;
  image: string;
  fullDescription: string;
}

const EventsData: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch events data from the API
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events/");
        const eventsData = response.data.map((event: any) => ({
          ...event,
          date: new Date(event.date), // Ensure the date is a Date object
        }));
        setEvents(eventsData);
        setLoading(false);
      } catch (error) {
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.date.toDateString()}</p>
            <p>{event.location}</p>
            <p>{event.description}</p>
            <img src={event.image} alt={event.title} />
          </div>
        ))
      ) : (
        <div>No events found.</div>
      )}
    </div>
  );
};

export default EventsData;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// // Event interface for type safety
// export interface Event {
//   id: number;
//   title: string;
//   date: Date;
//   location: string;
//   description: string;
//   image_url: string;
//   fullDescription: string;
// }

// // Component that fetches event data
// const Events = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState<string | null>(null); // Error state

//   // Fetch events data from the API
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('http://gsa.nuviontech.com:8000/api/events/');
//         const eventData = response.data.map((event: any) => ({
//           id: event.id,
//           title: event.title,
//           date: new Date(`${event.date}T${event.time}`), // Combine date and time
//           location: event.location,
//           description: event.description,
//           image_url: `http://gsa.nuviontech.com:8000${event.image_url}`, // Full image URL
//           fullDescription: event.description, // Assuming description is the full description as well
//         }));
//         setEvents(eventData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//         setError('Failed to load events.');
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   if (loading) {
//     return <div>Loading events...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="events-list">
//       {events.map((event) => (
//         <div key={event.id} className="event-card">
//           <img src={event.image_url} alt={event.title} className="event-image" />
//           <h2>{event.title}</h2>
//           <p>{event.location}</p>
//           <p>{event.date.toLocaleString()}</p>
//           <p>{event.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Events;

// // src/data/eventsData.ts

// export interface Event {
//     id: number;
//     title: string;
//     date: Date;
//     location: string;
//     description: string;
//     image: string;
//     fullDescription: string;
//   }
  
//   export const eventsData: Event[] = [
//     {
//       id: 1,
//       title: "Cricket Tournament",
//       date: new Date("2024-09-21T10:00:00"),
//       location: "Main Ground, Gandhinagar Sports Academy",
//       description: "Join us for an exciting cricket tournament...",
//       image: "/cricketcard.png",
//       fullDescription: "Detailed information about the Cricket Tournament...",
//     },
//     {
//       id: 2,
//       title: "Football Coaching Camp",
//       date: new Date("2024-09-20T11:00:00"),
//       location: "Football Ground, Gandhinagar Sports Academy",
//       description: "A special coaching camp with professional coaches...",
//       image: "/footballcard.png",
//       fullDescription: "Detailed information about the Football Coaching Camp...",
//     },
//     {
//         id: 3,
//         title: "Yoga Workshop",
//         date: new Date("2024-10-05T09:00:00"),
//         location: "Indoor Hall, Gandhinagar Sports Academy",
//         description: "A relaxing yoga workshop focusing on breathing techniques and posture alignment.",
//         image: "/yogaworkshop.png",
//         fullDescription: "Detailed information about the Football Coaching Camp...",
//     },
//       {
//         id: 4,
//         title: "Badminton Championship",
//         date: new Date("2024-10-10T15:00:00"),
//         location: "Indoor Court, Gandhinagar Sports Academy",
//         description: "Compete with the best in the city at our annual badminton championship.",
//         image: "/badmintonchampionship.png",
//         fullDescription: "Detailed information about the Football Coaching Camp...",
//       }
//     // Add more events as needed
//   ];
