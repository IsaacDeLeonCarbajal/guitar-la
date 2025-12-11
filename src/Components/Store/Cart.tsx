import type { Cart as CartType } from "../../Types/models";
import { useCart } from "../../Hooks/useCart";

type CartProps = {
    cart: CartType;
    setCart: React.Dispatch<React.SetStateAction<CartType>>;
};

export default function Cart({ cart, setCart }: CartProps) {
    const {
        removeItemFromCart,
        updateQuantityBy,
        clearCart,
        cartTotal,
        isEmpty,
    } = useCart(cart, setCart);

    return (
        <div id="carrito" className="bg-white p-3">
            {isEmpty ?
                <p className="text-center">El carrito esta vacio</p> :
                <>
                    <table className="w-100 table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(cart).map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <img className="img-fluid" src={`/img/${item.image}.jpg`} alt="imagen guitarra" />
                                    </td>
                                    <td>{item.name}</td>
                                    <td className="fw-bold">
                                        ${item.price * item.quantity}
                                    </td>
                                    <td className="flex align-items-start gap-4">
                                        <button onClick={() => updateQuantityBy(item.id, -1)} type="button" className="btn btn-dark">
                                            -
                                        </button>
                                        {item.quantity}
                                        <button onClick={() => updateQuantityBy(item.id, 1)} type="button" className="btn btn-dark">
                                            +
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => removeItemFromCart(item.id)} className="btn btn-danger" type="button">
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>

                    <button onClick={clearCart} className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                </>
            }
        </div>
    );
}
