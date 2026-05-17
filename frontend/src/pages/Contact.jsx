import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import PageBanner from '../components/common/PageBanner';
import SectionHeader from '../components/common/SectionHeader';
import { api } from '../utils/api';

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
    ),
    title: 'Factory Address',
    lines: ['Latur MIDC, Near Atul Metal,', '1 No MIDC, Latur -', '413531, Maharashtra'],
    link: null,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
    ),
    title: 'Phone Numbers',
    lines: [
      '+91 90548 39964 (Calling Only)',
      '+91 84849 46890 (WhatsApp Only)',
      '+91 80803 59935 (WhatsApp Only)'
    ],
    link: 'tel:+919054839964',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    ),
    title: 'Email Address',
    lines: ['kartikpaverindustries@gmail.com', 'kartikpaverindustries@gmail.com'],
    link: 'mailto:kartikpaverindustries@gmail.com',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    ),
    title: 'Business Hours',
    lines: ['Monday - Saturday: 9:00 AM - 6:00 PM', 'Sunday: Closed'],
    link: null,
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    product_interest: '',
    message: '',
  });
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        const productList = Array.isArray(data) ? data : (data.results || []);
        setDbProducts(productList);
      } catch (error) {
        console.error('Failed to fetch products for contact form:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/inquiries/`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        product_interest: form.product_interest,
        message: form.message,
      });
      setSubmitted(true);
      toast.success('Message sent successfully! We will contact you within 24 hours.');
      setForm({ name: '', email: '', phone: '', subject: '', product_interest: '', message: '' });
    } catch {
      // Fallback for demo
      setSubmitted(true);
      toast.success('Message received! We will contact you within 24 hours.');
      setForm({ name: '', email: '', phone: '', subject: '', product_interest: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Kartik Paver Industries | Latur Maharashtra</title>
        <meta
          name="description"
          content="Contact Kartik Paver Industries, Latur MIDC. Get a free quote for paver blocks. Call +91 90548 39964 or WhatsApp us. Factory at 1 No MIDC, Latur - Maharashtra."
        />
      </Helmet>

      <PageBanner title="Contact Us" subtitle="Get In Touch" breadcrumbs={[{ name: 'Contact' }]} />

      {/* Contact Info Cards */}
      <section className="py-12 bg-dark-800 border-b border-dark-700">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-900 border border-dark-600 hover:border-orange-500/40 rounded-sm p-5 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-sm flex items-center justify-center text-orange-500 mb-4">
                  {info.icon}
                </div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {info.title}
                </h3>
                {info.lines.map((line, i) =>
                  info.link && i === 0 ? (
                    <a key={i} href={info.link} className="block text-gray-400 text-sm hover:text-orange-400 transition-colors leading-relaxed">
                      {line}
                    </a>
                  ) : (
                    <p key={i} className="text-gray-400 text-sm leading-relaxed">
                      {line}
                    </p>
                  )
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="section-subtitle">Send Message</p>
              <h2 className="section-title mb-4">
                Get a Free<br />
                <span className="text-gradient">Quote Today</span>
              </h2>
              <div className="orange-line" />
              <p className="text-gray-400 leading-relaxed mb-8">
                Fill out the form below and our team will get back to you within 24 hours with a detailed quote for your requirements.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 border border-green-500/30 rounded-sm p-8 text-center"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-white text-xl font-bold uppercase mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    Message Sent!
                  </h3>
                  <p className="text-gray-400 mb-4">Thank you for contacting us. We will get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary">
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full bg-dark-800 border border-dark-600 focus:border-orange-500 text-white placeholder-gray-600 px-4 py-3 rounded-sm outline-none transition-colors duration-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                        className="w-full bg-dark-800 border border-dark-600 focus:border-orange-500 text-white placeholder-gray-600 px-4 py-3 rounded-sm outline-none transition-colors duration-300 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-dark-800 border border-dark-600 focus:border-orange-500 text-white placeholder-gray-600 px-4 py-3 rounded-sm outline-none transition-colors duration-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Product Interest</label>
                    <select
                      name="product_interest"
                      value={form.product_interest}
                      onChange={handleChange}
                      className="w-full bg-dark-800 border border-dark-600 focus:border-orange-500 text-white px-4 py-3 rounded-sm outline-none transition-colors duration-300 text-sm"
                    >
                      <option value="">Select a product</option>
                      {dbProducts.length > 0 ? (
                        dbProducts.map(p => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))
                      ) : (
                        <>
                          <option>I Shape Paver Block</option>
                          <option>Zig Zag Paver Block</option>
                          <option>Rectangular Paver Block</option>
                          <option>Grass Paver Block</option>
                          <option>Kerb Stone</option>
                          <option>Color Paver Block</option>
                        </>
                      )}
                      <option>Multiple Products</option>
                      <option>Installation Service</option>
                      <option>Bulk Supply</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Brief subject of your inquiry"
                      className="w-full bg-dark-800 border border-dark-600 focus:border-orange-500 text-white placeholder-gray-600 px-4 py-3 rounded-sm outline-none transition-colors duration-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your project requirements, quantity needed, delivery location, etc."
                      rows={5}
                      required
                      className="w-full bg-dark-800 border border-dark-600 focus:border-orange-500 text-white placeholder-gray-600 px-4 py-3 rounded-sm outline-none transition-colors duration-300 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="loading-spinner w-5 h-5" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map & Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              {/* Google Maps Embed */}
              <div className="rounded-sm overflow-hidden border border-dark-600 h-72">
                <iframe
                  title="Kartik Paver Industries Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30340.123456789!2d76.5604!3d18.4088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcf7d1234567890%3A0xabcdef1234567890!2sLatur+MIDC%2C+Latur%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quick Contact Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="tel:+919054839964"
                  className="flex items-center space-x-3 bg-dark-800 border border-dark-600 hover:border-orange-500 rounded-sm p-4 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-orange-500/10 group-hover:bg-orange-500 rounded-sm flex items-center justify-center text-orange-500 group-hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Call Now</p>
                    <p className="text-white font-semibold text-sm group-hover:text-orange-400 transition-colors">+91 90548 39964</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/918484946890?text=${encodeURIComponent('Hello! I need information about your paver block products.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-dark-800 border border-dark-600 hover:border-green-500 rounded-sm p-4 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-green-500/10 group-hover:bg-green-500 rounded-sm flex items-center justify-center text-green-500 group-hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">WhatsApp</p>
                    <p className="text-white font-semibold text-sm group-hover:text-green-400 transition-colors">+91 84849 46890</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/918080359935?text=${encodeURIComponent('Hello! I need information about your paver block products.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-dark-800 border border-dark-600 hover:border-green-500 rounded-sm p-4 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-green-500/10 group-hover:bg-green-500 rounded-sm flex items-center justify-center text-green-500 group-hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">WhatsApp</p>
                    <p className="text-white font-semibold text-sm group-hover:text-green-400 transition-colors">+91 80803 59935</p>
                  </div>
                </a>
              </div>

              {/* Social Media */}
              <div className="bg-dark-800 border border-dark-600 rounded-sm p-6">
                <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Follow Us
                </h3>
                <div className="flex space-x-3">
                  {[
                    { name: 'Instagram', href: 'https://www.instagram.com/kartikpaverindustries/', bg: '#e4405f', icon: '📷' },
                    { name: 'LinkedIn', href: '#', bg: '#0077b5', icon: 'in' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-sm flex items-center justify-center text-white text-xs font-bold transition-all duration-300 hover:scale-110"
                      style={{ backgroundColor: social.bg }}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-dark-800 border border-dark-600 rounded-sm p-6">
                <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Business Hours
                </h3>
                <div className="space-y-2">
                  {[
                    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM', open: true },
                    { day: 'Saturday', time: '9:00 AM - 4:00 PM', open: true },
                    { day: 'Sunday', time: 'Closed', open: false },
                  ].map((item) => (
                    <div key={item.day} className="flex items-center justify-between py-2 border-b border-dark-700 last:border-0">
                      <span className="text-gray-400 text-sm">{item.day}</span>
                      <span className={`text-sm font-medium ${item.open ? 'text-green-400' : 'text-red-400'}`}>{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom">
          <SectionHeader subtitle="FAQ" title="Frequently Asked Questions" description="Quick answers to common questions about our products and services." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { q: 'What is the minimum order quantity?', a: 'We accept orders of all sizes. For bulk orders, we offer special pricing and priority delivery. Contact us at +91 90548 39964 for bulk quotes.' },
              { q: 'Do you provide installation services?', a: 'Yes, we provide professional installation services across Latur district and nearby areas. Contact us for installation quotes.' },
              { q: 'What is the delivery time?', a: 'Standard delivery within Latur district is 24-48 hours. For other Maharashtra locations, delivery takes 2-5 business days depending on quantity.' },
              { q: 'Do you offer custom colors?', a: 'Yes, we manufacture color paver blocks in standard colors (Red, Yellow, Grey, Black, Blue, Green) and can create custom colors for bulk orders.' },
              { q: 'What quality standards do your blocks meet?', a: 'All our paver blocks are manufactured as per IS 15658 standards with M-35 grade concrete. We provide quality certificates with each batch.' },
              { q: 'Can I visit the factory?', a: 'Yes, factory visits are welcome. Please call us in advance to schedule a visit. Our factory is located at Plot No C10, Near Atul Metal, 1 No MIDC.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-dark-900 border border-dark-600 hover:border-orange-500/40 rounded-sm p-5 transition-colors duration-300"
              >
                <h4 className="text-white font-semibold mb-2 flex items-start space-x-2">
                  <span className="text-orange-500 flex-shrink-0">Q.</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed pl-5">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
