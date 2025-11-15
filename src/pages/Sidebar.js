// In Sidebar.js
import { Link } from "react-router-dom";
import courseData from "../data/courseData";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {Object.keys(courseData).map((section) => {
        const slug = section.toLowerCase().replace(/\s+/g, "-");
        return (
          <Link key={slug} to={`/${slug}`} className="section-link">
            {section}
          </Link>
        );
      })}
    </div>
  );
};