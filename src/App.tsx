import { useState } from "react";

import type { Cart as CartType, Item as ItemType } from "./Types/models";
import { db } from './data/db';

import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import Item from "./Components/Store/Item";

function App() {
  const [data] = useState(db as ItemType[]);
  const [cart, setCart] = useState({} as CartType);

  const addItemToCart = (item: ItemType) => {
    if (Object.hasOwn(cart, item.id))
      return;

    setCart(() => ({
      ...cart,
      [item.id]: {
        ...item,
        quantity: 1,
      },
    }));
  }

  const removeItemFromCart = (id: ItemType['id']) => {
    if (!Object.hasOwn(cart, id))
      return;

    const updatedCart = { ...cart };

    delete updatedCart[id];

    setCart(() => updatedCart);
  }

  const clearCart = () => {
    setCart([]);
  }

  const updateQuantityBy = (id: ItemType['id'], amount: number) => {
    if (!Object.hasOwn(cart, id))
      return;

    const item = { ...cart[id] };

    item.quantity += amount;

    if (item.quantity < 1 || item.quantity > 5)
      return;

    setCart(() => ({
      ...cart,
      [item.id]: item,
    }));
  }

  return (
    <>
      <Header cart={cart} removeItemFromCart={removeItemFromCart} updateQuantityBy={updateQuantityBy} clearCart={clearCart} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((item) => (
            <Item item={item} onSelect={addItemToCart} isSelected={Object.hasOwn(cart, item.id)} key={item.id} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
