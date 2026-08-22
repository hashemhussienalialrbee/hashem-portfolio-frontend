import ContourBackground from "./ContourBackground";
import { resolveUrl } from "../api";

export default function Hero({ profile }) {
  const stats = [profile?.stat_projects, profile?.stat_hours, profile?.stat_data].filter(Boolean);
  return (
    <section id="top" className="hero">
      <ContourBackground />
      <div className="container hero__grid">
        <div className="hero__inner">
          <p className="pill">Available for new projects</p>
          <h1 className="hero__title">{profile?.name || "Hashem Al Rabee"}</h1>
          <p className="hero__role">{profile?.title || "Data Analyst"}</p>
          <p className="hero__tagline">{profile?.tagline}</p>
          <div className="hero__cta">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-outline">Get in Touch</a>
          </div>
          {stats.length > 0 && (
            <div className="hero__stats">
              {stats.map((s, i) => (
                <div key={i} className="hero__stat">{s}</div>
              ))}
            </div>
          )}
          {profile?.badge_text && (
            <div className="hero__badge">🏆 {profile.badge_text}</div>
          )}
        </div>
        {profile?.photo_url && (
          <div className="hero__photo-wrap">
            <img className="hero__photo" src={resolveUrl(profile.photo_url)} alt={profile?.name || "Profile photo"} />
          </div>
        )}
      </div>
    </section>
  );
}
