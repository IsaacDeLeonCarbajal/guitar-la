import type { Cart as CartType, Item as ItemType } from "../../Types/models";

import Cart from "../Store/Cart";

export default function Header({ cart, removeItemFromCart, updateQuantityBy, clearCart }: { cart: CartType, removeItemFromCart: (id: ItemType['id']) => void, updateQuantityBy: (id: ItemType['id'], amount: number) => void, clearCart: () => void }) {
    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="./public/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="./public/img/carrito.png" alt="imagen carrito" />

                            <Cart cart={cart} removeItemFromCart={removeItemFromCart} updateQuantityBy={updateQuantityBy} clearCart={clearCart} />
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
