import { functionGameContext} from './functionGameContext'
import { dataContext } from './dataContext';
import { localStorageContext } from './localStorageContext'
import { useContext, useEffect, useRef, useState } from 'react';

const FunctionGameProvider = ({ children }) => {

    const { winningWord, currentRow, enabledRow, agregarClase } = useContext(dataContext)
    const { saveWordPlayed, saveAttempStatistics, clenLevelStorage } = useContext(localStorageContext)
    const currentRowRef = useRef(null);

    useEffect(() => {   
        currentRowRef.current = currentRow;
    }, [currentRow]);


    //estado del juego (no finalizado).
    const [finalized, setFinalized] = useState(false)

 
    //comprobar si la celda fue compleatada.
    useEffect(() => {
       
        const handleKeyDown = (event) => {
          if (!finalized && event.key === "Enter") {
            checkCompleteRow(currentRow);
          }
        };
      
        document.addEventListener('keydown', handleKeyDown);
      
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };

    }, [checkCompleteRow, currentRow, finalized]);


    function checkCompleteRow(currentRow){
    
        const inputs = currentRowRef.current.querySelectorAll('input');
        let complete = true;
    
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                complete = false;
            }
        });
    
        if (complete) {
    
            checkLetters(currentRow)
    
        } else {
            const toasts = document.querySelector('#error');
            const notif = document.createElement('div');
            notif.classList.add('error');
            
            notif.innerText = "La palabra debe estar completa!";
    
            toasts.appendChild(notif);
            currentRowRef.current.classList.add('animacion');
    
            setTimeout(() => {
              notif.remove()
              
            }, 2000)
    
            setTimeout(() => {
                currentRowRef.current.classList.remove('animacion')
            }, 1000)
            
          
        }
    }


    //comprobar la palabra ingredasa y asignarle un estado (correta, presente, incorrecta).
    function checkLetters(){

        const inputs = currentRowRef.current.querySelectorAll('input');
        const keys = document.querySelectorAll('.key');
        let successes = 0;
        const correctPositions = [];
        const letterCount = {};
        let letterState;
        const attempt = currentRowRef.current.classList[1];
    
        // Contar cuantas veces aparece la letra en la palabra ganadora
        for (let i = 0; i < winningWord.length; i++) {
            const letter = winningWord[i];
            if (letterCount[letter]) {
                letterCount[letter]++;
            } else {
                letterCount[letter] = 1;
            }
        }

        //buscar letras correctas
        for (let i = 0; i < inputs.length; i++) {
            const inputLetter = inputs[i].value.toLowerCase();

            if (winningWord[i] === inputLetter) {
                agregarClase(inputs[i], 'correct-cell');
                successes++;
                correctPositions.push(i);
                letterCount[inputLetter]--;
                letterState = 'correct';

                keys.forEach(key => {
                    if (key.innerHTML === inputLetter.toUpperCase()) {
                        agregarClase(key, 'correct-key');
                    }
                });

                saveWordPlayed(attempt, inputLetter, letterState );
            }
        }

        // buscar letras contenidas e incorrectas
        for (let i = 0; i < inputs.length; i++) {
            const inputLetter = inputs[i].value.toLowerCase();

            if (!correctPositions.includes(i)) {
                

                if (winningWord.includes(inputLetter) && letterCount[inputLetter] > 0) {
                    letterState = 'contain';
                    letterCount[inputLetter]--;
                } else {
                    letterState = 'incorrect';
                }

                agregarClase(inputs[i], letterState + '-cell');

                keys.forEach(key => {
                    if (key.innerHTML === inputLetter.toUpperCase()) {
                        agregarClase(key, letterState + '-key');
                    }
                });

                saveWordPlayed(attempt, inputLetter, letterState);
            }
        }


        if (successes == inputs.length){

            saveAttempStatistics(attemp)
            clenLevelStorage()
            // festejo();
            finalizedishGame()

        }else{

            if(!currentRowRef.current.classList.contains('6')){

                enabledRow();

            }else{

                let estadisticasAuxLS = JSON.parse(localStorage.getItem("estadisticasAux"));

                estadisticasAuxLS.perdidas++

                localStorage.setItem("estadisticasAux", JSON.stringify(estadisticasAuxLS));

                // clenLevelStorage(level);
                // finalizedishGame()
            } 
        } 
    }


    // terminar juego
    function finalizedishGame(){

        setFinalized(true);
        
        let estadisticasLS = JSON.parse(localStorage.getItem("estadisticas"));
        let estadisticasAuxLS = JSON.parse(localStorage.getItem("estadisticasAux"));

        estadisticasLS.jugadas++

        estadisticasLS.victorias = Math.round((estadisticasAuxLS.victorias*100)/estadisticasLS.jugadas);
        estadisticasLS.word1 = (estadisticasAuxLS.word1==0)? "0" : Math.round((estadisticasAuxLS.word1*100)/estadisticasLS.jugadas);
        estadisticasLS.word2 = (estadisticasAuxLS.word2==0)? "0" : Math.round((estadisticasAuxLS.word2*100)/estadisticasLS.jugadas);
        estadisticasLS.word3 = (estadisticasAuxLS.word3==0)? "0" : Math.round((estadisticasAuxLS.word3*100)/estadisticasLS.jugadas);
        estadisticasLS.word4 = (estadisticasAuxLS.word4==0)? "0" : Math.round((estadisticasAuxLS.word4*100)/estadisticasLS.jugadas);
        estadisticasLS.word5 = (estadisticasAuxLS.word5==0)? "0" : Math.round((estadisticasAuxLS.word5*100)/estadisticasLS.jugadas);
        estadisticasLS.word6 = (estadisticasAuxLS.word6==0)? "0" : Math.round((estadisticasAuxLS.word6*100)/estadisticasLS.jugadas);
        estadisticasLS.perdidas = (estadisticasAuxLS.perdidas==0)? "0" : Math.round((estadisticasAuxLS.perdidas*100)/estadisticasLS.jugadas);

        localStorage.setItem("estadisticas", JSON.stringify(estadisticasLS));
        localStorage.setItem("estadisticasAux", JSON.stringify(estadisticasAuxLS));
        
        setStatistics()

        setTimeout(() => {
            openStatics();
        }, 800);

        let savedPlayLS = JSON.parse(localStorage.getItem("savedPlay"));

        for(let lv in savedPlayLS){
            if(savedPlayLS.hasOwnProperty(lv) && lv === 'level'+currentLevel){

                savedPlayLS[lv].winningWord=([])
                localStorage.setItem("savedPlay", JSON.stringify(savedPlayLS));
                setWord(currentLevel);
            }
        }
    }

    return ( 
    
        <functionGameContext.Provider value={{checkCompleteRow, finalized}}>
            {children}
        </functionGameContext.Provider>
    )
}
    
export default FunctionGameProvider