import { useState, useRef, useCallback, useEffect } from 'react';

export function usePomodoro() {
  const [duration, setDuration] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [task, setTask] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, timeLeft]);

  const start = useCallback(() => {
    if (timeLeft > 0) {
      setIsActive(true);
    }
  }, [timeLeft]);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback((minutes = 25) => {
    setIsActive(false);
    const seconds = minutes * 60;
    setDuration(seconds);
    setTimeLeft(seconds);
  }, []);

  const formatTime = useCallback((seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }, []);

  return {
    timeLeft,
    isActive,
    duration,
    task,
    start,
    pause,
    reset,
    setTask,
    formatTime,
  };
}

export default usePomodoro;
