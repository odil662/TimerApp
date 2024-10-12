import "./Timers.css";
import Timer from "../Timer/Timer.jsx";
import { TimerContext } from "../../contexts/TimerContext";
import { useContext } from "react";

function Timers({ isEditing }) {
  const { timers } = useContext(TimerContext);
    
  console.log(timers);

  return (
    <ul className="timers">
      {timers.map((timer) => (
        <Timer
          key={timer.id}
          startTime={timer.startTime}
          endTime={timer.endTime}
          timePlus={timer.timeLeft}
          id={timer.id}
          isStartedPlus={timer.isStarted}
        //   lastTimePlus={timer.lastTime}
          isEditing={isEditing}
        />
      ))}
    </ul>
  );
}

export default Timers;
