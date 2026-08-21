import { useRef, useState } from "react";
import { api, resolveUrl } from "../api";

export default function ImageUploadField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const { url } = await api.uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <label className="crud__field">
      <span>{label}</span>
      <div className="image-field">
        {value ? (
          <div className="image-field__preview">
            <img src={resolveUrl(value)} alt="" />
            <button type="button" className="image-field__remove" onClick={() => onChange("")}>
              Remove
            </button>
          </div>
        ) : (
          <div className="image-field__empty">No image selected</div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleFile}
          disabled={uploading}
        />
        {uploading && <span className="image-field__status">Uploading…</span>}
        {error && <span className="crud__error" style={{ marginTop: 6 }}>{error}</span>}
      </div>
    </label>
  );
}
