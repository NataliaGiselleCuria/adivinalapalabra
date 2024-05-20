import React, { useContext } from 'react'
import { dataContext } from '../context/dataContext'

const Question = () => {

    const { closeQuestion } = useContext(dataContext)

  return (
    <div id="question">
        <div className='question-cont'>
            <div className="close-q" onClick={closeQuestion}><i className="fa-solid fa-xmark"></i></div>
            
            <div className='question-cont-txt'>
            <h4>¿COMO JUGAR 'ADIVINA LA PALABRA'?</h4>
                <p>Adivina la palabra oculta en <b>6 intentos</b>.</p>
                <p>La palabra tiene que estas <b>asociada a la programacion</b>.</p>
                <span>
                    <p>Cada nivel equivale a la cantidad de letras que debe tener la palabra.</p>
                    <p><b> Nivel 6 = palabra de 6 letras</b></p>
                </span>
                <p>Pulse el botón <b>Enviar</b>, o la tecla <b>Enter</b> para enviar la palabra intuida.</p>
                <p>Después de cada intento el color de las letras cambia para mostrar <b>qué tan cerca estás de acertar la palabra</b>.</p>
            </div>
            <div class="demostration">
                <span>
                    <input className='cell correct-cell' value="A"></input>
                    <p>La letra <b>está en la palabra</b> y en el <b>lugar correcto</b>.</p>
                </span>
                <span>
                    <input className='cell contain-cell' value="S"></input> 
                    <p>La letra <b>está en la palabra</b> pero en el <b>lugar equivocado</b>.</p> 
                </span>
                <span>
                    <input className='cell incorrect-cell' value="D"></input>
                    <p>La letra <b>no está en la palabra</b> en ningún lugar.</p>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Question
