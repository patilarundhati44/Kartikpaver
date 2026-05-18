// Image utility functions for product images

// Fallback images for different product categories
export const fallbackImages = {
  'Standard': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'Decorative': 'https://images.unsplash.com/photo-1590556409324-aa277b0c6d53?w=800&q=80',
  'Eco': 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80',
  'Boundary': 'https://images.unsplash.com/photo-1585338447917-807e12b5d9e0?w=800&q=80',
  'Accessory': 'https://images.unsplash.com/photo-1574757988530-b36b2c6dc0bc?w=800&q=80',
  'default': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
};

// Get fallback image based on category
export const getFallbackImage = (category) => {
  return fallbackImages[category] || fallbackImages.default;
};

// Handle image error with fallback
export const handleImageError = (e, category) => {
  e.target.src = getFallbackImage(category);
  e.target.onerror = null; // Prevent infinite loop
};

// Optimize image URL for better loading
export const optimizeImageUrl = (url, options = {}) => {
  if (!url || url.includes('unsplash.com')) {
    return url; // Unsplash URLs are already optimized
  }
  
  // For other URLs, you could add optimization parameters here
  // Example: add width/height parameters, compression, etc.
  return url;
};

// Lazy loading configuration
export const lazyLoadConfig = {
  rootMargin: '50px 0px',
  threshold: 0.1
};

// Get absolute product image URL with category fallbacks
export const getProductImageUrl = (product) => {
  if (!product) return getFallbackImage('default');
  const image = product.image_url || product.image;
  if (!image) return getFallbackImage(product.category);
  
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  
  // Resolve relative URLs with the Railway backend base URL
  const backendBaseUrl = 'https://kartikpaver-production.up.railway.app';
  if (image.startsWith('/')) {
    return `${backendBaseUrl}${image}`;
  }
  return `${backendBaseUrl}/${image}`;
};