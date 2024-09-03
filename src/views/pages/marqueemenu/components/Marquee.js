
import React from 'react';
  
const Marquee = () => {
  const marqueeStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'white',
    height:'4vh',
    position:'absolute',
    width:'100vw',
    background:'#666CFF',
    left:0,
    bottom:0
  };

  const contentStyle = {
    display: 'inline-block',
    animation: 'marquee 35s linear infinite',
    position: 'absolute',
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
        Welcome to the Demo Form! Welcome to the Demo Form! Welcome to the Demo Form! Welcome to the Demo Form!
      </div>
    </div>
  );
};

export default Marquee;
  