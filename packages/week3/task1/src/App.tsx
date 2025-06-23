import React, { useState } from 'react';
import Cart from './components/Cart';

const defaultItems = [
  { id: '1', name: 'T-shirt', quantity: 1, price: 20 },
  { id: '2', name: 'Hat', quantity: 2, price: 15 },
];

export default function App() {
  const [items, setItems] = useState(defaultItems);

  return (
    <div>
      <h1>🛒 Shopping Cart</h1>
      <Cart items={items} setItems={setItems} />
    </div>
  );
}
