import { useEffect, useState } from "react";
import { api } from "../api";
import ImageUploadField from "./ImageUploadField";

export default function ProfileEditor() {
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { api.getProfile().then(setForm); }, []);

  if (!form) return <p className="crud__empty">Loading…</p>;

  async function handleSave(e) {
    e.preventDefault();
    setBusy(true);
    setSaved(false);
    const payload = { ...form };
    delete payload.id;
    await api.updateProfile(payload);
    setBusy(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <form className="editor-form" onSubmit={handleSave}>
      <h3>Profile (Homepage & About)</h3>
      {saved && <p className="crud__saved">✓ Saved</p>}
      <ImageUploadField
        label="Profile Photo"
        value={form.photo_url}
        onChange={(url) => setForm({ ...form, photo_url: url })}
      />
      <label className="crud__field"><span>Name</span><input value={form.name} onChange={set("name")} /></label>
      <label className="crud__field"><span>Job Title</span><input value={form.title} onChange={set("title")} /></label>
      <label className="crud__field"><span>Hero Tagline</span><textarea rows={3} value={form.tagline} onChange={set("tagline")} /></label>
      <label className="crud__field"><span>About Me (separate paragraphs with a blank line)</span><textarea rows={6} value={form.about} onChange={set("about")} /></label>
      <label className="crud__field"><span>Achievement Badge (optional)</span><input value={form.badge_text} onChange={set("badge_text")} /></label>
      <div className="editor-form__row">
        <label className="crud__field"><span>Stat 1</span><input value={form.stat_projects} onChange={set("stat_projects")} /></label>
        <label className="crud__field"><span>Stat 2</span><input value={form.stat_hours} onChange={set("stat_hours")} /></label>
        <label className="crud__field"><span>Stat 3</span><input value={form.stat_data} onChange={set("stat_data")} /></label>
      </div>
      <label className="crud__field"><span>Skill Tags (comma-separated)</span><textarea rows={2} value={form.skills_tags} onChange={set("skills_tags")} /></label>
      <button className="btn btn-primary" disabled={busy}>{busy ? "Saving…" : "Save Changes"}</button>
    </form>
  );
}
