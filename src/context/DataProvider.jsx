import React, { useState } from 'react'
import { dataContext } from './dataContext'


const DataProvider = ({ children }) => {

  //palabra ganadora.
  const [winningWord, setWinningWord] = useState([])

  const onChangeWinningWord = (word) => {
    setWinningWord(word)
  }


  //estado del juego (no finalizado).
  const [finalized, setFinalized] = useState(false)


  //nivel actual.
  const [currentLevel, setCurrentLevel] = useState(6)
 
  const onChangeLevel = (lv) => {
    setCurrentLevel(lv)
    console.log(currentLevel)
  }
 

  //row actual, única habilitada para escribir.
  const [currentRow, setCurrentRow] = useState(null);

  function enabledRow() {
    const table = document.querySelector('#table');
    const rowsTable = table.querySelectorAll('.row');
    let firstEmptyRow;
  
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

    if (currentInput.value.length === 1 && !currentInput.id.includes(currentLevel)) {
        currentInput.nextElementSibling.focus();
    }
    
    if (event.key === 'Backspace' || event.key === 'Delete') {
        if (currentInput.value.length === 0) {
            if(!currentInput.id.includes('1')){
                currentInput.previousElementSibling.focus();
            }
        }    
    } else if (currentInput.value.length === 1 && !currentInput.id.includes(currentLevel)) {
        event.target.nextElementSibling.focus();
    }
  }

  return ( 
    
    <dataContext.Provider value={{currentLevel, onChangeLevel, currentRow, setCurrentRow, enabledRow, checkFocus, onChangeWinningWord}}>
        {children}
    </dataContext.Provider>
  )
}

export default DataProvider
