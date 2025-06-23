import axios from 'axios';
import { IGetProductsResponse } from 'models';

const isProduction = process.env.NODE_ENV === 'production';

// Retry mechanism for failed requests
const retryRequest = async (fn: () => Promise<any>, retries = 3): Promise<any> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
};

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
      
      // Status check removed for compatibility
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
    
    // Simplified error handling for compatibility
    
    throw new Error('Failed to load products. Please try again.');
  }
};

export const processPayment = async (paymentData: any) => {
  try {
    if (!paymentData || !paymentData.amount || !paymentData.method) {
      throw new Error('Invalid payment data');
    }

    const response = await retryRequest(() => 
      axios.post('/api/payment', paymentData, {
        timeout: 15000,
        headers: { 'Content-Type': 'application/json' }
      })
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Payment failed with status: ${response.status}`);
    }

    const result = response.data;
    
    if (!result || !result.success) {
      throw new Error(result?.message || 'Payment processing failed');
    }

    return result;
  } catch (error) {
    console.error('Payment processing error:', error);
    
    // Simplified payment error handling
    
    throw new Error('Payment failed. Please try again.');
  }
};
