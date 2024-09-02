import React from 'react';

const Marquee = ({ text, speed = 10, fontSize = '24px', color = 'blue' }) => {
  const marqueeStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color,
    position: 'relative',
    width:'100vw',
    height:'4vh',
    position:'absolute',
    background:'orange',
    left:0
  };

  const contentStyle = {
    display: 'inline-block',
    paddingLeft: '100%',
    animation: `marquee ${speed}s linear infinite`,
    position: 'absolute',
    color:'white'
  };

  const keyframesStyle = `
    @keyframes marquee {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  `;

  return (
    <div style={marqueeStyle}>
      <style>{keyframesStyle}</style>
      <div style={contentStyle}>
        {text}
      </div>
    </div>
  );
};

export default Marquee;


