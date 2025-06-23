import { useMemo } from 'react';
import DOMPurify from 'dompurify';

// Security utility functions
const sanitizeHTML = (html) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: []
  });
};

const validateImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  // Allow only HTTPS URLs and data URLs for images
  const allowedProtocols = /^(https:|data:image\/)/;
  const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
  
  return allowedProtocols.test(url) && (url.startsWith('data:') || imageExtensions.test(url));
};

const validateProductId = (id) => {
  if (!id || typeof id !== 'string') return false;
  // Only allow alphanumeric characters and hyphens
  return /^[a-zA-Z0-9-]+$/.test(id) && id.length <= 50;
};

const ProductDetails = ({ product }) => {
  // Input validation
  if (!product || typeof product !== 'object') {
    return <div>Invalid product data</div>;
  }

  const { title, description, imageUrl, id } = product;

  // Sanitize and validate data
  const sanitizedTitle = useMemo(() => {
    return title && typeof title === 'string' ? title.trim() : 'Unknown Product';
  }, [title]);

  const sanitizedDescription = useMemo(() => {
    if (!description || typeof description !== 'string') return '';
    return sanitizeHTML(description);
  }, [description]);

  const validImageUrl = useMemo(() => {
    return validateImageUrl(imageUrl) ? imageUrl : '/placeholder-image.jpg';
  }, [imageUrl]);

  const handleViewDetails = () => {
    if (!validateProductId(id)) {
      console.error('Invalid product ID');
      return;
    }
    
    // Use React Router or proper navigation instead of direct window.location
    const safeUrl = `/product/${encodeURIComponent(id)}`;
    if (safeUrl.startsWith('/product/')) {
      window.location.href = safeUrl;
    }
  };

  return (
    <div>
      <h2>{sanitizedTitle}</h2>
      
      {/* Safe HTML rendering */}
      {sanitizedDescription && (
        <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      )}
      
      {/* Validated image with error handling */}
      <img 
        src={validImageUrl} 
        alt={sanitizedTitle}
        onError={(e) => {
          e.target.src = '/placeholder-image.jpg';
        }}
        loading="lazy"
      />
      
      {/* Secure navigation */}
      <button 
        onClick={handleViewDetails}
        disabled={!validateProductId(id)}
      >
        View Details
      </button>
    </div>
  );
};

export default ProductDetails;