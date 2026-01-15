import { useReducer, useState } from "react";

import type { Item as ItemType } from "./Types";
import { db } from './data/db';

import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import Item from "./Components/Store/Item";
import { cartReducer } from "./reducers/cartReducer";

function App() {
  const [data] = useState<ItemType[]>(db);

  const [cartState, cartDispatch] = useReducer(cartReducer, { items: {} });

  const handleItemAdded = (item: ItemType) => {
    cartDispatch({
      type: 'add',
      payload: { item },
    });
  }

  const handleItemRemoved = (id: ItemType['id']) => {
    cartDispatch({
      type: 'remove',
      payload: { id },
    });
  }

  const handleQuantityUpdated = (id: ItemType['id'], amount: number) => {
    cartDispatch({
      type: 'update-quantity',
      payload: { id, amount },
    });
  }

  const handleClear = () => {
    cartDispatch({
      type: 'clear',
    });
  }

  return (
    <>
      <Header cart={cartState.items} onItemRemoved={handleItemRemoved} onQuantityUpdated={handleQuantityUpdated} onClear={handleClear} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((item) => (
            <Item item={item} onItemAdded={handleItemAdded} isSelected={Object.hasOwn(cartState.items, item.id)} key={item.id} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
