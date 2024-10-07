// import React, { useState, useEffect } from 'react';
// import Banner from './Banner'; // Assuming you have a Banner component

// interface GalleryProps {
//   title: string;
//   images: string[];
// }

// const Gallery: React.FC<GalleryProps> = ({ title, images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000); // Change image every 3 seconds
//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <div className="mb-16">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
//       <div className="relative flex items-center flex-col">
//         <div className="w-full md:w-5/6 h-[400px] md:h-[600px] overflow-hidden rounded-lg mb-4">
//           <img
//             src={images[currentIndex]}
//             alt={`Preview ${currentIndex}`}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="flex flex-wrap justify-center space-x-2 mt-2">
//           {images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Thumbnail ${index}`}
//               className={`w-20 h-20 object-cover cursor-pointer rounded-full transition-opacity duration-300 ${index === currentIndex ? 'opacity-100' : 'opacity-60'} md:w-26 md:h-26`}
//               onClick={() => setCurrentIndex(index)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const GalleryPage: React.FC = () => {
//   const photoGalleryImages = [
//     '/gallery_1.jpg',
//     '/gallery_2.jpg',
//     '/gallery_3.jpg',
//     '/gallery_4.jpg',
//     '/gallery_5.jpg',
//     '/gallery_6.jpg',
//     '/gallery_7.jpg',
//     '/gallery_8.jpg',
//   ];

//   const awardsGalleryImages = [
//     '/gallery_1.jpg',
//     '/gallery_2.jpg',
//     '/gallery_3.jpg',
//     '/gallery_4.jpg',
//   ];

//   return (
//     <>
//       <Banner />
//       <div className="py-16 bg-gray-100">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <p className="text-lg text-gray-600">
//               Welcome to our gallery page! Here you can explore our photo gallery and awards gallery. 
//               Enjoy browsing through the highlights of our events and achievements.
//             </p>
//           </div>
//           <Gallery title="Photo Gallery" images={photoGalleryImages} />
//           <Gallery title="Awards Gallery" images={awardsGalleryImages} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default GalleryPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './Banner'; // Assuming you have a Banner component

interface GalleryProps {
  title: string;
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ title, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
      <div className="relative flex items-center flex-col">
        <div className="w-full md:w-5/6 h-[400px] md:h-[600px] overflow-hidden rounded-lg mb-4">
          <img
            src={images[currentIndex]}
            alt={`Preview ${currentIndex}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-wrap justify-center space-x-2 mt-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              className={`w-20 h-20 object-cover cursor-pointer rounded-full transition-opacity duration-300 ${index === currentIndex ? 'opacity-100' : 'opacity-60'} md:w-26 md:h-26`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const GalleryPage: React.FC = () => {
  const [photoGalleryImages, setPhotoGalleryImages] = useState<string[]>([]);
  const [awardsGalleryImages, setAwardsGalleryImages] = useState<string[]>([]);

  const baseURL = 'http://gsa.nuviontech.com:8000'; // Replace this with your base URL

  useEffect(() => {
    // Fetch Photo Gallery data
    axios.get(`${baseURL}/api/photo-gallery/`)
      .then(response => {
        const images = response.data.map((item: any) => `${baseURL}${item.image_url}`);
        console.log(images);
        setPhotoGalleryImages(images);
      })
      .catch(error => {
        console.error("Failed to fetch photo gallery data:", error);
      });

    // Fetch Awards Gallery data
    axios.get(`${baseURL}/api/awards-gallery/`)
      .then(response => {
        const images = response.data.map((item: any) => `${baseURL}${item.image_url}`);
        console.log(images);
        setAwardsGalleryImages(images);
      })
      .catch(error => {
        console.error("Failed to fetch awards gallery data:", error);
      });
  }, []);

  return (
    <>
      <Banner />
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600">
              Welcome to our gallery page! Here you can explore our photo gallery and awards gallery. 
              Enjoy browsing through the highlights of our events and achievements.
            </p>
          </div>
          <Gallery title="Photo Gallery" images={photoGalleryImages} />
          <Gallery title="Awards Gallery" images={awardsGalleryImages} />
        </div>
      </div>
    </>
  );
};

export default GalleryPage;