import "./MainPage.css";
import Header from "../../components/Header/Header.jsx";
import Timers from "../../components/Timers/Timers.jsx";
import plusIcon from "./../../assets/images/plus-icon.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function MainPage() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="container">
      <Header>
        <button onClick={() => setIsEditing(!isEditing)}>Править</button>
        <Link to="/add">
          <img src={plusIcon} alt="add" />
        </Link>
      </Header>
      <h1 className="main-page__title">Таймеры</h1>
      <Timers isEditing={isEditing}/>
    </div>
  );
}

export default MainPage;
