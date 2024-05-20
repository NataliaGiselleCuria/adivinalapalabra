import React, { useContext, useState } from 'react'
import { dataContext } from '../context/dataContext'

const Config = () => {

    const { openStatics, openQuestion } = useContext(dataContext)

    function handleClickOpenStatics(){
        openStatics()
    }

    //modo oscuro
    const [darkMode, setDarkMode] = useState(false);

    const handleToggleSwitch = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('active');
    };

  return (
    <>
        <div className="config">
            <i className="fa-solid fa-question" onClick={openQuestion}></i>
            <i className="fa-solid fa-square-poll-vertical" onClick={handleClickOpenStatics}></i>          
        </div>
        <div className="switch-wrapp">
        <i className={`switch ${darkMode ? 'active' : ''}`} onClick={handleToggleSwitch}>
            <i className="fa-solid fa-sun"></i>
            <i className="fa-solid fa-moon"></i>
        </i>
        </div> 
    </>
  )
}

export default Config
