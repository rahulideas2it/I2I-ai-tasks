import { render, screen, fireEvent } from '@testing-library/react';
import Cart, { Item } from './Cart';
import React from 'react';

test('renders empty cart message', () => {
  const setItems = jest.fn();
  render(<Cart items={[]} setItems={setItems} />);
  expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
});

test('renders items and total', () => {
  const setItems = jest.fn();
  render(<Cart items={[{ id: '1', name: 'Hat', quantity: 2, price: 15 }]} setItems={setItems} />);
  expect(screen.getByText('Hat')).toBeInTheDocument();
  expect(screen.getByText('Qty: 2')).toBeInTheDocument();
  expect(screen.getByText('Price: $15')).toBeInTheDocument();
  expect(screen.getByText('Total: $30')).toBeInTheDocument();
});

test('increments item quantity', () => {
  const items = [{ id: '1', name: 'T-shirt', quantity: 1, price: 20 }];
  const setItems = jest.fn();
  render(<Cart items={items} setItems={setItems} />);
  fireEvent.click(screen.getByText('+'));
  
  const updateFn = setItems.mock.calls[0][0];
  const result = updateFn(items);
  expect(result[0].quantity).toBe(2);
});

test('decrements item quantity', () => {
  const items = [{ id: '1', name: 'T-shirt', quantity: 2, price: 20 }];
  const setItems = jest.fn();
  render(<Cart items={items} setItems={setItems} />);
  fireEvent.click(screen.getByText('-'));
  
  const updateFn = setItems.mock.calls[0][0];
  const result = updateFn(items);
  expect(result[0].quantity).toBe(1);
});

test('does not decrement quantity below 1', () => {
  const items = [{ id: '1', name: 'T-shirt', quantity: 1, price: 20 }];
  const setItems = jest.fn();
  render(<Cart items={items} setItems={setItems} />);
  fireEvent.click(screen.getByText('-'));
  
  const updateFn = setItems.mock.calls[0][0];
  const result = updateFn(items);
  expect(result[0].quantity).toBe(1);
});

test('removes item from cart', () => {
  const items = [{ id: '1', name: 'T-shirt', quantity: 1, price: 20 }];
  const setItems = jest.fn();
  render(<Cart items={items} setItems={setItems} />);
  fireEvent.click(screen.getByText('Remove'));
  
  const updateFn = setItems.mock.calls[0][0];
  const result = updateFn(items);
  expect(result).toHaveLength(0);
});

test('updates correct item when multiple items exist', () => {
  const items = [
    { id: '1', name: 'T-shirt', quantity: 1, price: 20 },
    { id: '2', name: 'Hat', quantity: 2, price: 15 }
  ];
  const setItems = jest.fn();
  render(<Cart items={items} setItems={setItems} />);
  
  const buttons = screen.getAllByText('+');
  fireEvent.click(buttons[1]);
  
  const updateFn = setItems.mock.calls[0][0];
  const result = updateFn(items);
  expect(result[0].quantity).toBe(1);
  expect(result[1].quantity).toBe(3);
});
