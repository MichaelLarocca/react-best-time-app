import React, { useState, useEffect } from 'react';
import { format, addMilliseconds, differenceInMilliseconds } from 'date-fns';
import './App.css';

const Timer = () => {
  const [time, setTime] = useState(new Date(0, 0, 0, 0, 0, 0, 0));
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const startTimer = () => {
    if (startTime === null) {
      setStartTime(new Date());
    }
    setRunning(true);
  };

  const pauseTimer = () => {
    if (running) {
      setRunning(false);
    }
  };

  const resumeTimer = () => {
    if (startTime === null) {
      startTimer();
    } else {
      const elapsedTime = differenceInMilliseconds(new Date(), startTime);
      const newStartTime = addMilliseconds(new Date(), -elapsedTime);
      setStartTime(newStartTime);
      setRunning(true);
    }
  };

  const resetTimer = () => {
    setTime(new Date(0, 0, 0, 0, 0, 0, 0));
    setRunning(false);
    setStartTime(null);
  };

  const formattedTime = () => {
    const minutes = format(time, 'mm');
    const seconds = format(time, 'ss');
    const milliseconds = format(time, 'SSS');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  useEffect(() => {
    let interval;
    if (running) {
      const updateTime = () => {
        const now = new Date();
        const elapsed = differenceInMilliseconds(now, startTime);
        setTime(new Date(0, 0, 0, 0, 0, 0, elapsed));
      };
  
      interval = setInterval(updateTime, 10); // Update every 10 milliseconds for better accuracy
      updateTime(); // Update immediately on start
    } else {
      clearInterval(interval);
    }
  
    return () => {
      clearInterval(interval);
    };
  }, [running, startTime]);

  return (
    <div className='timer'>
      <h1>STOPWATCH</h1>
      <div className='buttons'>
        <button onClick={startTimer}>Start</button>
        {running ? (
          <button onClick={pauseTimer}>Pause</button>
        ) : (
          <button onClick={resumeTimer}>Resume</button>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
      <h1>{formattedTime()}</h1>
    </div>
  );
};

export default Timer;