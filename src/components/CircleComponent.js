import React from 'react';
import '../styles/circlecomponent.css';

const CircleComponent = ({ circles }) => {
  // Function to map radius input (1-10) to actual pixel sizes (e.g., 15px - 75px)
  const mapRadiusToSize = (radius) => radius * 7.5; // Mapping 1-10 to 15px - 75px

  return (
    <div className="circle-square-container">
      {circles.map((circle, index) => (
        <div
          key={index}
          className="circle-sqaure"
          style={{
            width: `${mapRadiusToSize(circle.radius)}px`,
            height: `${mapRadiusToSize(circle.radius)}px`,
            backgroundColor: circle.color,
            left: circle.left,
            top: circle.top,
          }}
        />
      ))}
    </div>
  );
};

export default CircleComponent;
