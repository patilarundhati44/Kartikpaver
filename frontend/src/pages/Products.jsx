import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import PageBanner from '../components/common/PageBanner';
import SectionHeader from '../components/common/SectionHeader';
import { getFallbackImage, handleImageError, getProductImageUrl } from '../utils/imageUtils';
import { api } from '../utils/api';

const PatternSVG = ({ pattern, color, image, category }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src={image || getFallbackImage(category)} 
        alt="Product" 
        className="w-full h-full object-cover rounded-sm"
        style={{
          filter: 'brightness(0.95) contrast(1.05) saturate(1.1)',
        }}
        onError={(e) => handleImageError(e, category)}
        loading="lazy"
      />
    </div>
  );
};

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-dark-800 border border-dark-600 rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-600">
          <div>
            <span className="text-orange-500 text-xs uppercase tracking-widest font-semibold">{product.category}</span>
            <h2 className="text-white text-2xl font-bold uppercase mt-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-dark-700 hover:bg-orange-500 rounded-sm flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visual */}
          <div className="bg-gradient-to-br from-dark-900 to-dark-800 rounded-sm p-6 flex items-center justify-center aspect-square border-2 border-dark-600 relative overflow-hidden">
            {product.video_url || product.video ? (
              <video
                src={product.video_url || product.video}
                controls
                autoPlay
                loop
                muted
                className="w-full h-full object-cover rounded-sm"
              />
            ) : (
              <div className="w-full h-full max-w-[220px]">
                <PatternSVG pattern={product.pattern} color={product.color} image={getProductImageUrl(product)} category={product.category} />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-5">
            <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>

            <div>
              <h4 className="text-orange-500 text-xs uppercase tracking-widest font-semibold mb-2">Available Sizes</h4>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <span key={s} className="bg-dark-700 border border-dark-600 text-gray-300 text-xs px-3 py-1 rounded-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-orange-500 text-xs uppercase tracking-widest font-semibold mb-2">Available Colors</h4>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <span key={c} className="bg-dark-700 border border-dark-600 text-gray-300 text-xs px-3 py-1 rounded-sm">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-dark-900 border border-dark-600 p-3 rounded-sm">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Strength</p>
                <p className="text-orange-500 font-bold text-lg" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {product.strength}
                </p>
              </div>
              <div className="bg-dark-900 border border-dark-600 p-3 rounded-sm">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Weight</p>
                <p className="text-white font-bold text-sm">{product.weight}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-dark-900 border border-dark-600 p-3 rounded-sm">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Material</p>
                <p className="text-white font-bold text-sm">{product.material || 'Cement Concrete'}</p>
              </div>
              <div className="bg-dark-900 border border-dark-600 p-3 rounded-sm">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Finish</p>
                <p className="text-white font-bold text-sm">{product.finish || 'Standard'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-dark-900 border border-dark-600 p-3 rounded-sm">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Shape</p>
                <p className="text-white font-bold text-sm">{product.shape || 'Standard'}</p>
              </div>
              <div className="bg-dark-900 border border-dark-600 p-3 rounded-sm">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Type</p>
                <p className="text-white font-bold text-sm">{product.type || 'Paver Block'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-dark-900 border border-dark-600 p-3 rounded-sm">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Dimensions</p>
                <p className="text-white font-bold text-sm">{product.product_dimensions || 'N/A'}</p>
              </div>
              <div className="bg-dark-900 border border-dark-600 p-3 rounded-sm">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Availability</p>
                <p className="text-white font-bold text-sm">{product.availability || 'In Stock'}</p>
              </div>
            </div>

            <div className="bg-dark-900 border border-dark-600 p-3 rounded-sm">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Price</p>
              <p className="text-orange-500 font-bold text-lg" style={{ fontFamily: 'Oswald, sans-serif' }}>
                {product.price || 'Contact for quote'}
              </p>
            </div>

            <div>
              <h4 className="text-orange-500 text-xs uppercase tracking-widest font-semibold mb-2">Applications</h4>
              <ul className="space-y-1">
                {product.applications.map((a) => (
                  <li key={a} className="flex items-center space-x-2 text-gray-400 text-sm">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-orange-500 text-xs uppercase tracking-widest font-semibold mb-2">Key Features</h4>
              <ul className="space-y-1">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center space-x-2 text-gray-400 text-sm">
                    <svg className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-dark-600 flex flex-wrap gap-3">
          <a href="tel:+919054839964" className="btn-primary flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>Call for Price</span>
          </a>
          <a
            href={`https://wa.me/918484946890?text=${encodeURIComponent(`Hello! I am interested in ${product.name}. Please share price and availability.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>WhatsApp Inquiry</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      // Handle paginated response {count, results:[]} OR plain array
      const productList = Array.isArray(data) ? data : (data.results || []);
      setProducts(productList);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(productList.map(p => p.category))];
      setCategories(['All', ...uniqueCategories]);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Products - Kartik Paver Industries | Rubber, Cement, PVC Paver Blocks Latur Maharashtra</title>
        <meta
          name="description"
          content="Explore our complete range of premium paver blocks: Rubber Paver Blocks, Zigzag Cement Paver, Wave Cement Paver, PVC Cover Blocks, Concrete Brick Paving, I Shape, Grass Paver, Kerb Stone, Color Paver Blocks. Manufactured at Latur MIDC."
        />
        <meta name="keywords" content="rubber paver blocks, zigzag cement paver block, wave cement paver block, pvc cover block, concrete brick paving, I shape paver block, grass paver block, kerb stone, color paver block, Latur, Maharashtra, paver block manufacturers" />
        <meta property="og:title" content="Products - Kartik Paver Industries | Premium Paver Blocks Latur" />
        <meta property="og:description" content="10+ types of premium paver blocks including rubber, cement, PVC, and decorative options. Contact +91 90548 39964 for bulk orders." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kartikpaverindustries.com/products" />
      </Helmet>

      <PageBanner title="Our Products" subtitle="Product Range" breadcrumbs={[{ name: 'Products' }]} />

      {/* Filter Section */}
      <section className="py-8 bg-dark-800 border-b border-dark-700 sticky top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-500 text-xs uppercase tracking-widest mr-2">Filter:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-orange-500 text-white'
                    : 'bg-dark-700 border border-dark-600 text-gray-400 hover:border-orange-500 hover:text-orange-400'
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-gray-500 text-sm">{filtered.length} products</span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-dark-800 border border-dark-700 rounded-sm overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:border-orange-500/30 transition-all duration-500"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Visual */}
                  <div className="relative h-72 bg-gradient-to-br from-dark-800 to-dark-900 overflow-hidden border-b border-dark-600">
                    <div className="absolute inset-0">
                      <img 
                        src={getProductImageUrl(product)} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        style={{
                          filter: 'brightness(0.9) contrast(1.05) saturate(1.1)',
                        }}
                        onError={(e) => handleImageError(e, product.category)}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span
                        className="text-xs font-bold px-4 py-2 rounded-sm uppercase tracking-wider backdrop-blur-md bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-lg"
                      >
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-all duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <span className="text-orange-400 text-sm font-bold uppercase tracking-wider border-2 border-orange-500/60 px-6 py-3 rounded-sm bg-dark-900/95 backdrop-blur-md shadow-2xl">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-white text-xl font-bold uppercase tracking-wide mb-3 group-hover:text-orange-400 transition-colors duration-300" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">{product.description}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {product.applications.slice(0, 3).map((app) => (
                        <span key={app} className="text-xs font-medium bg-dark-700/50 text-gray-300 px-3 py-1.5 rounded-sm border border-dark-600">
                          {app}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-600">
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Sizes</p>
                        <p className="text-gray-300 text-sm font-medium">{product.sizes[0]}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Strength</p>
                        <p className="text-orange-500 text-base font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
                          {product.strength}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Specs Table */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom">
          <SectionHeader subtitle="Specifications" title="Product Comparison" description="Quick reference guide for all our paver block products." />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-600">
                  <th className="text-left py-4 px-4 text-orange-500 uppercase tracking-wider text-xs font-semibold">Product</th>
                  <th className="text-left py-4 px-4 text-orange-500 uppercase tracking-wider text-xs font-semibold">Category</th>
                  <th className="text-left py-4 px-4 text-orange-500 uppercase tracking-wider text-xs font-semibold">Material</th>
                  <th className="text-left py-4 px-4 text-orange-500 uppercase tracking-wider text-xs font-semibold">Strength</th>
                  <th className="text-left py-4 px-4 text-orange-500 uppercase tracking-wider text-xs font-semibold">Product Type</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={`border-b border-dark-700 hover:bg-dark-700/50 transition-colors cursor-pointer ${i % 2 === 0 ? 'bg-dark-900/30' : ''}`} onClick={() => setSelectedProduct(p)}>
                    <td className="py-4 px-4 text-white font-medium">{p.name}</td>
                    <td className="py-4 px-4">
                      <span className="text-xs px-2 py-1 rounded-sm bg-orange-500/20 text-orange-400">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{p.material || 'Cement Concrete'}</td>
                    <td className="py-4 px-4 text-orange-500 font-semibold">{p.strength}</td>
                    <td className="py-4 px-4 text-gray-400">{p.productType || 'Paver Block'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 11px)' }} />
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-white text-4xl font-bold uppercase mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Need a Custom Quote?
          </h2>
          <p className="text-orange-100 mb-8 max-w-xl mx-auto">
            Contact us for bulk pricing, custom sizes, and special color requirements. We deliver across Maharashtra.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+919054839964" className="bg-white text-orange-600 font-bold px-8 py-3 rounded-sm uppercase tracking-wider text-sm hover:bg-orange-50 transition-colors duration-300">
              Call Now
            </a>
            <a
              href={`https://wa.me/918484946890?text=${encodeURIComponent('Hello! I need a bulk quote for paver blocks.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-sm uppercase tracking-wider text-sm hover:bg-white hover:text-orange-600 transition-all duration-300"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </AnimatePresence>
    </>
  );
};

export default Products;
