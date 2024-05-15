import React, { useState, useRef } from 'react'
import '../App.css'

const Levels = ({ level, setLevel }) => {

  const graphLevel = (level) => {
    let levels = document.querySelectorAll('#level');

    const levelClasses = ['easy', 'normal', 'medium', 'hard'];

    levels.forEach((lv, index) => {
        lv.removeAttribute('class');
        if (index < level - 5) {
            lv.setAttribute('class', levelClasses[index]);
        }
    });

  }

  return (
    <div id="difficulty">
    <div className="bar">
        <span><i id="levelDown" className="pickLevel fa-solid fa-angle-left" onClick={() => {setLevel(level>6 ? level-1 : level); graphLevel(level>6 ? level-1 : level)}}></i></span>
        <div>
            <span id="level" className="easy"></span>
            <span id="level" ></span>
            <span id="level" ></span>
            <span id="level" ></span>

        </div>
        <span><i id="levelUp" className="pickLevel fa-solid fa-angle-right" onClick={() =>{setLevel(level<9 ?level+1 : level); graphLevel(level<9 ?level+1 : level)}}></i></span>
    </div>
    <div>
        <p id="levelText">{level} LETRAS</p>
    </div>
</div>
  )
}

export default Levels
