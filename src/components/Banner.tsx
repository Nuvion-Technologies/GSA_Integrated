import React from 'react';
import { useLocation } from 'react-router-dom';

const Banner: React.FC = () => {
  const location = useLocation();
  
  // Extract the path name and capitalize the first letter of each word
  const getBannerText = () => {
    const path = location.pathname.replace('/', '');
    if (path === '') return 'HOME'; // Default to HOME if the path is the root
    return path.toUpperCase().replace(/-/g, ' ');
  };

  return (
<div className="w-full bg-[#02307C] pt-32 pb-16 md:pt-40 md:pb-20 flex justify-between md:justify-center items-center relative overflow-hidden">
{/* Left Images */}
      <div className="flex justify-center items-center gap-4 md:absolute md:left-10">
        {/* Left Side Images */}
        <img src="/b_cricket.png" alt="Player Icon 1" className="w-8 h-8 md:w-20 md:h-20" />
        <img src="/b_football.png" alt="Player Icon 2" className="w-8 h-8 md:w-20 md:h-20" />
      </div>

      {/* Center Text with Images Aligned in One Line */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        {/* Center Text */}
        <h1 className="text-white text-5xl md:text-6xl font-bold font-oswald text-center">
          {getBannerText()}
        </h1>
      </div>

      {/* Right Images */}
      <div className="flex justify-center items-center gap-4 md:absolute md:right-10 right-0">
        {/* Right Side Images */}
        <img src="/b_football.png" alt="Player Icon 4" className="w-8 h-8 md:w-20 md:h-20" />
        <img src="/b_cricket.png" alt="Player Icon 3" className="w-8 h-8 md:w-20 md:h-20" />
      </div>
    </div>
  );
};

export default Banner;
