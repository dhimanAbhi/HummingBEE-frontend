import React, { useState } from 'react';
import '../styles/stressometer.css'; // Import the CSS file

const ButtonBoxes = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const stressParams = [
    { label: 'Low', description: 'Underload' },
    { label: 'Moderate', description: 'Manageable' },
    { label: 'Optimum', description: 'Good Spot' },
    { label: 'Too Much', description: 'Overload' },
    { label: 'High', description: 'Burnout' },
  ];

  const handleClick = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className="button-container">
      {stressParams.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(item.label)}
          className="button-box"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonBoxes;
