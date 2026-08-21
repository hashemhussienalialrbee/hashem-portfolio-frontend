export default function Tools({ tools }) {
  if (!tools.length) return null;
  return (
    <section id="tools" className="section">
      <div className="container">
        <p className="eyebrow">Tools</p>
        <h2 className="section-title">Tech Stack & Platforms</h2>
        <div className="grid grid--tools">
          {tools.map((t) => (
            <div key={t.id} className="tool-card card">
              <span>{t.icon}</span>
              <div>
                <h4>{t.name}</h4>
                <p>{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
