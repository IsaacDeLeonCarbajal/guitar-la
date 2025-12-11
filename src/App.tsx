import { useState } from "react";

import type { Cart as CartType, Item as ItemType } from "./Types/models";
import { useCart } from "./Hooks/useCart";
import { db } from './data/db';

import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import Item from "./Components/Store/Item";

function App() {
  const [data] = useState(db as ItemType[]);
  const [cart, setCart] = useState({} as CartType);

  const {
    addItemToCart,
  } = useCart(cart, setCart);

  return (
    <>
      <Header cart={cart} setCart={setCart} />

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
