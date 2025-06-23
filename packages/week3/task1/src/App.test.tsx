import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders shopping cart title', () => {
  render(<App />);
  expect(screen.getByText('🛒 Shopping Cart')).toBeInTheDocument();
});

test('renders default items', () => {
  render(<App />);
  expect(screen.getByText('T-shirt')).toBeInTheDocument();
  expect(screen.getByText('Hat')).toBeInTheDocument();
});