import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'High Strength',
    description: 'Our paver blocks are manufactured with M-35 grade concrete mix, ensuring compressive strength of 35 N/mm² — far exceeding industry standards.',
    stat: '35 N/mm²',
    statLabel: 'Compressive Strength',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Durable Quality',
    description: 'Engineered to withstand heavy traffic, extreme weather, and decades of use. Our blocks maintain their integrity and appearance for 25+ years.',
    stat: '25+ Years',
    statLabel: 'Lifespan Guarantee',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Affordable Pricing',
    description: 'Direct manufacturer pricing with no middlemen. Get premium quality paver blocks at competitive rates with bulk order discounts available.',
    stat: 'Best Price',
    statLabel: 'Direct from Factory',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Timely Delivery',
    description: 'Our dedicated logistics network ensures on-time delivery across Maharashtra. We respect your project timelines and deliver as promised.',
    stat: '48 Hours',
    statLabel: 'Average Delivery',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Modern Manufacturing',
    description: 'State-of-the-art hydraulic press machines and automated mixing systems ensure consistent quality in every batch produced at our Latur MIDC facility.',
    stat: 'Automated',
    statLabel: 'Production Line',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Trusted Service',
    description: 'Rated 4.9★ on Justdial with 30+ positive client suggestions. Our verified business at Latur MIDC serves contractors, builders, and municipalities across Marathwada with complete satisfaction.',
    stat: '4.9★',
    statLabel: 'Justdial Rating',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <SectionHeader
          subtitle="Why Choose Us"
          title="The Kartik Paver Advantage"
          description="We combine modern manufacturing technology with decades of expertise to deliver paver blocks that exceed expectations in quality, durability, and value."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group card-industrial p-6 cursor-default"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-sm flex items-center justify-center text-orange-500 mb-5 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-white text-xl font-bold uppercase tracking-wide mb-3 group-hover:text-orange-400 transition-colors duration-300" style={{ fontFamily: 'Oswald, sans-serif' }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Stat */}
              <div className="flex items-center space-x-3 pt-4 border-t border-dark-600">
                <div className="text-2xl font-bold text-orange-500" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {feature.stat}
                </div>
                <div className="text-gray-500 text-xs uppercase tracking-wider">
                  {feature.statLabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
