import type { Item as ItemType } from "../../Types/models";

export default function Item({ item, onSelect, isSelected }: { item: ItemType, onSelect: (i: ItemType) => void, isSelected: boolean }) {
    const { name, image, description, price } = item;

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt={`Imagen ${name}`} />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button onClick={() => onSelect(item)} type="button" className="btn btn-dark w-100" disabled={isSelected}>
                    {isSelected ? 'En tu Carrito' : 'Agregar al Carrito'}
                </button>
            </div>
        </div>
    );
}
