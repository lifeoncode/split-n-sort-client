import { motion } from "framer-motion";
import React from "react";

const LoadingSpinner = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="loading-spinner">
        <div />
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;
