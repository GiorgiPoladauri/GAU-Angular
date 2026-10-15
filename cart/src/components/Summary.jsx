import { useState } from "react";
import { coupons, TAX } from "../data/coupons";

// FIGMA: გადახდის ხატულები (Amex, Mastercard, PayPal, Visa, Apple Pay) -- ჩაანაცვლეთ ექსპორტირებული სურათებით
function PaymentIcons() {
  return (
    <div className="pay">
      <span className="pay__box"><b style={{ color: "#2671b9", fontSize: 6 }}>AMERICAN EXPRESS</b></span>
      <span className="pay__box">
        <svg width="24" height="16" viewBox="0 0 24 16"><circle cx="8.500" cy="8" r="6.500" fill="#eb001b" /><circle cx="15.500" cy="8" r="6.500" fill="#f79e1b" fillOpacity=".9" /></svg>
      </span>
      <span className="pay__box"><b style={{ color: "#253b80", fontSize: 15, fontStyle: "italic" }}>P</b></span>
      <span className="pay__box"><b style={{ color: "#1a1f71", fontSize: 11, fontStyle: "italic" }}>VISA</b></span>
      <span className="pay__box pay__box--plain"><b style={{ fontSize: 11 }}> Pay</b></span>
    </div>
  );
}

export default function Summary({ subtotal, hasItems }) {
  const [input, setInput] = useState("");
  const [applied, setApplied] = useState(null);
  const [error, setError] = useState("");

  const applyCoupon = () => {
    const found = coupons.find((c) => c.code === input.trim().toUpperCase());
    if (found) {
      setApplied(found);
      setError("");
    } else {
      setApplied(null);
      setError("Invalid coupon code");
    }
  };

  const discount = applied ? (subtotal * applied.percent) / 100 : 0;
  const tax = hasItems ? TAX : 0;
  const total = subtotal - discount + tax;

  return (
    <aside className="summary">
      <div className="card coupon">
        <p className="coupon__label">Have a coupon?</p>
        <div className="coupon__row">
          <input
            placeholder="Add coupon"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
          />
          <button onClick={applyCoupon}>Apply</button>
        </div>
        {error && <p className="coupon__msg coupon__msg--error">{error}</p>}
        {applied && (
          <p className="coupon__msg coupon__msg--ok">{applied.code} applied: -{applied.percent}%</p>
        )}
      </div>

      <div className="card totals">
        <div className="row"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="row"><span>Discount:</span><span className="red">- ${discount.toFixed(2)}</span></div>
        <div className="row"><span>Tax:</span><span className="green">+ ${tax.toFixed(2)}</span></div>
        <div className="divider" />
        <div className="row row--total"><span>Total:</span><span>${total.toFixed(2)}</span></div>
        <button className="checkout" disabled={!hasItems}>Checkout</button>
        <PaymentIcons />
      </div>
    </aside>
  );
}
