import React from 'react';
import '../styles/waterLevel.css';

const WaterLevelCircle = ({ value }) => {
  const waterLevel = `${value * 10}%`;

  return (
    <div className="circle">
      <div className="wave" style={{ bottom: `calc(${waterLevel} - 5px)` }}></div>
      <div className="wave second-wave" style={{ bottom: `calc(${waterLevel} - 5px)` }}></div>
      <div className="circle-number">
        {value}
      </div>
    </div>
  );
};

export default WaterLevelCircle;
