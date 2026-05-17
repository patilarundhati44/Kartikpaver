import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';

const testimonials = [
  {
    id: 1,
    name: 'Pratap Pawar',
    role: 'Satisfied Customer',
    location: 'Latur',
    rating: 5,
    review: 'I had a great experience with Kartik Paver Industries. The products are of good quality. They offer many options, and I found what I needed easily. The service was excellent and delivery was on time.',
    project: 'Residential Project, Latur',
  },
  {
    id: 2,
    name: 'Ajinkya',
    role: 'Regular Customer',
    location: 'Latur',
    rating: 5,
    review: 'High quality products, durable, experienced staff, polite professional, timely delivery, reliable delivery partner, reasonably priced with discounts available. I had a great experience with Kartik Paver Industries!',
    project: 'Commercial Project, Latur',
  },
  {
    id: 3,
    name: 'VITTHAL',
    role: 'Satisfied Customer',
    location: 'Latur',
    rating: 5,
    review: 'Customizable products, timely delivery, reliable delivery partner, good quality. I had a great experience with Kartik Paver Industries! Their products are of excellent quality and very durable.',
    project: 'Residential Project, Latur',
  },
  {
    id: 4,
    name: 'Rushi Patil',
    role: 'Happy Customer',
    location: 'Latur',
    rating: 5,
    review: 'Timely delivery, reasonably priced, good quality. I am very happy with Kartik Paver Industries! Their products are of good quality and look great. The prices are reasonable, which makes them a great choice.',
    project: 'Home Construction, Latur',
  },
  {
    id: 5,
    name: 'Sharad Patil',
    role: 'Satisfied Customer',
    location: 'Latur',
    rating: 5,
    review: 'Timely delivery, good quality. I had a great experience with Kartik Paver Industries. They delivered my products on time, which was very important to me. The quality of the products is excellent.',
    project: 'Commercial Project, Latur',
  },
  {
    id: 6,
    name: 'Arati Angadi',
    role: 'Regular Customer',
    location: 'Latur',
    rating: 5,
    review: 'Customizable products, timely delivery, reliable delivery partner, good quality. Kartik Paver Industries is excellent! Their products are of good quality and very strong. I always get my orders on time.',
    project: 'Residential Project, Latur',
  },
  {
    id: 7,
    name: 'Sagr',
    role: 'Satisfied Customer',
    location: 'Latur',
    rating: 5,
    review: 'High quality products, environment-friendly, experienced staff, polite professional, timely delivery, good quality. Kartik Paver Industries truly stands out in the market with its high-quality products.',
    project: 'Eco-friendly Project, Latur',
  },
  {
    id: 8,
    name: 'SAINATH',
    role: 'Happy Customer',
    location: 'Latur',
    rating: 5,
    review: 'High quality products. Kartik Paver Industries truly stands out in the market with its exceptional range of high-quality products. Their pavers are not only aesthetically pleasing but also extremely durable.',
    project: 'Commercial Complex, Latur',
  },
  {
    id: 9,
    name: 'Akash Jadhav',
    role: 'Eco-conscious Customer',
    location: 'Latur',
    rating: 5,
    review: 'High quality products, environment-friendly, experienced staff, good quality. Kartik Paver Industries makes great products! They care about the environment and use eco-friendly materials in their manufacturing.',
    project: 'Green Building Project, Latur',
  },
  {
    id: 10,
    name: 'Shekhar Mali',
    role: 'Satisfied Customer',
    location: 'Latur',
    rating: 5,
    review: 'Polite professional staff, discounts available, refund available, good quality. My experience with Kartik Paver Industries was excellent. The products were of good quality, which made me very satisfied.',
    project: 'Residential Project, Latur',
  },
];

const StarRating = ({ rating }) => (
  <div className="flex space-x-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-orange-500' : 'text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-dark-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom">
        <SectionHeader
          subtitle="Testimonials"
          title="Our Happy Customers"
          description="Trusted by contractors, builders, and developers across Maharashtra for premium quality paver blocks."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-dark-800 border border-dark-600 rounded-sm p-8 md:p-10 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-8 text-orange-500/20 text-8xl font-serif leading-none select-none">
                "
              </div>

              <StarRating rating={testimonials[activeIndex].rating} />

              <p className="text-gray-300 text-lg leading-relaxed mt-4 mb-6 relative z-10">
                "{testimonials[activeIndex].review}"
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-sm flex items-center justify-center text-white font-bold text-lg" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    {testimonials[activeIndex].name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {testimonials[activeIndex].name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {testimonials[activeIndex].role} • {testimonials[activeIndex].location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-xs uppercase tracking-wider">Project</p>
                  <p className="text-orange-500 text-sm font-medium">{testimonials[activeIndex].project}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 bg-dark-700 hover:bg-orange-500 border border-dark-600 hover:border-orange-500 rounded-sm flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex ? 'w-8 h-2 bg-orange-500' : 'w-2 h-2 bg-dark-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 bg-dark-700 hover:bg-orange-500 border border-dark-600 hover:border-orange-500 rounded-sm flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mini cards */}
          <div className="grid grid-cols-5 gap-3 mt-8 hidden md:grid">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(i)}
                className={`p-3 rounded-sm border text-left transition-all duration-300 ${
                  i === activeIndex
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-dark-600 bg-dark-800 hover:border-dark-500'
                }`}
              >
                <div className="w-6 h-6 bg-orange-500/20 rounded-sm flex items-center justify-center text-orange-500 text-xs font-bold mb-2">
                  {t.name.charAt(0)}
                </div>
                <p className="text-white text-xs font-medium truncate">{t.name}</p>
                <p className="text-gray-500 text-xs truncate">{t.location}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
