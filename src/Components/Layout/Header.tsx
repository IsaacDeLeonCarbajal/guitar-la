import type { Item as ItemType, Cart as CartType } from "../../Types/models";

import Cart from "../Store/Cart";

type HeaderProps = {
    cart: CartType;
    onItemRemoved: (id: ItemType['id']) => void;
    onQuantityUpdated: (id: ItemType['id'], amount: number) => void;
    onClear: () => void;
};

export default function Header({ cart, onItemRemoved, onQuantityUpdated, onClear }: HeaderProps) {
    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <Cart cart={cart} onItemRemoved={onItemRemoved} onQuantityUpdated={onQuantityUpdated} onClear={onClear} />
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
