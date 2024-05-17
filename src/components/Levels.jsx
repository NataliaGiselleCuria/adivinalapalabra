import React, { useContext } from 'react'
import '../App.css'
import { dataContext } from '../context/dataContext';

const Levels = () => {

  //nivel actual.
  const {currentLevel, onChangeLevel} = useContext(dataContext);

  //graficar el nivel altual.
  const graphLevel = (currentLevel) => {
    let levels = document.querySelectorAll('#level');

    const levelClasses = ['easy', 'normal', 'medium', 'hard'];

    levels.forEach((lv, index) => {
        lv.removeAttribute('class');
        if (index < currentLevel - 5) {
            lv.setAttribute('class', levelClasses[index]);
        }
    });

  }

  return (
    <div id="difficulty">
    <div className="bar">
        <div role="button">
          <i id="levelDown" className="pickLevel fa-solid fa-angle-left" onClick={() => {onChangeLevel(currentLevel>6 ? currentLevel-1 : currentLevel); graphLevel(currentLevel>6 ? currentLevel-1 : currentLevel)}}></i>
        </div>
        <div>
            <span id="level" className="easy"></span>
            <span id="level" ></span>
            <span id="level" ></span>
            <span id="level" ></span>
        </div>
        <div role="button">
          <i id="levelUp" className="pickLevel fa-solid fa-angle-right" onClick={() =>{onChangeLevel(currentLevel<9 ? currentLevel+1 : currentLevel); graphLevel(currentLevel<9 ?currentLevel+1 : currentLevel)}}></i>
        </div>
    </div>
    <div>
        <p id="levelText">{currentLevel} LETRAS</p>
    </div>
</div>
  )
}

export default Levels
