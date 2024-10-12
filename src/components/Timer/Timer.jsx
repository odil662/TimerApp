import "./Timer.css";

import playButton from "../../assets/images/play-icon.svg";
import pauseButton from "../../assets/images/pause-icon.svg";
import arrowRight from "../../assets/images/right-arrow-icon.svg";
import deleteIcon from "../../assets/images/delete-icon.svg";

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { formatTimeDifference, calculateTime } from "../../utils/helpers";
import { TimerContext } from "../../contexts/TimerContext";

function Timer({
  startTime,
  endTime,
  id,
  timePlus,
  isStartedPlus,
//   lastTimePlus,
  isEditing,
}) {
  const { timers, setTimers } = useContext(TimerContext);
  const [timeLeft, setTimeLeft] = useState(() => timePlus);
  const [isStarted, setIsStarted] = useState(() => isStartedPlus);

  const handleStartTimer = () => {
    const newIsStarted = !isStarted;
    setIsStarted(newIsStarted);

    if (newIsStarted) {
      const storageKey = `timer_${id}`;
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          timeLeft,
          isStarted: newIsStarted,
          lastTime: Date.now(),
        })
      );
    } else {
      const storageKey = `timer_${id}`;
      localStorage.removeItem(storageKey);
    }
  };

  const deleteTimer = () => {
    setTimers(timers.filter((timer) => timer.id !== id));
    if (localStorage.getItem(`timer_${id}`)) {
      localStorage.removeItem(`timer_${id}`);
    }
  };

  useEffect(() => {
    if (isStarted) {
        
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev + 1000);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isStarted]);

  useEffect(() => {
    const storedTimer = localStorage.getItem(`timer_${id}`);
    if (storedTimer) {
      const {
        timeLeft: storedTimeLeft,
        isStarted: storedIsStarted,
        lastTime: storedLastTime,
      } = JSON.parse(storedTimer);
      console.log(storedTimeLeft, storedIsStarted, storedLastTime);
      const elapsedTime = Date.now() - storedLastTime;
      if (storedIsStarted) {
        

        
        setTimeLeft(storedTimeLeft + elapsedTime);
        setIsStarted(true);
      }
    }
  }, [id]);

  return (
    <div className="timer">
      <div className="timer__info-container">
        {isEditing && (
          <button onClick={deleteTimer} className="timer__pause">
            <img src={deleteIcon} alt="pause" />
          </button>
        )}
        <div className="timer__time">
          <p className="timer__clock">
            {calculateTime(startTime, endTime, timeLeft)}
          </p>
          <p className="timer__minutes">
            {formatTimeDifference(startTime, endTime)}
          </p>
        </div>
      </div>

      {isEditing && (
        <Link to={`/edit/${id}`}>
          <img src={arrowRight} alt="Edit" />
        </Link>
      )}
      {!isEditing && (
        <button onClick={handleStartTimer}>
          <img
            src={isStarted ? pauseButton : playButton}
            alt={isStarted ? "Pause" : "Play"}
          />
        </button>
      )}
    </div>
  );
}

export default Timer;
