export default function Education({ education, languages }) {
  if (!education.length && !languages.length) return null;
  return (
    <section id="education" className="section section--alt">
      <div className="container">
        <p className="eyebrow">Academic Foundation</p>
        <h2 className="section-title">Education & Training</h2>
        <div className="grid grid--education">
          {education.map((e) => (
            <div key={e.id} className="edu-card card">
              <span>{e.icon}</span>
              <div>
                <h4>{e.degree}</h4>
                {e.field && <p className="edu-card__field">{e.field}</p>}
                <p className="edu-card__inst">{e.institution}</p>
                {e.period && <p className="edu-card__period">{e.period}</p>}
                {e.description && <p className="edu-card__desc">{e.description}</p>}
              </div>
            </div>
          ))}
        </div>
        {languages.length > 0 && (
          <div className="languages">
            <h4>Languages</h4>
            <div className="languages__row">
              {languages.map((l) => (
                <div key={l.id} className="pill">{l.flag} {l.name} — {l.level}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
