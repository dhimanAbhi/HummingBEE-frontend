import React from 'react';
import "../styles/thumbnail.css"

const Thumbnail = ({ imageUrl, title, description, link }) => {
  return (
    <div className="thumbnail">
      <img src={imageUrl} alt={title} className="thumbnail-image" />
      <div className="thumbnail-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={link}>Read more</a>
      </div>
    </div>
  );
};

export default Thumbnail;
