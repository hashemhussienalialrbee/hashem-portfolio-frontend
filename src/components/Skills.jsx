export default function Skills({ skills }) {
  if (!skills.length) return null;
  const groups = {};
  skills.forEach((s) => {
    const cat = s.category || "Other";
    groups[cat] = groups[cat] || [];
    groups[cat].push(s);
  });

  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <p className="eyebrow">Technical Expertise</p>
        <h2 className="section-title">Skills</h2>
        <div className="grid grid--skills">
          {Object.entries(groups).map(([cat, items]) => (
            <div key={cat} className="skill-group card">
              <h4>{cat}</h4>
              {items.map((s) => (
                <div key={s.id} className="skill-bar">
                  <div className="skill-bar__label">
                    <span>{s.name}</span>
                    <span className="skill-bar__pct">{s.percentage}%</span>
                  </div>
                  <div className="skill-bar__track">
                    <div className="skill-bar__fill" style={{ width: `${s.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
