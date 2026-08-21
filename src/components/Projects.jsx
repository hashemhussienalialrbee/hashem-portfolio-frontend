import { resolveUrl } from "../api";

export default function Projects({ projects }) {
  return (
    <section id="projects" className="section section--alt">
      <div className="container">
        <p className="eyebrow">My Work</p>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-sub">Real data analytics and business intelligence work built with Power BI, SQL, and Python.</p>
        <div className="grid grid--projects">
          {projects.map((p) => {
            const tools = (p.tools || "").split(",").map((t) => t.trim()).filter(Boolean);
            const metrics = (p.metrics || "")
              .split(",")
              .map((m) => m.split(":"))
              .filter((m) => m.length === 2);
            return (
              <article key={p.id} className="project-card card">
                {p.image_url && (
                  <div className="project-card__image">
                    <img src={resolveUrl(p.image_url)} alt={p.title} />
                  </div>
                )}
                <div className="project-card__head">
                  <span className="project-card__icon">{p.icon}</span>
                  {p.category && <span className="pill">{p.category}</span>}
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                {metrics.length > 0 && (
                  <div className="project-card__metrics">
                    {metrics.map(([k, v]) => (
                      <div key={k}>
                        <strong>{v}</strong>
                        <span>{k}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="project-card__tools">
                  {tools.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                {p.github_url && (
                  <a href={p.github_url} target="_blank" rel="noreferrer" className="project-card__link">
                    View on GitHub ↗
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
