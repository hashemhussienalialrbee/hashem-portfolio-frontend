export default function About({ profile }) {
  const tags = (profile?.skills_tags || "").split(",").map((t) => t.trim()).filter(Boolean);
  return (
    <section id="about" className="section">
      <div className="container">
        <p className="eyebrow">About Me</p>
        <h2 className="section-title">Making Your Data Work For You</h2>
        <div className="about__grid">
          <div className="about__text">
            {(profile?.about || "").split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {tags.length > 0 && (
            <div className="about__tags">
              {tags.map((t) => (
                <span key={t} className="pill">{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
