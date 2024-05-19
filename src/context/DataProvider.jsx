import React, { useEffect, useMemo, useRef, useState } from 'react'
import { dataContext } from './dataContext'


const DataProvider = ({ children }) => {

  //estado del juego.
  const [finalized, setFinalized] = useState(false)
  const finalizedRef = useRef(null);
  useEffect(() => {   
    finalizedRef.current = finalized;
}, [finalized]);

  //nivel actual.
  const [currentLevel, setCurrentLevel] = useState(6)

  const onChangeLevel = (lv) => {
    setCurrentLevel(lv)
  }
 

  //palabra ganadora.
  const [winningWord, setWinningWord] = useState([])
  console.log(winningWord)


  //row actual, única habilitada para escribir.
  const [currentRow, setCurrentRow] = useState(null);

  function enabledRow() {
    let firstEmptyRow;
    const table = document.querySelector('#table');
    const rowsTable = table.querySelectorAll('.row');

    // buscar la primera fila vacía y guardarla en variable currentRow.
    for (let i = 0; i < rowsTable.length; i++) {
      

      let complete = true;
      const inputsRow = rowsTable[i].querySelectorAll('input');
      
      inputsRow.forEach(input => {
        if (input.value.trim() === '') {
          complete = false;
        }
      });
  
      if (!complete) {
        firstEmptyRow = rowsTable[i];
        setCurrentRow(rowsTable[i])
        break;
      }
    }
  
    // Deshabilitar todos los inputs.
    const inputs = table.querySelectorAll('input');
    inputs.forEach(input => {
      input.setAttribute('disabled', '');
    });
  
    // Habilitar los inputs de currentRow.
    if (firstEmptyRow) {
      const inputEnabled = firstEmptyRow.querySelectorAll('input');
      inputEnabled.forEach(input => {
        input.removeAttribute('disabled');
      });
    }

    //Poner en foco automaticamente el primer input de currentRow.
     firstEmptyRow.querySelector('.cell:first-child').focus();
  }


  // redirigir focus a siguiente casilla o anterior según corresponda.
  function checkFocus(currentInput, event){

    if (currentInput.value.length === 1 && !currentInput.className.includes(currentLevel-1)) {
        currentInput.nextElementSibling.focus();
    }
    
    if (event.key === 'Backspace' || event.key === 'Delete') {
        if (currentInput.value.length === 0) {
            if(!currentInput.className.includes('1')){
                currentInput.previousElementSibling.focus();
            }
        }    
    } else if (currentInput.value.length === 1 && !currentInput.className.includes(currentLevel-1)) {
        event.target.nextElementSibling.focus();
    }
  }


  // Agregar clases a los inputs y keys
  function agregarClase(elemento, clase) {
    if(elemento.classList.contains('key') && elemento.classList.length>=1){
        elemento.classList.remove(elemento.classList[1]);
        elemento.classList.add(clase);
    }else{
        elemento.classList.add(clase);
    }  
  }


  //borrar tabla cuando se cambia de nivel.
  function cleanTable(){
    const table = document.querySelector('#table');
    const rowsTable = table.querySelectorAll('.row');

    for (let i = 0; i < rowsTable.length; i++) {
    const inputsRow = rowsTable[i].querySelectorAll('input');
    
    inputsRow.forEach(input => {
        input.value="";
        input.classList.remove(input.classList.item(3));
        input.classList.remove(input.classList.item(2));
        
    });
    }
  }


  //borrar los estilos de las keys.
  function  cleanKeys(){
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        if(!key.classList.contains('borrar') && !key.classList.contains('enviar') )
        key.setAttribute('class','key')
    });
    
  }


  //abrir estadisticas
  const statistics = document.querySelector('#statistics');
  const playAgain = document.querySelector('#button')

  function openStatics(){
      statistics.style.top ='5%';
      if(!finalizedRef.current){
          playAgain.style.display="none";
      }else{
          playAgain.style.display="block"
      }
  }

  //cerrar estadisticas
  function closeStatics(){
      statistics.style.top = '110%';
  } 

  //animacion de festejo

  const canvas = document.getElementById("canvas");
  function festejo() {
    let W = window.innerWidth;
    let H = window.innerHeight;
    const context = canvas.getContext("2d");
    const maxConfettis = 150;
    const particles = [];

    const possibleColors = [
        "DodgerBlue",
        "OliveDrab",
        "Gold",
        "Pink",
        "SlateBlue",
        "LightBlue",
        "Gold",
        "Violet",
        "PaleGreen",
        "SteelBlue",
        "SandyBrown",
        "Chocolate",
        "Crimson"
    ];

    canvas.style.display = "block"

    function randomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function confettiParticle() {
        this.x = Math.random() * W; // x
        this.y = Math.random() * H - H; // y
        this.r = randomFromTo(11, 33); // radius
        this.d = Math.random() * maxConfettis + 11;
        this.color =
            possibleColors[Math.floor(Math.random() * possibleColors.length)];
        this.tilt = Math.floor(Math.random() * 33) - 11;
        this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
        this.tiltAngle = 0;

        this.draw = function () {
            context.beginPath();
            context.lineWidth = this.r / 2;
            context.strokeStyle = this.color;
            context.moveTo(this.x + this.tilt + this.r / 3, this.y);
            context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
            return context.stroke();
        };
    }

    function Draw() {
        const results = [];

        requestAnimationFrame(Draw);
        
        context.clearRect(0, 0, W, window.innerHeight);

        for (var i = 0; i < maxConfettis; i++) {
            results.push(particles[i].draw());
        }

        let particle = {};
        let remainingFlakes = 0;
        for (var i = 0; i < maxConfettis; i++) {
            particle = particles[i];

            particle.tiltAngle += particle.tiltAngleIncremental;
            
            if(W<600){
                
                particle.y += (Math.sin(particle.d) + 0.0001 + particle.r / 4) / 2;
            } else {
                particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
            }
            
            particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

            if (particle.y <= H) remainingFlakes++;

            if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
                particle.x = Math.random() * W;
                particle.y = -30;
                particle.tilt = Math.floor(Math.random() * 10) - 20;
            }
        }

        return results;
    }

    window.addEventListener(
        "resize",
        function () {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        },
        false
    );

    // Push new confetti objects to `particles[]`
    for (let i = 0; i < maxConfettis; i++) {
        particles.push(new confettiParticle());
    }

    // Initialize
    canvas.width = W;
    canvas.height = H;
    Draw();
  }

  const contextValue = useMemo(() => ({
    finalized, 
    setFinalized,
    currentLevel, 
    onChangeLevel, 
    currentRow, 
    setCurrentRow, 
    enabledRow, 
    checkFocus, 
    winningWord, 
    setWinningWord, 
    agregarClase, 
    cleanTable, 
    cleanKeys,
    openStatics,
    closeStatics,
    festejo
    
    }), [

    finalized, 
    setFinalized,
    currentLevel, 
    onChangeLevel, 
    currentRow, 
    setCurrentRow, 
    enabledRow, 
    checkFocus, 
    winningWord, 
    setWinningWord, 
    agregarClase, 
    cleanTable, 
    cleanKeys,
    openStatics,
    closeStatics,
    festejo
  ]);

  return ( 
    
    <dataContext.Provider value={contextValue}>
        {children}
    </dataContext.Provider>
  )
}

export default DataProvider
