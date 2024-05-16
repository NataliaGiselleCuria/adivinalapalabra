import React, { useContext, useEffect } from 'react'
import { Row } from './Row';
import '../../src/App.css'
import { localStorageContext } from '../context/localStorageContext';
import { dataContext } from '../context/dataContext';


export const Table = () => {

    const { currentLevel } = useContext(dataContext);

    //arma la tabla con seis filas, y le asigna su correspondiente nombre a cada una.
    const rows = [];
    const numRows = 7;
    
    for (let i = 1; i < numRows; i++) {
        let nameRow = "row word" + i;
        rows.push(
        <Row key={i} name = {nameRow} level={currentLevel} />
        );
    }

    return (
        <div id='table'>
           {rows}
        </div>
    )
}

export default Table
