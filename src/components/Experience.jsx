export default function Experience({ experience }) {
  if (!experience.length) return null;
  return (
    <section id="experience" className="section">
      <div className="container">
        <p className="eyebrow">Career Path</p>
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          {experience.map((e) => (
            <div key={e.id} className="timeline__item">
              <div className="timeline__period">{e.period}</div>
              <div className="timeline__body card">
                <h4>{e.title}</h4>
                <p className="timeline__org">{e.organization}</p>
                <ul>
                  {(e.bullets || "").split("\n").filter(Boolean).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
