import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

const Button = ({ 
  children, 
  primary = true, 
  onClick, 
  className = '', 
  type = 'button',
  animated = true,
  ...props 
}) => {
  if (animated) {
    return (
      <motion.button
        whileHover={props.whileHover || { scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`custom-btn ${primary ? 'primary' : 'secondary'} ${className}`}
        onClick={onClick}
        type={type}
        transition={props.transition || { duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
  
  return (
    <button
      className={`custom-btn ${primary ? 'primary' : 'secondary'} ${className}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
