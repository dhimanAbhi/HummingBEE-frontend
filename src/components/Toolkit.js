import React, { useState } from 'react';
import "../styles/toolkit.css";
import "../styles/thumbnail.css"
import "../styles/sidebar.css"
import Sidebar from './Sidebar';
import Thumbnail from './Thumbnail';
import { data } from './Tag';

const Toolkit = () => {
  const [selectedCategory, setSelectedCategory] = useState('positivity');
  const [contentType, setContentType] = useState('blogs');

  // Safely access the selected category data
  const categoryData = data[selectedCategory] || {};  // Fallback to an empty object if not found
  const content = categoryData[contentType] || [];    // Fallback to an empty array if not found

  return (
    <div className="toolkit-page">
      <Sidebar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory}
        contentType={contentType}
        setContentType={setContentType}
      />
      <main className="content">
        <div className="category-header">
          <h1>{categoryData.name?.toUpperCase() || "CATEGORY"}</h1>
          <p>{categoryData.description || "Description not available."}</p>
        </div>
        <div className="thumbnails">
          {content.length > 0 ? (
            content.map((item, index) => (
              <Thumbnail
                key={index}
                imageUrl={item.imageUrl}
                title={item.title}
                description={item.description}
                link={item.link}
              />
            ))
          ) : (
            <p>No content available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Toolkit;
