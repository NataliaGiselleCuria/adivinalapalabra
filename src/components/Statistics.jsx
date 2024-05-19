import React, { useContext } from 'react'
import { functionGameContext } from '../context/functionGameContext'
import { dataContext } from '../context/dataContext'

function Statistics() {

    const { closeStatics } = useContext(dataContext)
    const { reset } = useContext(functionGameContext)

    function handleClickClose(){
        closeStatics()
    }

    function handleClickReset(){
        reset()
    }

  return (
    <section id='statistics'>
       <div className="statistics-cont">
                <div className="close" onClick={handleClickClose}><i className="fa-solid fa-xmark"></i></div>
                
                <div className="statistics-a">
                    <h4>ESTADISTICAS</h4>
                    <div>
                        <span>
                            <h5 id="plays"></h5>
                            <p>Jugadas</p>
                        </span>
                        <span>
                            <h5 id="won"></h5>
                            <p>% Victorias</p>
                        </span>
                    </div>                
                </div>
                <div className="graphic">
                    <span className="graphic-row">
                        <p>1</p>
                        <div><span className="try-1"></span><p className="try-1P"></p></div>
                    </span>
                    <span className="graphic-row">
                        <p>2</p>
                        <div><span className="try-2"></span><p className="try-2P"></p></div>
                    </span>
                    <span className="graphic-row">
                        <p>3</p>
                        <div><span className="try-3"></span><p className="try-3P"></p></div>
                    </span>
                    <span className="graphic-row">
                        <p>4</p>
                        <div><span className="try-4"></span><p className="try-4P"></p></div>
                    </span>
                    <span className="graphic-row">
                        <p>5</p>
                        <div><span className="try-5"></span><p className="try-5P"></p></div>
                    </span>
                    <span className="graphic-row">
                        <p>6</p>
                        <div><span className="try-6"></span><p className="try-6P"></p></div>
                    </span>
                    <span className="graphic-row"> 
                        <p>x</p>
                        <div><span className="loss"></span><p className="lossP"></p></div>
                    </span>
                </div>
                <button id="button" className="key" onClick={handleClickReset}>JUGAR DE NUEVO</button>
            </div>
    </section>
  )
}

export default Statistics


