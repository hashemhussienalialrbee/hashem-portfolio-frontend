import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../api";
import { RESOURCES } from "./fieldConfigs";
import CrudManager from "./CrudManager";
import ProfileEditor from "./ProfileEditor";
import ContactEditor from "./ContactEditor";

const TABS = [
  { key: "profile", label: "Profile" },
  ...Object.entries(RESOURCES).map(([key, cfg]) => ({ key, label: cfg.label })),
  { key: "contact", label: "Contact" },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("profile");
  const navigate = useNavigate();

  function handleLogout() {
    setToken(null);
    navigate("/admin/login");
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">🔒 Admin Dashboard</div>
        <nav>
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`admin-sidebar__link ${active === t.key ? "active" : ""}`}
              onClick={() => setActive(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <a href="/" className="admin-sidebar__view">↗ View site</a>
        <button className="admin-sidebar__logout" onClick={handleLogout}>Log out</button>
      </aside>
      <main className="admin-main">
        {active === "profile" && <ProfileEditor />}
        {active === "contact" && <ContactEditor />}
        {RESOURCES[active] && <CrudManager resourceKey={active} />}
      </main>
    </div>
  );
}
