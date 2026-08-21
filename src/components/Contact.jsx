export default function Contact({ contact, name }) {
  return (
    <section id="contact" className="section section--contact">
      <div className="container contact__inner">
        <p className="eyebrow" style={{ color: "var(--cream)" }}>Let's Talk</p>
        <h2 className="contact__title">{contact?.headline || "Let's Turn Your Data Into Decisions"}</h2>
        <p className="contact__sub">{contact?.subtext}</p>
        <div className="contact__actions">
          {contact?.email && <a className="btn btn-primary" href={`mailto:${contact.email}`}>{contact.email}</a>}
          {contact?.linkedin && <a className="btn btn-outline-light" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
          {contact?.phone && <a className="btn btn-outline-light" href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>}
          {contact?.cv_link && <a className="btn btn-outline-light" href={contact.cv_link} target="_blank" rel="noreferrer">Download CV</a>}
        </div>
      </div>
      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} — {name || "Hashem Al-Rabiee"} · {contact?.location || "Amman, Jordan"}
        </div>
      </footer>
    </section>
  );
}
