// ProgressBar.js
import React, { useEffect, useState } from 'react';

const ProgressBar = ({ onTimeUp, started }) => {
  const [remainingTime, setRemainingTime] = useState(60);
  const totalTime = 60;

  useEffect(() => {
    let intervalId;

    if (started) {
      intervalId = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime(remainingTime - 1);
        } else {
          clearInterval(intervalId);
          // Time's up, trigger the callback
          onTimeUp();
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [remainingTime, onTimeUp, started]);

  const progress = (remainingTime / totalTime) * 100;

  return (
    <div style={{ width: '8rem' }}>
      <div style={{ position: 'relative', height: '30px', borderRadius: '5px', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'blue', borderRadius: '5px' }}></div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'lime', zIndex: 10 }}>
          {remainingTime}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
