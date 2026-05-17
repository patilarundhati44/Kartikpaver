import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ subtitle, title, description, light = false, center = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? 'text-center' : 'text-left'}`}
    >
      {subtitle && (
        <p className="section-subtitle">{subtitle}</p>
      )}
      <h2 className={`section-title mb-4 ${light ? 'text-white' : 'text-white'}`}>
        {title}
      </h2>
      <div className={`h-1 w-16 bg-orange-500 mb-6 ${center ? 'mx-auto' : ''}`} />
      {description && (
        <p className={`text-gray-400 max-w-2xl text-base leading-relaxed ${center ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
