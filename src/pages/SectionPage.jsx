// src/pages/SectionPage.jsx
import { useParams } from "react-router-dom";
import courseData from "../data/courseData";
import "./SectionPage.css";

export default function SectionPage() {
  const { section } = useParams(); // e.g. "web-technologies"

  const sectionKey = Object.keys(courseData).find(
    (k) => k.toLowerCase().replace(/\s+/g, "-") === section
  );

  if (!sectionKey) {
    return (
      <div className="section-error">
        <h2>Section not found</h2>
        <p>Try one of the links on the left.</p>
      </div>
    );
  }

  const topics = courseData[sectionKey];

  return (
    <section className="section">
      <h1 className="section-title">{sectionKey}</h1>

      <div className="topics-grid">
        {topics.map((topic, i) => (
          <article key={i} className="topic-card">
            <h3 className="topic-name">{topic.name}</h3>
            <div className="topic-links">
              {Object.entries(topic.links).map(([label, url]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="topic-link"
                >
                  {label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
