import React, { useEffect, useState } from 'react';
import '../styles/CircularProgress.css';

const CircularProgress = ({ radius, stroke, progress, number, parameter }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    setAnimatedProgress(progress);
  }, [progress]);

  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div className="circle-container">
      <svg
        height={radius * 2}
        width={radius * 2}
      >
        <circle
          className="circle-background"
          stroke="lightgrey"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="circle-progress"
          stroke="#008080"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            '--stroke-dashoffset': strokeDashoffset,
            '--circumference': circumference,
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text
          x="50%"
          y="36%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="circle-parameter"
        >
          {parameter}
        </text>
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="circle-number-one"
        >
          {number}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;
