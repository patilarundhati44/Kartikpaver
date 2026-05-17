import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
  { icon: '⚙️', title: 'Hydraulic Press Machines', desc: 'State-of-the-art hydraulic presses for uniform density and perfect dimensions' },
  { icon: '🔬', title: 'Quality Testing Lab', desc: 'In-house testing for compressive strength, water absorption, and durability' },
  { icon: '🏭', title: 'Automated Mixing Plant', desc: 'Computer-controlled batching for consistent concrete mix ratios every time' },
  { icon: '📦', title: 'Large Production Capacity', desc: 'Daily production capacity of 50,000+ paver blocks to meet bulk orders' },
];

const FactorySection = () => {
  return (
    <section className="section-padding bg-dark-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main factory visual */}
            <div className="relative bg-dark-900 rounded-sm overflow-hidden border border-dark-600 aspect-[4/3]">
              {/* Industrial grid background */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    repeating-linear-gradient(0deg, rgba(249,115,22,0.04) 0px, rgba(249,115,22,0.04) 1px, transparent 1px, transparent 50px),
                    repeating-linear-gradient(90deg, rgba(249,115,22,0.04) 0px, rgba(249,115,22,0.04) 1px, transparent 1px, transparent 50px),
                    linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)
                  `,
                }}
              />

              {/* Factory floor visualization */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full">
                  {/* Production line visualization */}
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    {['Raw Material', 'Mixing', 'Pressing', 'Curing', 'Quality Check', 'Dispatch'].map((step, i) => (
                      <div key={step} className="flex items-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, type: 'spring' }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded-sm flex items-center justify-center text-orange-500 text-xs font-bold mb-1">
                            {i + 1}
                          </div>
                          <span className="text-gray-600 text-[8px] text-center leading-tight hidden md:block" style={{ maxWidth: '40px' }}>
                            {step}
                          </span>
                        </motion.div>
                        {i < 5 && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.05 }}
                            className="w-4 h-0.5 bg-orange-500/30 mx-1"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Paver block grid */}
                  <div className="grid grid-cols-8 gap-1.5 mt-4">
                    {[...Array(32)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.02, type: 'spring', stiffness: 200 }}
                        className="aspect-square rounded-sm"
                        style={{
                          background: i % 4 === 0
                            ? 'linear-gradient(135deg, #ea580c, #c2410c)'
                            : i % 4 === 1
                            ? 'linear-gradient(135deg, #374151, #1f2937)'
                            : i % 4 === 2
                            ? 'linear-gradient(135deg, #4b5563, #374151)'
                            : 'linear-gradient(135deg, #6b7280, #4b5563)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Overlay label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900 to-transparent p-4">
                <p className="text-orange-500 text-xs uppercase tracking-widest font-semibold">
                  Latur MIDC Manufacturing Facility
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-4 rounded-sm shadow-orange-glow"
            >
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>Bulk</div>
                <div className="text-xs uppercase tracking-wider opacity-90">Blocks/Day</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-subtitle">Our Factory</p>
            <h2 className="section-title mb-4">
              State-of-the-Art<br />
              <span className="text-gradient">Manufacturing</span>
            </h2>
            <div className="orange-line" />
            <p className="text-gray-400 leading-relaxed mb-8">
              Located at Plot No C10, Near Atul Metal, 1 No MIDC, Latur - 413531, our manufacturing
              facility is equipped with modern hydraulic press technology and concrete mixing systems.
              Every paver block is crafted with precision to meet the highest quality standards.
              GSTIN: 27ABCFK5217C1ZP.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-dark-900 border border-dark-600 rounded-sm hover:border-orange-500/40 transition-colors duration-300"
                >
                  <span className="text-2xl flex-shrink-0">{feature.icon}</span>
                  <div>
                    <h4 className="text-white text-sm font-semibold mb-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {feature.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/about" className="btn-primary">
                About Our Factory
              </Link>
              <Link to="/gallery" className="btn-secondary">
                View Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FactorySection;
