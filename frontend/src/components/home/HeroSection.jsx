import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

const slides = [
  {
    id: 1,
    title: 'Premium Quality',
    highlight: 'Paver Block Solutions',
    subtitle: 'Kartik Paver Industries',
    description: 'Maharashtra\'s trusted manufacturer of high-strength paver blocks. Built for durability, designed for excellence.',
    badge: 'Est. 2024 • Latur, Maharashtra',
  },
  {
    id: 2,
    title: 'Industrial Strength',
    highlight: 'Built to Last',
    subtitle: 'Superior Manufacturing',
    description: 'From I-Shape to Zig Zag, Grass Pavers to Kerb Stones — complete paving solutions for every project.',
    badge: '6\+ Products Completed',
  },
  {
    id: 3,
    title: 'Modern Machinery',
    highlight: 'Precision Crafted',
    subtitle: 'State-of-the-Art Factory',
    description: 'Advanced hydraulic press technology ensuring consistent quality, perfect dimensions, and superior strength in every block.',
    badge: 'ISO Quality Standards',
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark-900">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(234, 88, 12, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(249, 115, 22, 0.08) 0%, transparent 50%),
              linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)
            `,
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Diagonal lines */}
        <div
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(249, 115, 22, 0.03) 10px,
              rgba(249, 115, 22, 0.03) 11px
            )`,
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-orange-500/10"
            style={{
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${currentSlide}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/30 px-4 py-2 rounded-sm mb-6"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-orange-400 text-xs font-semibold uppercase tracking-widest" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {slide.badge}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`subtitle-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-orange-500 text-sm uppercase tracking-widest font-semibold mb-4"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                {slide.subtitle}
              </motion.p>
            </AnimatePresence>

            {/* Main Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase leading-tight mb-2 text-shadow-lg" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {slide.title}
                </h1>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight mb-6 text-shadow-lg" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  <span className="text-gradient">{slide.highlight}</span>
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg"
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="tel:+919054839964"
                className="btn-primary flex items-center space-x-2 group"
              >
                <svg className="w-4 h-4 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Call Now</span>
              </a>
              <Link to="/products" className="btn-secondary flex items-center space-x-2">
                <span>View Products</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-dark-700"
            >
              {[
                { value: '4.9★', label: 'Justdial Rating' },
                { value: '30+', label: 'Client Reviews' },
                { value: '6+', label: 'Products' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            {/* Main visual card with realistic paver block design */}
            <div className="relative">
              {/* Decorative industrial frame */}
              <div className="absolute -top-6 -right-6 w-full h-full border-2 border-orange-500/30 rounded-sm" />
              <div className="absolute -top-3 -right-3 w-full h-full border border-orange-500/15 rounded-sm" />

              {/* Main showcase container */}
              <div className="relative bg-gradient-to-br from-dark-800 to-dark-900 rounded-sm overflow-hidden aspect-[4/3] border-2 border-dark-600 shadow-2xl">
                {/* Concrete texture background */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        0deg,
                        rgba(255, 255, 255, 0.03) 0px,
                        rgba(255, 255, 255, 0.03) 2px,
                        transparent 2px,
                        transparent 4px
                      ),
                      repeating-linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0.03) 0px,
                        rgba(255, 255, 255, 0.03) 2px,
                        transparent 2px,
                        transparent 4px
                      )
                    `,
                  }}
                />

                {/* Premium logo showcase */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {/* Logo with premium styling */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 100 }}
                    className="relative mb-8"
                  >
                    {/* Glow effect behind logo */}
                    <div className="absolute inset-0 blur-2xl bg-orange-500/10 scale-150" />
                    <div className="relative p-2">
                      <Logo size="xl" variant="full" />
                    </div>
                  </motion.div>

                  {/* Realistic Interlocking Paver Block Pattern */}
                  <div className="w-full max-w-md">
                    {/* I-Shape Paver Pattern (Realistic Layout) */}
                    <div className="grid grid-cols-12 gap-1 mb-1">
                      {/* Row 1: I-Shape pattern */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.4 }}
                        className="col-span-3 h-12 rounded-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.95, duration: 0.4 }}
                        className="col-span-3 h-12 rounded-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #4b5563 0%, #374151 100%)',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.4 }}
                        className="col-span-3 h-12 rounded-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.05, duration: 0.4 }}
                        className="col-span-3 h-12 rounded-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                      />
                    </div>

                    {/* Row 2: Offset pattern (Zig-Zag style) */}
                    <div className="grid grid-cols-12 gap-1 mb-1">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.4 }}
                        className="col-span-2 h-12 rounded-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.15, duration: 0.4 }}
                        className="col-span-4 h-12 rounded-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.4 }}
                        className="col-span-4 h-12 rounded-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #4b5563 0%, #374151 100%)',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.25, duration: 0.4 }}
                        className="col-span-2 h-12 rounded-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                      />
                    </div>

                    {/* Row 3: Rectangular pattern */}
                    <div className="grid grid-cols-12 gap-1 mb-1">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 0.4 }}
                        className="col-span-4 h-12 rounded-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #4b5563 0%, #374151 100%)',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.35, duration: 0.4 }}
                        className="col-span-4 h-12 rounded-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.4 }}
                        className="col-span-4 h-12 rounded-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                      />
                    </div>

                    {/* Row 4: Mixed pattern */}
                    <div className="grid grid-cols-12 gap-1">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.45, duration: 0.4 }}
                        className="col-span-3 h-12 rounded-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.4 }}
                        className="col-span-6 h-12 rounded-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #4b5563 0%, #374151 100%)',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.55, duration: 0.4 }}
                        className="col-span-3 h-12 rounded-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Industrial label overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-500 text-sm font-bold uppercase tracking-widest mb-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        Premium Paver Blocks
                      </p>
                      <p className="text-gray-400 text-xs">
                        Est. 2024 • Latur MIDC, Maharashtra
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-2xl font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
                        4.9★
                      </p>
                      <p className="text-gray-500 text-xs">Justdial Rating</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating quality badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-6 top-12 bg-gradient-to-br from-orange-600 to-orange-700 border-2 border-orange-400 rounded-lg p-4 shadow-2xl"
                style={{
                  boxShadow: '0 0 30px rgba(234, 88, 12, 0.4)',
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-base font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      Quality
                    </p>
                    <p className="text-orange-100 text-xs font-semibold">Assured</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating delivery badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-6 bottom-20 bg-gradient-to-br from-dark-700 to-dark-800 border-2 border-orange-500/40 rounded-lg p-4 shadow-2xl"
                style={{
                  boxShadow: '0 0 25px rgba(234, 88, 12, 0.3)',
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-base font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      Fast Delivery
                    </p>
                    <p className="text-gray-400 text-xs font-semibold">Pan Maharashtra</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${index === currentSlide
                ? 'w-8 h-2 bg-orange-500'
                : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center space-y-2 text-gray-600"
      >
        <span className="text-xs uppercase tracking-widest rotate-90 mb-4">Scroll</span>
        <div className="w-0.5 h-12 bg-gradient-to-b from-orange-500 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
