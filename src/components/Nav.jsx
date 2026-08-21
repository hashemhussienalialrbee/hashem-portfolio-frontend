import { useEffect, useState } from "react";

const LINKS = [
  ["#about", "About"],
  ["#projects", "Projects"],
  ["#skills", "Skills"],
  ["#experience", "Experience"],
  ["#education", "Education"],
  ["#certifications", "Certifications"],
  ["#testimonials", "Testimonials"],
  ["#contact", "Contact"],
];

export default function Nav({ name }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand">{name || "Hashem"}<span>.analytics</span></a>
        <nav className="nav__links">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <button className="nav__toggle" onClick={() => setOpen(!open)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className="nav__mobile">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </div>
      )}
    </header>
  );
}
