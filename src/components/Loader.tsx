import React from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";

const Loader: React.FC = () => {
  return (
    <AnimatePresence>
      {/* Motion.div with framer-motion for fade in/out effect */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-white z-50"
        initial={{ opacity: 0 }}       // Fade-in starts from 0 opacity
        animate={{ opacity: 1 }}       // Animates to full opacity
        exit={{ opacity: 0 }}          // Fades out back to 0 opacity
        transition={{ duration: 0.5 }} // Transition duration for the animation
      >
        <ClimbingBoxLoader color="#383eff" loading={true} size={20} />
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
