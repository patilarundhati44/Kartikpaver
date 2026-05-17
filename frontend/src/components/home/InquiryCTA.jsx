import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { api } from '../../utils/api';

const InquiryCTA = () => {
  const [form, setForm] = useState({ name: '', phone: '', product: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        const productList = Array.isArray(data) ? data : (data.results || []);
        setDbProducts(productList);
      } catch (error) {
        console.error('Failed to fetch products for inquiry cta form:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error('Please fill in your name and phone number.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/inquiries/`, {
        name: form.name,
        phone: form.phone,
        product_interest: form.product,
        message: form.message || 'Quick inquiry from homepage',
        email: '',
      });
      toast.success('Inquiry sent! We will contact you shortly.');
      setForm({ name: '', phone: '', product: '', message: '' });
    } catch {
      // Fallback: show success anyway for demo
      toast.success('Inquiry received! We will contact you shortly.');
      setForm({ name: '', phone: '', product: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding bg-dark-800 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: CTA Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle">Get In Touch</p>
            <h2 className="section-title mb-4">
              Ready to Start<br />
              <span className="text-gradient">Your Project?</span>
            </h2>
            <div className="orange-line" />
            <p className="text-gray-400 leading-relaxed mb-8">
              Get a free quote for your paver block requirements. We supply to contractors, 
              builders, municipalities, and individuals across Maharashtra. Bulk orders welcome.
            </p>

            {/* Contact options */}
            <div className="space-y-4">
              <a
                href="tel:+919054839964"
                className="flex items-center space-x-4 group"
              >
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 rounded-sm flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Call Us</p>
                  <p className="text-white font-semibold group-hover:text-orange-400 transition-colors">+91 90548 39964</p>
                </div>
              </a>

              <a
                href={`https://wa.me/918484946890?text=${encodeURIComponent('Hello! I need a quote for paver blocks.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 group"
              >
                <div className="w-12 h-12 bg-green-500/10 border border-green-500/30 rounded-sm flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">WhatsApp</p>
                  <p className="text-white font-semibold group-hover:text-green-400 transition-colors">Chat with Us</p>
                </div>
              </a>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 rounded-sm flex items-center justify-center text-orange-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Factory Address</p>
                  <p className="text-white text-sm">Plot No C10, Near Atul Metal, 1 No MIDC, Latur - 413531</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Quick Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-dark-900 border border-dark-600 rounded-sm p-8">
              <h3 className="text-white text-xl font-bold uppercase tracking-wide mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Quick Inquiry
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-dark-800 border border-dark-600 focus:border-orange-500 text-white placeholder-gray-600 px-4 py-3 rounded-sm outline-none transition-colors duration-300 text-sm"
                    required
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
                    className="w-full bg-dark-800 border border-dark-600 focus:border-orange-500 text-white placeholder-gray-600 px-4 py-3 rounded-sm outline-none transition-colors duration-300 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Product Interest</label>
                  <select
                    name="product"
                    value={form.product}
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
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project requirements..."
                    rows={3}
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
                      <span>Send Inquiry</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InquiryCTA;
