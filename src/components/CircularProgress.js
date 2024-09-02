import React from 'react';
import '../styles/circularProgress.css'; 

const CircularProgress = ({ value }) => {
  const clampedValue = Math.max(0, Math.min(value, 10)); // Ensure value is between 0 and 10
  const waterLevel = `${(clampedValue / 10) * 100}%`; // Convert value to percentage

  return (
    <div className="circle-prog">
      {/* Water level that fills based on the value */}
      <div className="water" style={{ height: waterLevel }}></div>
      {/* Display the value inside the circle */}
      <div className="circle-number">
        {clampedValue}
      </div>
    </div>
  );
};

export default CircularProgress;
