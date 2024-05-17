import React, { useContext, useRef } from 'react'
import '../../src/App.css'
import { dataContext } from '../context/dataContext';


export const Cell = ({ name }) => {

  const { checkFocus } = useContext(dataContext);
  const cellRef = useRef(null);

  const handleInput = (event) => {
    let currentInput = event.currentTarget;
    checkFocus(currentInput, event);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      if (event.currentTarget.value.length === 0) {
        if (!event.currentTarget.className.includes('0')) {
          event.currentTarget.previousElementSibling.focus();
        }
      }
    }
  };

  const handleInputChange = (event) => {
    let currentInput = event.currentTarget;
    let letter = event.target.value;

    if (event.currentTarget.value.length > 1) {
      cellRef.current.value = letter.charAt(1);
    }

    checkFocus(currentInput, event);
  };

  const handleFocus = (event) => {
    cellRef.current.classList.add('cell-focus');
    const inputs = document.querySelectorAll('.cell');
    inputs.forEach((el) => {
      if (el !== cellRef.current) {
        el.classList.remove('cell-focus');
      }
    });
  };

  return (
    <input 
      className={name}
      ref={cellRef}
      onInput={handleInput} //focus de las celdas.
      onKeyDown={handleKeyDown} //borrar celdas por teclado.
      onChange={handleInputChange} // reasignar valor a un input(celda).
      onFocus={handleFocus} // agregar clase al input(celda) en foco, y sacarselo a todos los demás.
    />

   
  )
}

export default Cell



