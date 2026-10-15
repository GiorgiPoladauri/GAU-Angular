const base = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "currentColor" };

export const PersonIcon = () => (
  <svg {...base}><circle cx="12" cy="7.5" r="4.5" /><path d="M3 21c0-5 4-8 9-8s9 3 9 8z" /></svg>
);
export const MessageIcon = () => (
  <svg {...base}><path d="M3 3h18v15H8l-5 4z" /><path d="M7 8h10M7 12h7" stroke="#fff" strokeWidth="1.6" /></svg>
);
export const HeartIcon = () => (
  <svg {...base}><path d="M12 21s-9-5.6-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.400-9 12-9 12z" /></svg>
);
export const CartIcon = () => (
  <svg {...base}><path d="M1 2h4l1 3h16l-3 9H8L5 4H1z" /><circle cx="9" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></svg>
);
export const BagIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 8h14l1 13H4z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);
export const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12H4M10 5l-7 7 7 7" />
  </svg>
);
export const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b96a5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 9l7 7 7-7" />
  </svg>
);
