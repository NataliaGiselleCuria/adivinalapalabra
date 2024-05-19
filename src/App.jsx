
import './App.css'
import React from 'react'
import Keyboard from './components/Keyboard';
import Levels from './components/Levels'
import Table from './components/Table'
import Statistics from './components/Statistics'
import Config from './components/Config';

function App() {

  return (
    <>
      <canvas id="canvas"></canvas>
      <section id="head">
        <div id="error">
        </div>
        <div className="title">
          <Config/>
          <h1>ADIVINA LA PALABRA</h1>
          <h3>MODO PROGRAMACION</h3>
          <Levels/>
        </div>
      </section>
      <Table/>
      <Keyboard />
      <Statistics/>
    </>
  )
}

export default App
