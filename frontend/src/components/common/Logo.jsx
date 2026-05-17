import React from 'react';

/**
 * Kartik Paver Industries Logo Component
 * Enhanced with professional styling, glow effects, and better visibility
 * Uses the actual logo PNG (transparent background) from /public/logo.png
 */
const Logo = ({ size = 'md', variant = 'full', className = '' }) => {
  const heights = {
    xs: 40,
    sm: 60,
    md: 75,
    lg: 100,
    xl: 140,
  };

  const height = heights[size] || heights.md;

  return (
    <div 
      className={`relative inline-block overflow-hidden rounded-lg ${className}`}
      style={{
        height: height,
        width: variant === 'icon' ? height : height * 2.5,
        filter: 'drop-shadow(0 0 8px rgba(234, 88, 12, 0.3)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))',
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Kartik Paver Industries"
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain',
            transform: 'scale(1.8)', // Zooms the image to push the background out
            imageRendering: '-webkit-optimize-contrast',
          }}
          className="relative z-10"
        />
      </div>
    </div>
  );
};

export default Logo;
export { Logo as LogoIconMark };
