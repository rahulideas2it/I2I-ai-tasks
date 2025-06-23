## Build/Run - [Live Demo](http://localhost:3004)

#### Requirements

- Node.js
- NPM

```javascript

/* First, Install the needed packages */
npm install

/* Then start the React app (runs on PORT 3004) */
npm start

/* To run the tests */
npm run test

/* From monorepo root */
npm run dev:week4-task
npm run build:week4-task

```

## 🐛 Challenge 1: State Management Bug Fix

### Optimized addProduct Implementation

```javascript
const addProduct = useCallback((product) => {
  setProducts(prev => {
    const existingIndex = prev.findIndex(p => p.id === product.id);
    
    if (existingIndex >= 0) {
      const updated = [...prev];
      updated[existingIndex] = { 
        ...updated[existingIndex], 
        quantity: updated[existingIndex].quantity + 1 
      };
      return updated;
    }
    
    return [...prev, { ...product, quantity: 1 }];
  });
}, []);
```

### Issues Identified and Fixed:
- **Direct State Mutation** - `productAlreadyInCart.quantity++`
- **Props Mutation** - `product.quantity = 1`
- **Inefficient Re-renders** - Spreading same array reference

### ✅ Solutions Applied:
1. **Immutable Updates**: Using functional state updates with `setProducts(prev => ...)`
2. **Props Protection**: Spread operator `{...product}` prevents mutation
3. **Performance**: `useCallback` prevents unnecessary re-renders
4. **Proper Array Updates**: Creating new arrays instead of mutating existing ones

## 🚀 Challenge 2: Performance Optimization

### Optimized Products Component

```javascript
const Products = memo(({ products, filters }) => {
  const filteredProducts = useMemo(() => {
    if (!filters) return products;
    
    return products?.filter(product => {
      const sizeMatch = filters.sizes.length === 0 || 
        filters.sizes.every(size => product.availableSizes?.includes(size));
      const priceMatch = product.price <= filters.maxPrice;
      
      return sizeMatch && priceMatch;
    }) || [];
  }, [products, filters]);

  return (
    <div>
      {filteredProducts.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
});
```

### Performance Issues Fixed:
- **Expensive Filtering**: Moved to `useMemo` to prevent re-computation
- **Unnecessary Re-renders**: Added `memo` wrapper
- **Missing Dependencies**: Proper dependency array in `useMemo`

## 🛡️ Challenge 3: Error Handling Enhancement

### Robust API Error Handling

```javascript
export const getProducts = async () => {
  try {
    let response: IGetProductsResponse;

    if (isProduction) {
      response = await retryRequest(() => 
        axios.get('https://react-shopping-cart-67954.firebaseio.com/products.json', {
          timeout: 10000,
          headers: { 'Content-Type': 'application/json' }
        })
      );
      
      if (response.status !== 200) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
    } else {
      response = require('static/json/products.json');
    }

    const { products } = response.data || [];
    
    if (!products || !Array.isArray(products)) {
      throw new Error('Invalid products data format');
    }

    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    
    if (error instanceof AxiosError) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - please check your connection');
      }
      if (error.response?.status === 404) {
        throw new Error('Products not found');
      }
      if (error.response?.status >= 500) {
        throw new Error('Server error - please try again later');
      }
    }
    
    throw new Error('Failed to load products. Please try again.');
  }
};
```

### Error Handling Features:
- **Comprehensive Try-Catch**: All API calls wrapped
- **Network Error Handling**: Timeout and connection errors
- **HTTP Status Validation**: Proper status code checking
- **User-Friendly Messages**: Clear error descriptions
- **Retry Mechanism**: Automatic retry for failed requests
- **Input Validation**: Data format validation

## 🛡️ Challenge 4: Security Vulnerability Fixes

### Secure ProductDetails Component

```javascript
const ProductDetails = ({ product }) => {
  // Input validation
  if (!product || typeof product !== 'object') {
    return <div>Invalid product data</div>;
  }

  const sanitizedTitle = useMemo(() => {
    return title && typeof title === 'string' ? title.trim() : 'Unknown Product';
  }, [title]);

  const sanitizedDescription = useMemo(() => {
    if (!description || typeof description !== 'string') return '';
    return DOMPurify.sanitize(description, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
      ALLOWED_ATTR: []
    });
  }, [description]);

  const validImageUrl = useMemo(() => {
    return validateImageUrl(imageUrl) ? imageUrl : '/placeholder-image.jpg';
  }, [imageUrl]);

  return (
    <div>
      <h2>{sanitizedTitle}</h2>
      <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      <img src={validImageUrl} alt={sanitizedTitle} onError={handleImageError} />
      <button onClick={handleSecureNavigation}>View Details</button>
    </div>
  );
};
```

### Security Vulnerabilities Fixed:
- **XSS Prevention**: DOMPurify sanitization for HTML content
- **Input Validation**: Type checking and format validation
- **URL Validation**: Image URL protocol and extension validation
- **Safe Navigation**: Product ID validation and URL encoding
- **Error Handling**: Fallback images and error boundaries

### Security Features:
- **HTML Sanitization**: Only allow safe HTML tags
- **Image URL Validation**: HTTPS and data URL protocols only
- **Product ID Validation**: Alphanumeric characters only
- **URL Encoding**: Prevent injection in navigation
- **Error Boundaries**: Graceful handling of invalid data
