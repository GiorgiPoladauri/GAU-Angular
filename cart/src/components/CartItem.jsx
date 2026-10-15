import { ChevronIcon } from "./Icons";

export default function CartItem({ product, onRemove, onQtyChange }) {
  const { id, title, size, color, material, seller, price, qty, image } = product;
  const linePrice = price * qty;
  const options = Array.from({ length: Math.max(20, qty) }, (_, i) => i + 1);

  return (
    <div className="item">
      <div className="item__img">
        <img src={image} alt="" />
      </div>

      <div className="item__info">
        <h3>{title}</h3>
        <p>Size: {size}, Color: {color}, Material: {material}</p>
        <p>Seller: {seller}</p>
        <div className="item__actions">
          <button className="btn btn--remove" onClick={() => onRemove(id)}>Remove</button>
          <button className="btn btn--save">Save for later</button>
        </div>
      </div>

      <div className="item__side">
        <span className="item__price">${linePrice.toFixed(2)}</span>
        <div className="qty">
          <select value={qty} onChange={(e) => onQtyChange(id, Number(e.target.value))}>
            {options.map((n) => (
              <option key={n} value={n}>Qty: {n}</option>
            ))}
          </select>
          <span className="qty__chevron"><ChevronIcon /></span>
        </div>
      </div>
    </div>
  );
}
