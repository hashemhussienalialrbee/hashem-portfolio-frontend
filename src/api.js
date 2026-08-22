export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

function getToken() {
  return localStorage.getItem("admin_token");
}

export function setToken(token) {
  if (token) localStorage.setItem("admin_token", token);
  else localStorage.removeItem("admin_token");
}

export function isLoggedIn() {
  return !!getToken();
}

// Turns a relative "/uploads/xxx.png" path returned by the backend into a
// full URL. Leaves already-absolute URLs (http://... or data:...) untouched.
export function resolveUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) return path;
  return `${API_BASE}${path}`;
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let detail = "Something went wrong";
    try {
      const data = await res.json();
      detail = data.detail || detail;
    } catch (_) {}
    throw new Error(detail);
  }
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

async function uploadImage(file) {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) {
    let detail = "Image upload failed";
    try {
      const data = await res.json();
      detail = data.detail || detail;
    } catch (_) {}
    throw new Error(detail);
  }
  return res.json(); // { url: "/uploads/xxx.png" }
}

export const api = {
  // Auth
  login: (username, password) =>
    request("/api/auth/login", { method: "POST", body: { username, password } }),
  me: () => request("/api/auth/me", { auth: true }),

  // Generic resource CRUD factory
  list: (resource) => request(`/api/${resource}/`),
  create: (resource, data) => request(`/api/${resource}/`, { method: "POST", body: data, auth: true }),
  update: (resource, id, data) => request(`/api/${resource}/${id}`, { method: "PUT", body: data, auth: true }),
  remove: (resource, id) => request(`/api/${resource}/${id}`, { method: "DELETE", auth: true }),

  // Singletons
  getProfile: () => request("/api/profile"),
  updateProfile: (data) => request("/api/profile", { method: "PUT", body: data, auth: true }),
  getContact: () => request("/api/contact"),
  updateContact: (data) => request("/api/contact", { method: "PUT", body: data, auth: true }),

  // Images
  uploadImage,
};
