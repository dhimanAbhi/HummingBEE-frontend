import React from 'react';
import "../styles/sidebar.css"

const Sidebar = ({ selectedCategory, setSelectedCategory, contentType, setContentType }) => {
  const categories = ["positivity", "engagement", "meaning", "relationships"];

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <h2>Humming BEE</h2>
      </div>
      <nav className="sidebar-menu">
        <ul>
          {categories.map(category => (
            <li 
              key={category} 
              className={`menu-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-category">
        <h3>Category</h3>
        <ul>
          <li 
            className={`category-item ${contentType === 'blogs' ? 'active' : ''}`}
            onClick={() => setContentType('blogs')}
          >
            Blogs/Articles
          </li>
          <li 
            className={`category-item ${contentType === 'videos' ? 'active' : ''}`}
            onClick={() => setContentType('videos')}
          >
            Videos
          </li>
        </ul>
      </div>
      <div className="sidebar-logout">
        <button>Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;
