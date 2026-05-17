import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeader from '../common/SectionHeader';

import { api } from '../../utils/api';
import { getFallbackImage, handleImageError, getProductImageUrl } from '../../utils/imageUtils';
const PatternSVG = ({ pattern, color }) => {
  const patterns = {
    'I-Shape': (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        {[0, 1, 2].map(row =>
          [0, 1].map(col => (
            <rect
              key={`${row}-${col}`}
              x={col * 60 + 5}
              y={row * 26 + 2}
              width={50}
              height={22}
              rx={2}
              fill={color}
              opacity={0.8 - row * 0.1}
            />
          ))
        )}
      </svg>
    ),
    'Zig-Zag': (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        {[0, 1, 2].map(row =>
          [0, 1, 2].map(col => (
            <rect
              key={`${row}-${col}`}
              x={col * 40 + (row % 2 === 0 ? 0 : 20) + 2}
              y={row * 26 + 2}
              width={36}
              height={22}
              rx={2}
              fill={color}
              opacity={0.8}
            />
          ))
        )}
      </svg>
    ),
    'Rect': (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        {[0, 1, 2, 3].map(row =>
          [0, 1, 2].map(col => (
            <rect
              key={`${row}-${col}`}
              x={col * 40 + 2}
              y={row * 20 + 2}
              width={36}
              height={16}
              rx={1}
              fill={color}
              opacity={0.8}
            />
          ))
        )}
      </svg>
    ),
    'Grass': (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        {[0, 1].map(row =>
          [0, 1].map(col => (
            <g key={`${row}-${col}`}>
              <rect
                x={col * 58 + 4}
                y={row * 38 + 4}
                width={50}
                height={30}
                rx={3}
                fill={color}
                opacity={0.6}
              />
              <circle cx={col * 58 + 29} cy={row * 38 + 19} r={8} fill="#22c55e" opacity={0.8} />
            </g>
          ))
        )}
      </svg>
    ),
    'Kerb': (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        {[0, 1, 2, 3].map(i => (
          <rect
            key={i}
            x={4}
            y={i * 19 + 4}
            width={112}
            height={14}
            rx={2}
            fill={color}
            opacity={0.8 - i * 0.05}
          />
        ))}
      </svg>
    ),
    'Color': (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        {[0, 1, 2].map(row =>
          [0, 1].map(col => (
            <rect
              key={`${row}-${col}`}
              x={col * 60 + 5}
              y={row * 26 + 2}
              width={50}
              height={22}
              rx={2}
              fill={['#ea580c', '#eab308', '#6b7280', '#dc2626', '#2563eb', '#7c3aed'][row * 2 + col]}
              opacity={0.85}
            />
          ))
        )}
      </svg>
    ),
  };
  return patterns[pattern] || null;
};

const ProductShowcase = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        const productList = Array.isArray(data) ? data : (data.results || []);
        setProducts(productList.slice(0, 6)); // Display first 6 products
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="section-padding industrial-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="container-custom">
        <SectionHeader
          subtitle="Our Products"
          title="Premium Paver Block Collection"
          description="Manufactured with M-35 grade concrete at our Latur MIDC facility. Every block is precision-crafted for maximum strength and durability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group card-industrial overflow-hidden cursor-pointer"
            >
              {/* Product Visual */}
              <div className="relative h-56 bg-dark-800 overflow-hidden border-b border-dark-600">
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
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider backdrop-blur-md bg-orange-500/80 text-white shadow-lg"
                  >
                    {product.category || 'Paver Block'}
                  </span>
                </div>
                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === product.id ? 1 : 0 }}
                  className="absolute inset-0 bg-orange-500/10 flex items-center justify-center"
                >
                  <span className="text-orange-400 text-sm font-semibold uppercase tracking-wider border border-orange-500/50 px-4 py-2 rounded-sm">
                    View Details
                  </span>
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3
                  className="text-white text-lg font-bold uppercase tracking-wide mb-2 group-hover:text-orange-400 transition-colors duration-300"
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Specs */}
                <div className="flex items-center justify-between pt-3 border-t border-dark-600">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Available Sizes</p>
                    <p className="text-gray-300 text-xs truncate max-w-[150px]">
                      {product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Strength</p>
                    <p className="text-orange-500 text-sm font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      {product.strength || 'M-35'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
            <span>View All Products</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
