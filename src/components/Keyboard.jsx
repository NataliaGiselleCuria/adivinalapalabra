import React, { useContext, useEffect } from 'react'
import { dataContext } from '../context/dataContext';

const Keyboard = () => {
        
        const { checkFocus, currentRow } = useContext(dataContext)

        useEffect(() => {
                setEventKeys()
        }, [currentRow]);

        function setEventKeys() {
                const keys = document.querySelectorAll('.key');
                keys.forEach(function (key) {
                        key.addEventListener('click', eventKeys)
                })
        }

        function eventKeys(event) {
                const inputs = currentRow.querySelectorAll('.cell');
                let letter = event.target.innerHTML;
                let cell;
                inputs.forEach(input => {
                        if (input.className.includes('cell-focus')) {
                                if (event.target.innerHTML == 'ENVIAR') {

                                        checkCompleteRow(currentRow);

                                } else if (event.target.className.includes('borrar') || event.target.className.includes('fa-delete-left')) {
                                        input.value = "";
                                        if (!input.id.includes('1')) {
                                                input.previousElementSibling.focus();
                                        }
                                } else {
                                        input.value = letter;
                                }

                                cell = input;
                        }
                });

                checkFocus(cell, event);
        }


        return (
                <section id="keyboard">
                        <span>
                                <div className="key">Q</div>
                                <div className="key">W</div>
                                <div className="key">E</div>
                                <div className="key">R</div>
                                <div className="key">T</div>
                                <div className="key">Y</div>
                                <div className="key">U</div>
                                <div className="key">I</div>
                                <div className="key">O</div>
                                <div className="key">P</div>
                        </span>
                        <span>
                                <div className="key">A</div>
                                <div className="key">S</div>
                                <div className="key">D</div>
                                <div className="key">F</div>
                                <div className="key">G</div>
                                <div className="key">H</div>
                                <div className="key">J</div>
                                <div className="key">K</div>
                                <div className="key">L</div>
                                <div className="key">Ñ</div>
                        </span>
                        <span>
                                <div className="key enviar">ENVIAR</div>
                                <div className="key">Z</div>
                                <div className="key">X</div>
                                <div className="key">C</div>
                                <div className="key">V</div>
                                <div className="key">B</div>
                                <div className="key">N</div>
                                <div className="key">M</div>
                                <div className="key borrar"><i className="fa-solid fa-delete-left"></i></div>

                        </span>
                </section>
        )
}

export default Keyboard
