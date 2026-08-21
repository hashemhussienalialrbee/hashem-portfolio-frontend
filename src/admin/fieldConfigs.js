// Defines the editable fields for each resource so the generic CRUD
// manager can render the right form + table columns automatically.
export const RESOURCES = {
  projects: {
    label: "Projects",
    fields: [
      { key: "icon", label: "Icon (emoji)", type: "text", width: "80px" },
      { key: "category", label: "Category", type: "text" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "tools", label: "Tools (comma-separated)", type: "text" },
      { key: "metrics", label: "Metrics (e.g. Revenue:$26.8M,Margin:48%)", type: "text" },
      { key: "github_url", label: "GitHub URL", type: "text" },
      { key: "image_url", label: "Project Image / Screenshot", type: "image" },
      { key: "order", label: "Order", type: "number" },
    ],
    columns: ["icon", "title", "category"],
  },
  tools: {
    label: "Tools & Tech",
    fields: [
      { key: "icon", label: "Icon", type: "text", width: "80px" },
      { key: "name", label: "Name", type: "text", required: true },
      { key: "description", label: "Description", type: "text" },
      { key: "order", label: "Order", type: "number" },
    ],
    columns: ["icon", "name", "description"],
  },
  education: {
    label: "Education & Training",
    fields: [
      { key: "icon", label: "Icon", type: "text", width: "80px" },
      { key: "degree", label: "Degree / Title", type: "text", required: true },
      { key: "field", label: "Field of Study", type: "text" },
      { key: "institution", label: "Institution", type: "text" },
      { key: "period", label: "Period", type: "text" },
      { key: "description", label: "Additional Description", type: "textarea" },
      { key: "order", label: "Order", type: "number" },
    ],
    columns: ["icon", "degree", "institution"],
  },
  certifications: {
    label: "Certifications",
    fields: [
      { key: "category", label: "Category", type: "text" },
      { key: "title", label: "Certificate Title", type: "text", required: true },
      { key: "issuer", label: "Issuer", type: "text" },
      { key: "date", label: "Date", type: "text" },
      { key: "image_url", label: "Badge / Certificate Image", type: "image" },
      { key: "order", label: "Order", type: "number" },
    ],
    columns: ["title", "issuer", "category"],
  },
  experience: {
    label: "Experience",
    fields: [
      { key: "period", label: "Period", type: "text" },
      { key: "title", label: "Job Title", type: "text", required: true },
      { key: "organization", label: "Organization", type: "text" },
      { key: "bullets", label: "Details (one bullet per line)", type: "textarea" },
      { key: "order", label: "Order", type: "number" },
    ],
    columns: ["title", "organization", "period"],
  },
  languages: {
    label: "Languages",
    fields: [
      { key: "flag", label: "Flag / icon", type: "text", width: "80px" },
      { key: "name", label: "Language", type: "text", required: true },
      { key: "level", label: "Level", type: "text" },
      { key: "order", label: "Order", type: "number" },
    ],
    columns: ["flag", "name", "level"],
  },
  workshops: {
    label: "Workshops",
    fields: [
      { key: "icon", label: "Icon", type: "text", width: "80px" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "provider", label: "Provider", type: "text" },
      { key: "date", label: "Date", type: "text" },
      { key: "order", label: "Order", type: "number" },
    ],
    columns: ["icon", "title", "provider"],
  },
  events: {
    label: "Events & Conferences",
    fields: [
      { key: "icon", label: "Icon", type: "text", width: "80px" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "organizer", label: "Organizer", type: "text" },
      { key: "date", label: "Date", type: "text" },
      { key: "link", label: "Post URL", type: "text" },
      { key: "image_url", label: "Event Photo", type: "image" },
      { key: "order", label: "Order", type: "number" },
    ],
    columns: ["icon", "title", "organizer"],
  },
  skills: {
    label: "Skills",
    fields: [
      { key: "category", label: "Category", type: "text" },
      { key: "name", label: "Skill", type: "text", required: true },
      { key: "percentage", label: "Percentage %", type: "number" },
      { key: "order", label: "Order", type: "number" },
    ],
    columns: ["name", "category", "percentage"],
  },
  testimonials: {
    label: "Testimonials",
    fields: [
      { key: "initials", label: "Initials", type: "text", width: "100px" },
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role", type: "text" },
      { key: "text", label: "Testimonial Text", type: "textarea", required: true },
      { key: "rating", label: "Rating (1-5)", type: "number" },
      { key: "order", label: "Order", type: "number" },
    ],
    columns: ["name", "role"],
  },
};

export function emptyItemFor(resourceKey) {
  const item = {};
  RESOURCES[resourceKey].fields.forEach((f) => {
    item[f.key] = f.type === "number" ? 0 : "";
  });
  return item;
}
