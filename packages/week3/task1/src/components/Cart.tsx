import React from 'react';

export type Item = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type Props = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

export default function Cart({ items, setItems }: Props) {
  const updateQuantity = (id: string, delta: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  if (items.length === 0) return <p>Your cart is empty</p>;

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Qty: {item.quantity}</p>
          <p>Price: ${item.price}</p>
          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
          <button onClick={() => updateQuantity(item.id, -1)}>-</button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <h4>Total: ${total}</h4>
    </div>
  );
}
