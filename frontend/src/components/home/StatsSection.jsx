import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '4.9★', label: 'Justdial Rating', icon: '🏆' },
  { value: '50+', label: 'Customer Reviews', icon: '😊' },
  { value: '6+', label: 'Product Varieties', icon: '🧱' },
  { value: '51L+', label: 'Annual Turnover', icon: '📈' },
];

const StatsSection = () => {
  return (
    <section className="py-12 bg-orange-500 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(0,0,0,0.1) 10px,
            rgba(0,0,0,0.1) 11px
          )`,
        }}
      />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div
                className="text-4xl md:text-5xl font-bold text-white mb-1"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                {stat.value}
              </div>
              <div className="text-orange-100 text-sm uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
