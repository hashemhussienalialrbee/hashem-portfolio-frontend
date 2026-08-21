import { resolveUrl } from "../api";

export default function Activity({ workshops, events }) {
  if (!workshops.length && !events.length) return null;
  return (
    <section id="activity" className="section section--alt">
      <div className="container">
        <div className="activity__grid">
          {workshops.length > 0 && (
            <div>
              <p className="eyebrow">Training</p>
              <h3 className="section-title" style={{ fontSize: "26px" }}>Workshops</h3>
              <div className="activity__list">
                {workshops.map((w) => (
                  <div key={w.id} className="activity-item">
                    <span>{w.icon}</span>
                    <div>
                      <strong>{w.title}</strong>
                      <span>{w.provider}{w.date ? ` · ${w.date}` : ""}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {events.length > 0 && (
            <div>
              <p className="eyebrow">Events</p>
              <h3 className="section-title" style={{ fontSize: "26px" }}>Conferences & Events</h3>
              <div className="activity__list">
                {events.map((e) => (
                  <div key={e.id} className="activity-item">
                    {e.image_url ? (
                      <img className="activity-item__image" src={resolveUrl(e.image_url)} alt={e.title} />
                    ) : (
                      <span>{e.icon}</span>
                    )}
                    <div>
                      <strong>{e.title}</strong>
                      <span>{e.organizer}{e.date ? ` · ${e.date}` : ""}</span>
                      {e.link && (
                        <a href={e.link} target="_blank" rel="noreferrer">View post ↗</a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
