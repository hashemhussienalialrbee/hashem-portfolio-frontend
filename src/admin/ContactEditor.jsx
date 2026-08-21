import { useEffect, useState } from "react";
import { api } from "../api";

export default function ContactEditor() {
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { api.getContact().then(setForm); }, []);

  if (!form) return <p className="crud__empty">Loading…</p>;

  async function handleSave(e) {
    e.preventDefault();
    setBusy(true);
    setSaved(false);
    const payload = { ...form };
    delete payload.id;
    await api.updateContact(payload);
    setBusy(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <form className="editor-form" onSubmit={handleSave}>
      <h3>Contact Information</h3>
      {saved && <p className="crud__saved">✓ Saved</p>}
      <label className="crud__field"><span>Contact Section Headline</span><input value={form.headline} onChange={set("headline")} /></label>
      <label className="crud__field"><span>Subtext</span><textarea rows={2} value={form.subtext} onChange={set("subtext")} /></label>
      <label className="crud__field"><span>Email</span><input value={form.email} onChange={set("email")} /></label>
      <label className="crud__field"><span>Phone Number</span><input value={form.phone} onChange={set("phone")} /></label>
      <label className="crud__field"><span>LinkedIn URL</span><input value={form.linkedin} onChange={set("linkedin")} /></label>
      <label className="crud__field"><span>CV / Resume URL</span><input value={form.cv_link} onChange={set("cv_link")} /></label>
      <label className="crud__field"><span>Location</span><input value={form.location} onChange={set("location")} /></label>
      <button className="btn btn-primary" disabled={busy}>{busy ? "Saving…" : "Save Changes"}</button>
    </form>
  );
}
