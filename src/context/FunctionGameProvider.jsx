import { functionGameContext} from './functionGameContext'
import { dataContext } from './dataContext';
import { localStorageContext } from './localStorageContext'
import { useContext, useEffect, useRef, useState } from 'react';

const FunctionGameProvider = ({ children }) => {

    const { winningWord, currentRow, enabledRow, agregarClase } = useContext(dataContext)
    const { saveWordPlayed, saveAttempStatistics, clenLevelStorage, uploadStatistics, setNewWordLevel } = useContext(localStorageContext)
    const currentRowRef = useRef(null);
    const winningWordRef = useRef(null);

    useEffect(() => {   
        currentRowRef.current = currentRow;
    }, [currentRow]);

    useEffect(() => {   
        winningWordRef.current = winningWord;
    }, [winningWord]);

    //estado del juego.
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


    function checkCompleteRow(){
    
        const inputs = currentRowRef.current.querySelectorAll('input');
        let complete = true;
    
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                complete = false;
            }
        });
    
        if (complete) {
    
            checkLetters(currentRowRef.current)
    
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
    
        // Contar cuantas veces aparece la letra en la palabra ganadora.
        for (let i = 0; i < winningWordRef.current.length; i++) {
            const letter = winningWordRef.current[i];
            if (letterCount[letter]) {
                letterCount[letter]++;
            } else {
                letterCount[letter] = 1;
            }
        }

        //buscar letras correctas.
        for (let i = 0; i < inputs.length; i++) {
            const inputLetter = inputs[i].value.toLowerCase();

            if (winningWordRef.current[i] === inputLetter) {
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

        // buscar letras presentes e incorrectas.
        for (let i = 0; i < inputs.length; i++) {
            const inputLetter = inputs[i].value.toLowerCase();

            if (!correctPositions.includes(i)) {
                

                if (winningWordRef.current.includes(inputLetter) && letterCount[inputLetter] > 0) {
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

        // finalizar el juego (si la palabra es la correcta o se acabaron los intentos), o continuar el juego.
        if (successes == inputs.length){

            saveAttempStatistics(attempt)
            clenLevelStorage()
            // festejo();
            finalizedishGame()

        }else{ 

            if(!currentRowRef.current.classList.contains('6')){

                enabledRow();

            }else{

                lostGameStatistics()
                clenLevelStorage();
                finalizedishGame()
            } 
        } 
    }


    // terminar juego
    function finalizedishGame(){

        setFinalized(true);
        
        uploadStatistics()
        
        // setStatistics()

        setTimeout(() => {
            // openStatics();
        }, 800);

        setNewWordLevel()
    }

    return ( 
    
        <functionGameContext.Provider value={{checkCompleteRow, finalized}}>
            {children}
        </functionGameContext.Provider>
    )
}
    
export default FunctionGameProvider