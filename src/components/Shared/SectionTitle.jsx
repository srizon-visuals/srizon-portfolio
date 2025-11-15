import React from 'react';
import { motion } from 'framer-motion';
import './SectionTitle.css';

const SectionTitle = ({ title, subtitle, centered = false, onDark = false }) => {
  return (
    <div className={`section-title ${centered ? 'centered' : ''} ${onDark ? 'on-dark' : ''}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="section-subtitle"
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div 
        className="title-divider"
        initial={{ width: 0 }}
        whileInView={{ width: centered ? '60px' : '80px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      />
    </div>
  );
};

export default SectionTitle;
