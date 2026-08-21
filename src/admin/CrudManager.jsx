import { useEffect, useState } from "react";
import { api } from "../api";
import { RESOURCES, emptyItemFor } from "./fieldConfigs";
import ImageUploadField from "./ImageUploadField";

export default function CrudManager({ resourceKey }) {
  const config = RESOURCES[resourceKey];
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyItemFor(resourceKey));
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function reload() {
    setLoading(true);
    const data = await api.list(resourceKey);
    setItems(data);
    setLoading(false);
  }

  useEffect(() => { reload(); }, [resourceKey]);

  function startAdd() {
    setForm(emptyItemFor(resourceKey));
    setEditingId(null);
    setShowForm(true);
    setError(null);
  }

  function startEdit(item) {
    setForm({ ...item });
    setEditingId(item.id);
    setShowForm(true);
    setError(null);
  }

  async function handleSave(e) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const payload = { ...form };
      delete payload.id;
      config.fields.forEach((f) => {
        if (f.type === "number") payload[f.key] = Number(payload[f.key]) || 0;
      });
      if (editingId) {
        await api.update(resourceKey, editingId, payload);
      } else {
        await api.create(resourceKey, payload);
      }
      setShowForm(false);
      await reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this? This cannot be undone.")) return;
    await api.remove(resourceKey, id);
    await reload();
  }

  return (
    <div className="crud">
      <div className="crud__head">
        <h3>{config.label}</h3>
        <button className="btn btn-primary btn-sm" onClick={startAdd}>+ Add Item</button>
      </div>

      {loading ? (
        <p className="crud__empty">Loading…</p>
      ) : items.length === 0 ? (
        <p className="crud__empty">No items yet. Add your first one.</p>
      ) : (
        <div className="crud__table-wrap">
          <table className="crud__table">
            <thead>
              <tr>
                {config.columns.map((c) => (
                  <th key={c}>{config.fields.find((f) => f.key === c)?.label || c}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {config.columns.map((c) => (
                    <td key={c}>{String(item[c] ?? "").slice(0, 60)}</td>
                  ))}
                  <td className="crud__actions">
                    <button className="btn-icon" onClick={() => startEdit(item)} title="Edit">✏️</button>
                    <button className="btn-icon" onClick={() => handleDelete(item.id)} title="Delete">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="crud__modal-backdrop" onClick={() => setShowForm(false)}>
          <form className="crud__modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSave}>
            <h4>{editingId ? "Edit Item" : "Add New Item"}</h4>
            {error && <p className="crud__error">{error}</p>}
            {config.fields.map((f) => (
              f.type === "image" ? (
                <ImageUploadField
                  key={f.key}
                  label={f.label}
                  value={form[f.key]}
                  onChange={(url) => setForm({ ...form, [f.key]: url })}
                />
              ) : (
              <label key={f.key} className="crud__field">
                <span>{f.label}{f.required && " *"}</span>
                {f.type === "textarea" ? (
                  <textarea
                    rows={4}
                    required={f.required}
                    value={form[f.key] ?? ""}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  />
                ) : (
                  <input
                    type={f.type === "number" ? "number" : "text"}
                    required={f.required}
                    value={form[f.key] ?? ""}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  />
                )}
              </label>
              )
            ))}
            <div className="crud__modal-actions">
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={busy}>
                {busy ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
