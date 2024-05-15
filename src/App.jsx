
import './App.css'
import React, { useContext, useEffect } from 'react'
import Keyboard from './components/Keyboard';
import Levels from './components/Levels'
import Table from './components/Table'
import { dataContext } from './context/dataContext';
import { localStorageContext } from './context/localStorageContext';


function App() {

  //nivel actual.
  const {currentLevel, onChangeLevel} = useContext(dataContext);

  //LocalStorage.
  const { setWordsLevels } = useContext(localStorageContext);
  const { checkSavedPlay } = useContext(localStorageContext);


  useEffect(() => {
    setWordsLevels()
    checkSavedPlay()
  }, []);

  return (
    <>
      <section id="head">
        <div id="error">
        </div>
        <div className="title">
          <h1>ADIVINA LA PALABRA</h1>
          <h3>MODO PROGRAMACION</h3>
          <Levels level={currentLevel} setLevel={onChangeLevel} />
        </div>
      </section>
      <Table level={currentLevel} />
      <Keyboard />
    </>
  )
}

export default App
