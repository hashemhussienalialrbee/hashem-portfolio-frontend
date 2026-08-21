import { useEffect, useState } from "react";
import { api } from "../api";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Tools from "../components/Tools";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Certifications from "../components/Certifications";
import Activity from "../components/Activity";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

const EMPTY = {
  profile: {}, contact: {}, projects: [], tools: [], skills: [],
  experience: [], education: [], languages: [], certifications: [],
  workshops: [], events: [], testimonials: [],
};

export default function Home() {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [profile, contact, projects, tools, skills, experience, education,
          languages, certifications, workshops, events, testimonials] = await Promise.all([
          api.getProfile(), api.getContact(), api.list("projects"), api.list("tools"),
          api.list("skills"), api.list("experience"), api.list("education"),
          api.list("languages"), api.list("certifications"), api.list("workshops"),
          api.list("events"), api.list("testimonials"),
        ]);
        if (!cancelled) {
          setData({ profile, contact, projects, tools, skills, experience, education,
            languages, certifications, workshops, events, testimonials });
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) { setError(e.message); setLoading(false); }
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return <div className="page-loading">Loading…</div>;
  }
  if (error) {
    return (
      <div className="page-loading">
        Couldn't connect to the server. Make sure the backend is running. <br />
        <span style={{ opacity: 0.6, fontSize: 13 }}>{error}</span>
      </div>
    );
  }

  return (
    <>
      <Nav name={data.profile?.name} />
      <Hero profile={data.profile} />
      <About profile={data.profile} />
      <Projects projects={data.projects} />
      <Tools tools={data.tools} />
      <Skills skills={data.skills} />
      <Experience experience={data.experience} />
      <Education education={data.education} languages={data.languages} />
      <Certifications certifications={data.certifications} />
      <Activity workshops={data.workshops} events={data.events} />
      <Testimonials testimonials={data.testimonials} />
      <Contact contact={data.contact} name={data.profile?.name} />
    </>
  );
}
