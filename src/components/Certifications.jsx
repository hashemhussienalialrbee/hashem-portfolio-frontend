import { resolveUrl } from "../api";

export default function Certifications({ certifications }) {
  if (!certifications.length) return null;
  const groups = {};
  certifications.forEach((c) => {
    const cat = c.category || "Other";
    groups[cat] = groups[cat] || [];
    groups[cat].push(c);
  });
  return (
    <section id="certifications" className="section">
      <div className="container">
        <p className="eyebrow">Credentials</p>
        <h2 className="section-title">Certifications</h2>
        <div className="cert-groups">
          {Object.entries(groups).map(([cat, items]) => (
            <div key={cat} className="cert-group">
              <h4>{cat}</h4>
              <div className="cert-group__list">
                {items.map((c) => (
                  <div key={c.id} className="cert-item card">
                    {c.image_url && (
                      <img className="cert-item__image" src={resolveUrl(c.image_url)} alt={c.title} />
                    )}
                    <div>
                      <strong>{c.title}</strong>
                      <span>{c.issuer}{c.date ? ` · ${c.date}` : ""}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
