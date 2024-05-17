
import './App.css'
import React from 'react'
import Keyboard from './components/Keyboard';
import Levels from './components/Levels'
import Table from './components/Table'

function App() {

  return (
    <>
      <section id="head">
        <div id="error">
        </div>
        <div className="title">
          <h1>ADIVINA LA PALABRA</h1>
          <h3>MODO PROGRAMACION</h3>
          <Levels/>
        </div>
      </section>
      <Table/>
      <Keyboard />
    </>
  )
}

export default App
