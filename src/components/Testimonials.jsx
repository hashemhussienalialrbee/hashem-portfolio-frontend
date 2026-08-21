export default function Testimonials({ testimonials }) {
  if (!testimonials.length) return null;
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <p className="eyebrow">What People Say</p>
        <h2 className="section-title">Testimonials</h2>
        <div className="grid grid--testimonials">
          {testimonials.map((t) => (
            <figure key={t.id} className="testimonial-card card">
              <div className="testimonial-card__stars">{"⭐".repeat(t.rating || 5)}</div>
              <blockquote>{t.text}</blockquote>
              <figcaption>
                <span className="testimonial-card__avatar">{t.initials}</span>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
