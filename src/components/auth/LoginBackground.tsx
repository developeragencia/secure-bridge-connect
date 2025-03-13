
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from '@/components/AnimatedLogo';

const LoginBackground: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Animated background shapes */}
      <div className="absolute pointer-events-none">
        <motion.div
          className="absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-primary/10 -top-20 -right-20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-secondary/10 -bottom-20 -left-20"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
      
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <AnimatedLogo showText={true} />
        </motion.div>
      </div>
    </>
  );
};

export default LoginBackground;
