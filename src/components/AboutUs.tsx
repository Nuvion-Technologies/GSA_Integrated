import React,{useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import axios from 'axios';

const AboutUs: React.FC = () => {
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [photoGallery, setPhotoGallery] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const baseURL = 'http://gsa.nuviontech.com:8000';
      useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                const [photoResponse] = await Promise.all([
                    axios.get(`${baseURL}/api/photo-gallery/`),
                ]);

                setPhotoGallery(photoResponse.data);
                // setAwardsGallery(awardsResponse.data);
            } catch (error) {
                console.error('Error fetching gallery data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryData();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    // const images = [
    //   '/gallery_1.jpg',
    //   '/gallery_2.jpg',
    //   '/gallery_3.jpg',
    //   '/gallery_4.jpg',
    //   '/gallery_5.jpg',
    //   '/gallery_6.jpg',
    // ];
  
    const openModal = (image: string) => {
      setModalImage(image);
    };
  
    const closeModal = () => {
      setModalImage(null);
    };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Intro Section */}
      <section className="py-12 px-6 lg:px-24 text-center bg-white shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-oswald font-bold text-gray-800 mb-4">About Gandhinagar Sports Academy</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            At Gandhinagar Sports Academy, we are dedicated to nurturing talent, promoting sportsmanship, and providing an exceptional environment for athletes to achieve their highest potential.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-6 lg:px-24 bg-gradient-to-r from-blue-100 to-blue-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-oswald font-bold text-center text-gray-800 mb-8">Our Mission & Vision</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
            >
              <FaBullseye className="text-5xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-blue-500 mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To provide top-tier training facilities and expert coaching to inspire athletes to reach their fullest potential.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
            >
              <FaLightbulb className="text-5xl text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-green-500 mb-2">Our Vision</h3>
              <p className="text-gray-600">
                To cultivate a culture of excellence and sportsmanship, fostering both personal growth and community engagement.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Statistics Section */}
<section className="py-16 bg-white">
  <div className="container mx-auto text-center">
    <h2 className="text-2xl md:text-3xl font-oswald font-bold text-gray-800 mb-12">Key Statistics</h2>
    <div className="flex flex-wrap justify-center gap-6">
      {['500+ Members', '20+ Coaches', '10 Sports Programs'].map((stat, index) => (
        <motion.div
          key={index}
          className="bg-gray-50 p-6 rounded-lg shadow-md w-48 md:w-56 flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-4xl font-bold text-blue-500 mb-2">{stat.split(' ')[0]}</p>
          <p className="text-base text-gray-600">{stat.split(' ').slice(1).join(' ')}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Meet Our Team Section */}
<section className="py-16 bg-gradient-to-r from-blue-100 to-blue-200">
  <div className="container mx-auto text-center">
    <h2 className="text-2xl md:text-3xl font-oswald font-bold text-gray-800 mb-12">Meet Our Team</h2>
    <div className="flex flex-wrap justify-center gap-10">
      {[
        {
          name: 'John Doe',
          title: 'Head Coach',
          specialty: 'Football',
          bio: 'With over 15 years of coaching experience, John leads our football program to excellence.',
          photo: '/coach_1.jpg',
        },
        {
          name: 'Jane Smith',
          title: 'Senior Coach',
          specialty: 'Basketball',
          bio: 'Jane brings her passion for basketball and a decade of experience to our academy.',
          photo: '/coach_2.jpg',
        },
        {
          name: 'Mike Johnson',
          title: 'Fitness Trainer',
          specialty: 'Fitness & Conditioning',
          bio: 'Mike specializes in strength training and conditioning, helping athletes reach their peak performance.',
          photo: '/coach_3.jpg',
        },
      ].map((coach, index) => (
        <motion.div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md w-64 flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={coach.photo}
            alt={`${coach.name}`}
            className="w-32 h-32 rounded-full mb-4 shadow-lg object-cover"
          />
          <h3 className="text-xl font-semibold mb-1">{coach.name}</h3>
          <p className="text-sm text-blue-500 mb-2">{coach.title}</p>
          <p className="text-sm text-gray-600 mb-2">{coach.specialty}</p>
          <p className="text-sm text-gray-500">{coach.bio}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* Gallery Section */}
<section className="pb-16 bg-gray-50 pt-24" id="gallery">
                 <div className="container mx-auto text-center max-w-5xl px-4">
                     <h2 className="text-3xl md:text-4xl font-oswald font-bold text-gray-800 mb-12">
                         Our Gallery
                     </h2>

                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
                        {photoGallery.map((image: any, index: number) => (
                            <div
                                key={index}
                                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105 group"
                                onClick={() => openModal(`${baseURL}${image.image_url}`)}
                            >
                                <img
                                    src={`${baseURL}${image.image_url}`}
                                    alt={image.title}
                                    className="w-full h-48 md:h-64 object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white text-lg font-semibold">View</span>
                                </div>
                            </div>
                        ))}
                    </div>


        <Link
          to="/gallery"
          className="inline-block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <span className="text-lg font-semibold">View More</span>
        </Link>

        {/* Modal */}
        {modalImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="relative bg-white p-4 rounded-lg max-w-screen-md max-h-[80vh] flex flex-col items-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-900 hover:text-gray-600 p-2 rounded-full bg-white shadow-lg"
              >
                <MdClose size={24} />
              </button>
              <img
                src={modalImage}
                alt="Preview"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>

    </div>
  );
};

export default AboutUs;


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FaBullseye, FaLightbulb } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { MdClose } from 'react-icons/md';
// import axios from 'axios';

// const AboutUs: React.FC = () => {
//     const [modalImage, setModalImage] = useState<string | null>(null);
//     const [photoGallery, setPhotoGallery] = useState<any[]>([]);
//     const [awardsGallery, setAwardsGallery] = useState<any[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const baseURL = 'http://gsa.nuviontech.com:8000';

//     // Function to open modal with image
//     const openModal = (image: string) => {
//         setModalImage(image);
//     };

//     const closeModal = () => {
//         setModalImage(null);
//     };

//     // Fetch gallery data from APIs
//     useEffect(() => {
//         const fetchGalleryData = async () => {
//             try {
//                 const [photoResponse, awardsResponse] = await Promise.all([
//                     axios.get(`${baseURL}/api/photo-gallery/`),
//                     axios.get(`${baseURL}/api/awards-gallery/`),
//                 ]);

//                 setPhotoGallery(photoResponse.data);
//                 setAwardsGallery(awardsResponse.data);
//             } catch (error) {
//                 console.error('Error fetching gallery data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchGalleryData();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Intro Section */}
//             <section className="py-12 px-6 lg:px-24 text-center bg-white shadow-sm">
//                 <div className="max-w-4xl mx-auto">
//                     <h2 className="text-3xl md:text-4xl font-oswald font-bold text-gray-800 mb-4">
//                         About Gandhinagar Sports Academy
//                     </h2>
//                     <p className="text-lg md:text-xl text-gray-600 mb-6">
//                         At Gandhinagar Sports Academy, we are dedicated to nurturing talent, promoting sportsmanship, and providing an exceptional environment for athletes to achieve their highest potential.
//                     </p>
//                 </div>
//             </section>

//             {/* Gallery Section */}
//             <section className="pb-16 bg-gray-50 pt-24" id="gallery">
//                 <div className="container mx-auto text-center max-w-5xl px-4">
//                     <h2 className="text-3xl md:text-4xl font-oswald font-bold text-gray-800 mb-12">
//                         Our Gallery
//                     </h2>

//                     <h3 className="text-2xl font-bold text-gray-800 mb-6">Photo Gallery</h3>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
//                         {photoGallery.map((image: any, index: number) => (
//                             <div
//                                 key={index}
//                                 className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105 group"
//                                 onClick={() => openModal(`${baseURL}${image.image_url}`)}
//                             >
//                                 <img
//                                     src={`${baseURL}${image.image_url}`}
//                                     alt={image.title}
//                                     className="w-full h-48 md:h-64 object-cover"
//                                 />
//                                 <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                     <span className="text-white text-lg font-semibold">View</span>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <h3 className="text-2xl font-bold text-gray-800 mb-6">Awards Gallery</h3>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
//                         {awardsGallery.map((award: any, index: number) => (
//                             <div
//                                 key={index}
//                                 className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105 group"
//                                 onClick={() => openModal(`${baseURL}${award.image_url}`)}
//                             >
//                                 <img
//                                     src={`${baseURL}${award.image_url}`}
//                                     alt={award.title}
//                                     className="w-full h-48 md:h-64 object-cover"
//                                 />
//                                 <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                     <span className="text-white text-lg font-semibold">View</span>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <Link
//                         to="/gallery"
//                         className="inline-block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
//                     >
//                         <span className="text-lg font-semibold">View More</span>
//                     </Link>

//                     {/* Modal */}
//                     {modalImage && (
//                         <div
//                             className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//                             onClick={closeModal}
//                         >
//                             <div
//                                 className="relative bg-white p-4 rounded-lg max-w-screen-md max-h-[80vh] flex flex-col items-center overflow-hidden"
//                                 onClick={(e) => e.stopPropagation()}
//                             >
//                                 <button
//                                     onClick={closeModal}
//                                     className="absolute top-4 right-4 text-gray-900 hover:text-gray-600 p-2 rounded-full bg-white shadow-lg"
//                                 >
//                                     <MdClose size={24} />
//                                 </button>
//                                 <img
//                                     src={modalImage}
//                                     alt="Preview"
//                                     className="w-full h-auto object-contain"
//                                 />
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default AboutUs;