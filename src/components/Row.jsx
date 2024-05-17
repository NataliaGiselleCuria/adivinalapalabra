import React from 'react'
import { Cell } from './Cell';
import '../../src/App.css'

export const Row = ({ name, level }) => {

    //arma la fila con la cantidad de letras según el nivel actual.
    const cells = [];

    for (let i = 0; i < level; i++) {
        let nameCell = "cell letter" + i;
        cells.push(
            <Cell key={i} name={nameCell} />
        );
    }
   
    return (
        <div className={name}>
            {cells}
            
        </div>
    )
}

export default Row
