import "./EditPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import { TimerContext } from "./../../contexts/TimerContext.jsx";
import { useContext, useEffect, useState } from "react";
import { calculateTime } from "../../utils/helpers.js";

const CircularProgressBar = ({ progress, time }) => {
    const radius = 110; // радиус окружности (220px / 2)
    const strokeWidth = 6; // толщина окружности
    const normalizedRadius = radius - strokeWidth * 0.5; // нормализованный радиус
    const circumference = normalizedRadius * 2 * Math.PI; // длина окружности
    const offset = circumference - (progress / 100) * circumference; // смещение для отображения прогресса

    return (
        <svg height={radius * 2} width={radius * 2}>
            <circle
                stroke="transparent"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                stroke="#29A354"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                strokeDasharray={circumference + ' ' + circumference}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 0.5s ease 0s' }} // добавляем плавный переход
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="40"
                fill="#fff"
                fontWeight={"bold"}
            >
                {time} {/* Здесь передаем время */}
            </text>
        </svg>
    );
};

function EditPage() {
    const { id } = useParams();
    const { timers, setTimers } = useContext(TimerContext);
    const navigate = useNavigate();
    const [timer, setTimer] = useState(null);
    const [progress, setProgress] = useState(0);

    const [ timeLeft, setTimeLeft ] = useState(timer?.timeLeft || 0);
  
    useEffect(() => {
      const timerId = parseInt(id, 10); // Преобразование id в число
      const foundTimer = timers.find((timer) => timer.id === timerId);
      setTimer(foundTimer);
    }, [id, timers]);
  
    const handleDelete = () => {
      const newTimers = timers.filter((timer) => timer.id !== id);
      setTimers(newTimers);
      navigate('/');
    };
  
    useEffect(() => {
      if (timer && timer.isStarted) {
        const interval = setInterval(() => {
          const currentTime = Date.now();
          const startTime = timer.startTime;
          const endTime = timer.endTime;
          
          // Вычисление прошедшего времени
          const elapsedTime = currentTime - startTime;
          
          const totalTime = endTime - startTime;
  
          const calculatedProgress = Math.min((elapsedTime / totalTime) * 100, 100);
          setProgress(calculatedProgress);
          setTimeLeft(( prev ) => prev + 1000);
          console.log(timeLeft)
          
        }, 1000); // Обновляем каждые 1000мс

  
        return () => clearInterval(interval); // Очищаем таймер
      }
    }, [timer, timers, timeLeft]);
  
    return (
      <div className="container">
        <Header>
          <Link className="edit-page__link" to="/">
            Таймеры
          </Link>
        </Header>
        <CircularProgressBar progress={progress} time={timer && calculateTime(timer.startTime, timer.endTime, timeLeft)} />
        <div className="edit-page__buttons">
          {timer && timer.isStarted && <button onClick={() => setTimers(()=> timers.map((timer) => timer.id === parseInt(id, 10) ? {...timer, isStarted: false} : timer))}  className="edit-page__pause">Пауза</button>}
          {timer && !timer.isStarted && <button onClick={() => setTimers(()=> timers.map((timer) => timer.id === parseInt(id, 10) ? {...timer, isStarted: true} : timer))} className="edit-page__pause">Возобновить</button>}
          <button onClick={handleDelete} className="edit-page__cancel">Отмена</button>
        </div>
      </div>
    );
  }
  
  export default EditPage;
