import { useState } from "react";
import Header from "./components/Header";
import CartItem from "./components/CartItem";
import Summary from "./components/Summary";
import { ArrowLeftIcon } from "./components/Icons";
import { initialProducts } from "./data/products";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState(initialProducts);

  const removeProduct = (id) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  const changeQty = (id, qty) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));

  const subtotal = products.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <>
      <Header />
      <main className="container page">
        <h1>My cart ({products.length})</h1>
        <div className="layout">
          <section className="card cart">
            {products.length === 0 && <p className="empty">Your cart is empty</p>}
            {products.map((p) => (
              <CartItem key={p.id} product={p} onRemove={removeProduct} onQtyChange={changeQty} />
            ))}
            <div className="cart__footer">
              <button className="btn-back"><ArrowLeftIcon /> Back to shop</button>
              <button className="btn-removeall" onClick={() => setProducts([])}>Remove all</button>
            </div>
          </section>
          <Summary subtotal={subtotal} hasItems={products.length > 0} />
        </div>
      </main>
    </>
  );
}
