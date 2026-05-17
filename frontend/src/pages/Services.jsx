import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';
import SectionHeader from '../components/common/SectionHeader';

const services = [
  {
    id: 1,
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Paver Block Installation',
    subtitle: 'Professional Installation Services',
    description:
      'Our expert installation team ensures your paver blocks are laid perfectly with proper base preparation, leveling, and finishing. We handle projects of all sizes — from residential driveways to large commercial complexes.',
    features: [
      'Site assessment and planning',
      'Sub-base preparation and compaction',
      'Precision block laying and leveling',
      'Edge restraint installation',
      'Joint filling and sealing',
      'Post-installation inspection',
    ],
    applications: ['Driveways', 'Footpaths', 'Parking Areas', 'Commercial Plazas', 'Industrial Floors'],
    color: '#ea580c',
  },
  {
    id: 2,
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: 'Bulk Supply',
    subtitle: 'Large Volume Orders',
    description:
      'We specialize in bulk supply of paver blocks for large-scale projects. With a daily production capacity of 50,000+ blocks, we can fulfill even the most demanding orders on schedule. Special pricing available for bulk orders.',
    features: [
      'Minimum order: 500 blocks',
      'Bulk discount pricing',
      'Priority production scheduling',
      'Quality certificate with each batch',
      'Flexible payment terms',
      'Dedicated account manager',
    ],
    applications: ['Municipal Projects', 'Real Estate Developers', 'Government Contracts', 'Large Contractors'],
    color: '#374151',
  },
  {
    id: 3,
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    title: 'Transportation',
    subtitle: 'Pan-Maharashtra Delivery',
    description:
      'Our dedicated logistics fleet ensures safe and timely delivery of paver blocks across Maharashtra. We have experience delivering to remote locations and can coordinate with your project schedule for just-in-time delivery.',
    features: [
      'Dedicated delivery fleet',
      'Pan-Maharashtra coverage',
      'GPS-tracked vehicles',
      'Safe loading and unloading',
      'On-time delivery guarantee',
      'Delivery scheduling flexibility',
    ],
    applications: ['Latur District', 'Osmanabad', 'Nanded', 'Solapur', 'Pune', 'All Maharashtra'],
    color: '#1e3a5f',
  },
  {
    id: 4,
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Custom Design Solutions',
    subtitle: 'Bespoke Paving Designs',
    description:
      'Have a unique vision for your project? Our design team works with you to create custom paving patterns, color combinations, and layouts. We can manufacture blocks in custom sizes and colors to match your specific requirements.',
    features: [
      'Custom color mixing',
      'Unique pattern design',
      'Logo and branding integration',
      'Custom size manufacturing',
      'Design consultation',
      '3D layout visualization',
    ],
    applications: ['Theme Parks', 'Corporate Campuses', 'Luxury Residences', 'Heritage Projects', 'Branded Spaces'],
    color: '#7c3aed',
  },
];

const processSteps = [
  { step: '01', title: 'Inquiry & Consultation', desc: 'Contact us with your project requirements. Our team will assess your needs and provide expert recommendations.' },
  { step: '02', title: 'Site Visit & Measurement', desc: 'Our team visits your site to take accurate measurements and assess ground conditions for proper planning.' },
  { step: '03', title: 'Quotation & Approval', desc: 'We provide a detailed quotation with product specifications, quantities, and pricing. No hidden charges.' },
  { step: '04', title: 'Production & Quality Check', desc: 'Your order goes into production with strict quality control at every stage of manufacturing.' },
  { step: '05', title: 'Delivery & Installation', desc: 'Timely delivery to your site followed by professional installation by our expert team.' },
  { step: '06', title: 'Post-Service Support', desc: 'We stand behind our work. Our team is available for any post-installation queries or support.' },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services - Kartik Paver Industries | Installation, Supply & Transport</title>
        <meta
          name="description"
          content="Kartik Paver Industries offers paver block installation, bulk supply, pan-Maharashtra transportation, and custom design solutions. Professional service from Latur MIDC."
        />
      </Helmet>

      <PageBanner title="Our Services" subtitle="What We Offer" breadcrumbs={[{ name: 'Services' }]} />

      {/* Services Grid */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <SectionHeader
            subtitle="Services"
            title="Complete Paving Solutions"
            description="From manufacturing to installation, we provide end-to-end paving solutions for every type of project across Maharashtra."
          />

          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div
                    className="w-16 h-16 rounded-sm flex items-center justify-center mb-5"
                    style={{ backgroundColor: service.color + '22', border: `1px solid ${service.color}44`, color: service.color }}
                  >
                    {service.icon}
                  </div>
                  <p className="text-orange-500 text-xs uppercase tracking-widest font-semibold mb-2">{service.subtitle}</p>
                  <h2 className="text-white text-3xl font-bold uppercase mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    {service.title}
                  </h2>
                  <div className="w-12 h-0.5 bg-orange-500 mb-5" />
                  <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {service.features.map((f) => (
                      <div key={f} className="flex items-center space-x-2 text-gray-300 text-sm">
                        <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {service.applications.map((app) => (
                      <span key={app} className="text-xs bg-dark-700 border border-dark-600 text-gray-400 px-3 py-1 rounded-sm">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual Card */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div
                    className="rounded-sm p-8 border relative overflow-hidden aspect-[4/3] flex items-center justify-center"
                    style={{ backgroundColor: service.color + '11', borderColor: service.color + '33' }}
                  >
                    {/* Background pattern */}
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `linear-gradient(rgba(249,115,22,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.5) 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                      }}
                    />
                    <div className="relative z-10 text-center">
                      <div className="text-8xl mb-4" style={{ color: service.color }}>
                        {service.icon}
                      </div>
                      <h3 className="text-white text-2xl font-bold uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
                        {service.title}
                      </h3>
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {service.applications.slice(0, 3).map((app) => (
                          <span key={app} className="text-xs px-2 py-1 rounded-sm" style={{ backgroundColor: service.color + '33', color: service.color }}>
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom">
          <SectionHeader
            subtitle="How We Work"
            title="Our Service Process"
            description="A simple, transparent process from inquiry to project completion."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group card-industrial p-6 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-orange-500/10 group-hover:text-orange-500/20 transition-colors" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {step.step}
                </div>
                <div className="w-10 h-10 bg-orange-500 rounded-sm flex items-center justify-center text-white font-bold text-sm mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {step.step}
                </div>
                <h3 className="text-white text-lg font-bold uppercase mb-3 group-hover:text-orange-400 transition-colors" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="section-subtitle">Our Commitment</p>
              <h2 className="section-title mb-4">
                Service You Can<br />
                <span className="text-gradient">Count On</span>
              </h2>
              <div className="orange-line" />
              <p className="text-gray-400 leading-relaxed mb-8">
                At Kartik Paver Industries, we don't just sell paver blocks — we deliver complete paving solutions. 
                Our team of experienced professionals ensures every project is completed to the highest standards, 
                on time and within budget.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '🏆', title: 'Verified Manufacturer', desc: 'Justdial verified manufacturer with 4.9★ rating and 30+ positive client suggestions from Latur & Marathwada' },
                  { icon: '✅', title: 'Quality Guarantee', desc: 'All products meet IS 15658 standards with lab-tested quality certificates. GSTIN: 27ABCFK5217C1ZP' },
                  { icon: '🚛', title: 'Pan-Maharashtra Reach', desc: 'Delivery and installation services across all major cities in Maharashtra' },
                  { icon: '💰', title: 'Competitive Pricing', desc: 'Direct factory pricing with no middlemen — best value for your money. UPI & Cash accepted' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start space-x-4">
                    <div className="text-2xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="text-white font-semibold mb-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-dark-800 border border-orange-500/20 rounded-sm p-8"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
              <h3 className="text-white text-2xl font-bold uppercase mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Get a Free Quote
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Call Us', value: '+91 90548 39964', href: 'tel:+919054839964', icon: '📞' },
                  { label: 'WhatsApp', value: 'Chat with Us', href: 'https://wa.me/918484946890', icon: '💬' },
                  { label: 'Email', value: 'kartikpaverindustries@gmail.com', href: 'mailto:kartikpaverindustries@gmail.com', icon: '📧' },
                  { label: 'Visit Us', value: 'Plot No C10, Near Atul Metal, 1 No MIDC, Latur - 413531', href: null, icon: '📍' },
                ].map((contact) => (
                  <div key={contact.label} className="flex items-center space-x-4 p-4 bg-dark-900 border border-dark-600 rounded-sm hover:border-orange-500/40 transition-colors duration-300">
                    <span className="text-2xl">{contact.icon}</span>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">{contact.label}</p>
                      {contact.href ? (
                        <a href={contact.href} className="text-white font-semibold hover:text-orange-400 transition-colors">
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-white text-sm">{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary w-full text-center block mt-6">
                Send Detailed Inquiry
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
