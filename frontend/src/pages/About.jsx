import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageBanner from '../components/common/PageBanner';
import SectionHeader from '../components/common/SectionHeader';
import Logo from '../components/common/Logo';

const milestones = [
  { year: '2024', title: 'Company Founded', desc: 'Kartik Paver Industries established at Latur MIDC (Plot No C10, Near Atul Metal, 1 No MIDC) with a vision to provide premium quality paver blocks to Maharashtra.' },
  { year: '2024', title: 'Justdial Listed & Verified', desc: 'Listed and verified on Justdial as a Manufacturer with 4.9★ rating and 30+ positive suggestions from clients across Latur and Marathwada region.' },
  { year: '2025', title: 'Product Range Expansion', desc: 'Expanded product range to include Color Paver Blocks, Grass Paver Blocks, Kerb Stones, and Hollow Clay Bricks to cater to diverse construction needs.' },
  { year: '2025', title: 'Growing Client Base', desc: 'Serving contractors, builders, real estate developers, and municipalities across Latur, Osmanabad, Nanded, and Solapur districts.' },
  { year: '2025', title: 'Turnover Milestone', desc: 'Achieved annual turnover of 51 Lakh - 1 Crore with a dedicated team of 10-100 employees at the Latur MIDC manufacturing facility.' },
  { year: '2026', title: 'Pan-Maharashtra Reach', desc: 'Expanding delivery network to cover all major cities in Maharashtra with dedicated logistics support and bulk supply capabilities.' },
];

const team = [
  { name: 'Kartik Patil', role: 'Founder & Managing Director', exp: '2024 Est.' },
  { name: 'Sunil Patil', role: 'Production Manager', exp: '12+ Years' },
  { name: 'Ramesh Kulkarni', role: 'Quality Control Head', exp: '10+ Years' },
  { name: 'Priya Deshmukh', role: 'Sales & Marketing', exp: '8+ Years' },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Kartik Paver Industries | Paver Block Manufacturer Latur</title>
        <meta name="description" content="Learn about Kartik Paver Industries - 2024 Est. of manufacturing excellence in Latur, Maharashtra. Premium paver block manufacturer with modern machinery and quality commitment." />
      </Helmet>

      <PageBanner
        title="About Us"
        subtitle="Our Story"
        breadcrumbs={[{ name: 'About Us' }]}
      />

      {/* Company Introduction */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="section-subtitle">Who We Are</p>
              <h2 className="section-title mb-4">
                Maharashtra's Trusted<br />
                <span className="text-gradient">Paver Block Manufacturer</span>
              </h2>
              <div className="orange-line" />
              <p className="text-gray-400 leading-relaxed mb-6">
                Kartik Paver Industries is a manufacturer and dealer of premium quality paver blocks,
                kerb stones, hollow clay bricks, and concrete products based at Plot No C10, Near Atul Metal,
                1 No MIDC, Latur - 413531, Maharashtra. Established in 2024, we are a verified and
                claimed business on Justdial with a 4.9★ rating and 30+ positive client suggestions.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Our manufacturing facility at Latur MIDC is equipped with modern hydraulic press machines,
                concrete mixing systems, and quality testing processes. We manufacture I Shape Paver Blocks,
                Zig Zag Paver Blocks, Rectangular Paver Blocks, Grass Paver Blocks, Kerb Stones, Color Paver
                Blocks, and Hollow Clay Bricks in various sizes and specifications.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                We serve contractors, builders, real estate developers, municipalities, and individual
                customers across Maharashtra. Our GSTIN is 27ABCFK5217C1ZP. We accept UPI and Cash payments.
                Annual turnover: 51 Lakh - 1 Crore with a team of 10-100 dedicated employees.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '4.9★', label: 'Justdial Rating' },
                  { value: '50+', label: 'Customer Reviews' },
                  { value: '10-100', label: 'Team Members' },
                  { value: '6+', label: 'Product Varieties' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-dark-800 border border-dark-600 p-4 rounded-sm">
                    <div className="text-3xl font-bold text-orange-500 mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      {stat.value}
                    </div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Visual representation */}
              <div className="bg-dark-800 border border-dark-600 rounded-sm overflow-hidden aspect-square relative">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      repeating-linear-gradient(0deg, rgba(249,115,22,0.04) 0px, rgba(249,115,22,0.04) 1px, transparent 1px, transparent 40px),
                      repeating-linear-gradient(90deg, rgba(249,115,22,0.04) 0px, rgba(249,115,22,0.04) 1px, transparent 1px, transparent 40px),
                      linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)
                    `,
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  {/* Real Logo */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    className="flex justify-center mb-6"
                  >
                    <Logo size="lg" variant="full" />
                  </motion.div>
                  <p className="text-orange-500 text-sm uppercase tracking-widest mb-6">
                    Est. 2024 • Latur, Maharashtra
                  </p>
                  <div className="w-16 h-0.5 bg-orange-500 mb-6" />
                  <p className="text-gray-400 text-sm leading-relaxed">
                    "Building Maharashtra's infrastructure with premium quality paver blocks, one project at a time."
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-3 w-full">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-sm"
                        style={{
                          background: i % 3 === 0
                            ? 'linear-gradient(135deg, #ea580c, #c2410c)'
                            : i % 3 === 1
                            ? 'linear-gradient(135deg, #374151, #1f2937)'
                            : 'linear-gradient(135deg, #4b5563, #374151)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom">
          <SectionHeader subtitle="Our Purpose" title="Vision & Mission" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Our Vision',
                content: 'To be the most trusted and preferred paver block manufacturer in Maharashtra, known for uncompromising quality, innovation, and customer satisfaction. We envision a future where every road, pathway, and public space in Maharashtra is paved with Kartik Paver products.',
              },
              {
                icon: '🚀',
                title: 'Our Mission',
                content: 'To manufacture and deliver premium quality paver blocks and concrete products that exceed customer expectations in strength, durability, and aesthetics. We are committed to using the best raw materials, modern manufacturing processes, and maintaining the highest quality standards at competitive prices.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-dark-900 border border-dark-600 hover:border-orange-500/40 rounded-sm p-8 transition-colors duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-white text-2xl font-bold uppercase mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {item.title}
                </h3>
                <div className="w-10 h-0.5 bg-orange-500 mb-4" />
                <p className="text-gray-400 leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Details */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <SectionHeader
            subtitle="Manufacturing"
            title="Our Production Process"
            description="Every paver block goes through a rigorous 6-step manufacturing process to ensure consistent quality and maximum strength."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Raw Material Selection', desc: 'Premium grade cement (OPC 53), crushed stone aggregate, and clean river sand are carefully selected and tested before use.' },
              { step: '02', title: 'Precise Batching', desc: 'Computer-controlled batching plant ensures exact proportions of each material for consistent M-35 grade concrete mix.' },
              { step: '03', title: 'Hydraulic Pressing', desc: 'High-pressure hydraulic press machines compact the concrete mix into perfect block shapes with uniform density.' },
              { step: '04', title: 'Curing Process', desc: 'Blocks undergo a 28-day water curing process to achieve maximum compressive strength and durability.' },
              { step: '05', title: 'Quality Testing', desc: 'Each batch is tested for compressive strength, water absorption, and dimensional accuracy in our in-house lab.' },
              { step: '06', title: 'Dispatch & Delivery', desc: 'Approved blocks are carefully stacked, loaded, and dispatched with our dedicated logistics fleet across Maharashtra.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-industrial p-6 group"
              >
                <div className="text-5xl font-bold text-orange-500/20 mb-3 group-hover:text-orange-500/40 transition-colors" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {item.step}
                </div>
                <h3 className="text-white text-lg font-bold uppercase mb-3 group-hover:text-orange-400 transition-colors" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom">
          <SectionHeader subtitle="Our Journey" title="Company Milestones" />
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-dark-600 transform md:-translate-x-1/2" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-start md:items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-8`}
                >
                  {/* Content */}
                  <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-dark-900 border border-dark-600 hover:border-orange-500/40 rounded-sm p-5 transition-colors duration-300">
                      <span className="text-orange-500 text-sm font-bold uppercase tracking-wider" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        {milestone.year}
                      </span>
                      <h3 className="text-white font-bold text-lg mt-1 mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                        {milestone.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{milestone.desc}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-orange-500 rounded-full border-2 border-dark-800 transform md:-translate-x-1/2 mt-5 md:mt-0 flex-shrink-0" />

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="bg-dark-800 border border-orange-500/20 rounded-sm p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-subtitle">Our Promise</p>
              <h2 className="section-title mb-4">Quality Commitment</h2>
              <div className="w-16 h-1 bg-orange-500 mx-auto mb-6" />
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed text-lg mb-8">
                At Kartik Paver Industries, quality is not just a standard — it's our identity. 
                Every paver block we manufacture is a testament to our commitment to excellence. 
                We use only the finest raw materials, maintain strict quality control at every 
                production stage, and stand behind every product we deliver.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {[
                  { icon: '✅', label: 'IS 15658 Compliant' },
                  { icon: '🏆', label: 'M-35 Grade Concrete' },
                  { icon: '🔬', label: 'Lab Tested' },
                  { icon: '📋', label: '28-Day Curing' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <p className="text-gray-300 text-sm font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
