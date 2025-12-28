
import React from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SmartImage intelligently renders either a span (for text/emoji placeholders)
 * or an img tag (for URLs or file paths).
 */
const SmartImage: React.FC<Props> = ({ src, alt, className = "", style }) => {
  // Simple check to see if the src is a URL or a file path
  const isImageUrl = src.startsWith('http') || src.startsWith('/') || src.startsWith('data:');

  if (isImageUrl) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={`object-contain ${className}`} 
        style={style}
      />
    );
  }

  // Render text-based placeholder
  return (
    <span 
      role="img" 
      aria-label={alt} 
      className={`select-none ${className}`}
      style={style}
    >
      {src}
    </span>
  );
};

export default SmartImage;
