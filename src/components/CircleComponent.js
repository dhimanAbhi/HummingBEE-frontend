import React from 'react';
import '../styles/circlecomponent.css';

const CircleComponent = ({ moodParams }) => {
  const stressColors = ['#C271FE', '#FCFF66', '#2BC702', '#FF7304', '#FF020D'];

  // Function to map mood value to radius size
  const mapValueToRadius = (value) => {
    return (value / 100) * 4500; // Maps 0-100 to 0-75px
  };

  // Create circle data based on moodParams.data
  const circles = Object.keys(moodParams.data).map((key, index) => ({
    radius: mapValueToRadius(moodParams.data[key]),
    param: key,
    color: stressColors[index % stressColors.length], // Ensure color index is within bounds
    left: `${(index % 3) * 30 + 10}%`, // Adjust positioning as needed
    top: `${Math.floor(index / 3) * 30 + 10}%`, // Adjust positioning as needed
  }));

  console.log(circles); // Debugging line

  return (
    <div className="circle-square-container">
      {circles.map((circle, index) => (
        <div
          key={index}
          className="circle-sqaure"
          style={{
            width: `${circle.radius}px`,
            height: `${circle.radius}px`,
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
