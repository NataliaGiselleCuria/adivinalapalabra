import React, { useState } from 'react'
import { dataContext } from './dataContext'


const DataProvider = ({ children }) => {

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

  return ( 
    
    <dataContext.Provider value={{currentLevel, onChangeLevel, currentRow, setCurrentRow, enabledRow, checkFocus, winningWord, setWinningWord, agregarClase, cleanTable, cleanKeys}}>
        {children}
    </dataContext.Provider>
  )
}

export default DataProvider
