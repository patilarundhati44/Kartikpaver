import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import PageBanner from '../components/common/PageBanner';
import { api } from '../utils/api';

const CATEGORIES = ['All', 'Factory', 'Products', 'Projects'];

const GalleryCard = ({ item, onClick }) => {
  const imgSrc = item.image_src || item.image || item.image_url || null;
  const isVideo = item.video_url || item.video;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer overflow-hidden rounded-sm border border-dark-600 hover:border-orange-500/50 transition-all duration-300 bg-dark-800"
      onClick={() => onClick(item)}
    >
      {/* Visual */}
      <div className="relative aspect-[4/3] overflow-hidden bg-dark-900 flex items-center justify-center">
        {isVideo ? (
          <>
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900">
                <span className="text-5xl mb-2">🎥</span>
                <span className="text-orange-500 text-xs uppercase tracking-wider font-bold">{item.category}</span>
              </div>
            )}
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/20 transition-all duration-300">
              <div className="w-14 h-14 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        ) : imgSrc ? (
          <img
            src={imgSrc}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        {/* Fallback icon when no image */}
        {!isVideo && !imgSrc && (
          <div
            className="absolute inset-0 flex-col items-center justify-center"
            style={{ display: 'flex', background: 'linear-gradient(135deg, #ea580c22, #ea580c11)' }}
          >
            <div className="text-5xl mb-2">🖼️</div>
            <span className="text-orange-500 text-xs uppercase tracking-wider">{item.category}</span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-xs font-bold px-3 py-1 rounded-sm bg-dark-900/80 text-orange-400 border border-orange-500/30 backdrop-blur-sm uppercase tracking-wider">
            {item.category}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/60 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 text-white border border-white/30 px-4 py-2 rounded-sm bg-dark-900/50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            <span className="text-sm font-semibold">View</span>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="p-4">
        <h3 className="text-white text-sm font-bold uppercase tracking-wide group-hover:text-orange-400 transition-colors duration-300" style={{ fontFamily: 'Oswald, sans-serif' }}>
          {item.title}
        </h3>
        {item.description && (
          <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">{item.description}</p>
        )}
      </div>
    </motion.div>
  );
};

const LightboxModal = ({ item, onClose, onPrev, onNext }) => {
  if (!item) return null;
  const imgSrc = item.image_src || item.image || item.image_url || null;
  const isVideo = item.video_url || item.video;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-dark-800/80 hover:bg-orange-500 border border-dark-600 rounded-sm flex items-center justify-center text-white transition-all duration-300 z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-[4/3] rounded-sm overflow-hidden bg-dark-900 flex items-center justify-center relative">
          {isVideo ? (
            <video src={item.video_url || item.video} controls autoPlay className="w-full h-full object-contain" />
          ) : imgSrc ? (
            <img src={imgSrc} alt={item.title} className="w-full h-full object-contain" />
          ) : (
            <div className="text-8xl">🖼️</div>
          )}
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-white text-xl font-bold uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>{item.title}</h3>
          {item.description && <p className="text-gray-400 text-sm mt-1">{item.description}</p>}
          <span className="inline-block mt-2 text-xs px-3 py-1 bg-orange-500/20 text-orange-400 rounded-sm uppercase tracking-wider">{item.category}</span>
        </div>
      </motion.div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-dark-800/80 hover:bg-orange-500 border border-dark-600 rounded-sm flex items-center justify-center text-white transition-all duration-300 z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-dark-800/80 hover:bg-orange-500 border border-dark-600 rounded-sm flex items-center justify-center text-white transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getGallery();
      // Handle paginated response
      const items = Array.isArray(data) ? data : (data.results || []);
      setGalleryItems(items);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((i) => i.category === activeCategory);

  const openLightbox = (item) => setLightboxItem(item);
  const closeLightbox = () => setLightboxItem(null);

  const navigateLightbox = (dir) => {
    const currentIndex = filtered.findIndex((i) => i.id === lightboxItem.id);
    const nextIndex = (currentIndex + dir + filtered.length) % filtered.length;
    setLightboxItem(filtered[nextIndex]);
  };

  return (
    <>
      <Helmet>
        <title>Gallery - Kartik Paver Industries | Factory & Project Photos</title>
        <meta name="description" content="View our factory, products, and completed project photos. Kartik Paver Industries, Latur MIDC - Premium paver block manufacturer in Maharashtra." />
      </Helmet>

      <PageBanner title="Gallery" subtitle="Our Work" breadcrumbs={[{ name: 'Gallery' }]} />

      {/* Filter */}
      <section className="py-8 bg-dark-800 border-b border-dark-700 sticky top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-500 text-xs uppercase tracking-widest mr-2">Category:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 ${
                  activeCategory === cat ? 'bg-orange-500 text-white' : 'bg-dark-700 border border-dark-600 text-gray-400 hover:border-orange-500 hover:text-orange-400'
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-gray-500 text-sm">{filtered.length} items</span>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🖼️</div>
              <p className="text-gray-400 text-lg">No gallery images yet.</p>
              <p className="text-gray-600 text-sm mt-2">Add images from the admin panel to display them here.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence>
                {filtered.map((item) => (
                  <GalleryCard key={item.id} item={item} onClick={openLightbox} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-12 bg-dark-800 border-t border-dark-700">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '4.9★', label: 'Justdial Rating', icon: '🏆' },
              { value: '41', label: 'Customer Ratings', icon: '😊' },
              { value: '6+', label: 'Product Types', icon: '🧱' },
              { value: '51L+', label: 'Annual Turnover', icon: '📈' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-orange-500 mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <LightboxModal
            item={lightboxItem}
            onClose={closeLightbox}
            onPrev={() => navigateLightbox(-1)}
            onNext={() => navigateLightbox(1)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
