import { PersonIcon, MessageIcon, HeartIcon, CartIcon, BagIcon } from "./Icons";

// FIGMA: nav-ის ხატულები (Profile, Message, Orders, My cart) -- ჩაანაცვლეთ Figma-დან ექსპორტირებული SVG-ებით (Icons.jsx ან <img src="/images/...">)
const links = [
  { label: "Profile", icon: <PersonIcon /> },
  { label: "Message", icon: <MessageIcon /> },
  { label: "Orders", icon: <HeartIcon /> },
  { label: "My cart", icon: <CartIcon /> },
];

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="logo">
          {/* FIGMA: ლოგო -- ჩაანაცვლეთ ექსპორტირებული ლოგოთი, მაგ. <img src="/images/logo.svg" alt="Brand" /> */}
          <span className="logo__icon"><BagIcon /></span>
          <span className="logo__text">Brand</span>
        </a>
        <nav className="nav">
          {links.map((l) => (
            <a href="#" className="nav__item" key={l.label}>
              {l.icon}
              <span>{l.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
