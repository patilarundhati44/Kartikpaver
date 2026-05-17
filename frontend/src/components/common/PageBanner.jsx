import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PageBanner = ({ title, subtitle, breadcrumbs = [] }) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 opacity-90" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Orange accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center space-x-2 text-sm text-gray-500 mb-6"
        >
          <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span className="text-orange-500">/</span>
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-orange-400 transition-colors">
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-gray-300">{crumb.name}</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {subtitle && (
            <p className="section-subtitle mb-3">{subtitle}</p>
          )}
          <h1 className="text-5xl md:text-6xl font-bold text-white uppercase tracking-wide" style={{ fontFamily: 'Oswald, sans-serif' }}>
            {title}
          </h1>
          <div className="w-20 h-1 bg-orange-500 mt-4" />
        </motion.div>
      </div>

      {/* Bottom diagonal */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-dark-900" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
    </section>
  );
};

export default PageBanner;
