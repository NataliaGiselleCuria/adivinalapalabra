
import { useContext, useEffect, useMemo, useRef } from 'react';
import { dataContext } from './dataContext';
import { localStorageContext } from './localStorageContext'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';


const LocalStorageProvider = ({ children }) => {

    
    const { currentRow, currentLevel, enabledRow, setWinningWord, agregarClase, cleanTable, cleanKeys } = useContext(dataContext)
    const currentRowRef = useRef(null);

    useEffect(() => {   
        currentRowRef.current = currentRow;
    }, [currentRow]);
 
    //LocalStorag de estadisticas
    let estadisticas = JSON.parse(localStorage.getItem("estadisticas")) || {jugadas:0, victorias:0, word1:0, word2:0, word3:0, word4:0, word5:0, word6:0, perdidas:0};
    let estadisticasAux = JSON.parse(localStorage.getItem("estadisticasAux")) || {victorias:0, word1:0, word2:0, word3:0, word4:0, word5:0, word6:0, perdidas:0};   

    localStorage.setItem("estadisticas", JSON.stringify(estadisticas));
    localStorage.setItem("estadisticasAux", JSON.stringify(estadisticasAux));

    //LocalStorage de las palabras jugadas.
    let savedPlay = JSON.parse(localStorage.getItem("savedPlay")) || {
        level6:{word1:[], word2:[], word3:[], word4:[], word5:[], word6:[], winningWord:[]},
        level7:{word1:[], word2:[], word3:[], word4:[], word5:[], word6:[], winningWord:[]},
        level8:{word1:[], word2:[], word3:[], word4:[], word5:[], word6:[], winningWord:[]},
        level9:{word1:[], word2:[], word3:[], word4:[], word5:[], word6:[], winningWord:[]}
    };
    localStorage.setItem("savedPlay", JSON.stringify(savedPlay));


    //comprobar si hay partida guardada y rellenar la tabla.
    function checkSavedPlay(currentLevel){

        cleanTable()
        cleanKeys()

        let savedPlayLS = JSON.parse(localStorage.getItem("savedPlay"));

        const keys = document.querySelectorAll('.key');
        for (let lv in savedPlayLS) {
            if (savedPlayLS.hasOwnProperty(lv) && lv === 'level' + currentLevel) {
            
                for (let word in savedPlayLS[lv]) {
                    if (savedPlayLS[lv][word].length > 0) {
                        for (let i = 0; i < table.children.length; i++) {
                            if (word == table.children[i].classList[1]) {
                                for (let j = 0; j < table.children[i].children.length; j++) {
                                    table.children[i].children[j].value = savedPlayLS[lv][word][j].value
                                    agregarClase(table.children[i].children[j], savedPlayLS[lv][word][j].state + '-cell');

                                    keys.forEach(key => {
                                        if (key.innerHTML === savedPlayLS[lv][word][j].value.toUpperCase()) {
                                            agregarClase(key, savedPlayLS[lv][word][j].state + '-key');
                                        }
                                    });
                                }
                            }
                        }
                    }
                };

                if(savedPlayLS[lv].winningWord.length>0){
                    setWinningWord(savedPlayLS[lv].winningWord)
                }
            }
        }

        localStorage.setItem("savedPlay", JSON.stringify(savedPlayLS));

        enabledRow();
    }


    //asignar una palabra ganadora a cada nivel y guardarlo en Local storage.
    function setWordsLevels(){
        let levels = 6;
    
        async function processLevels() {
            if (levels <= 9) {
                await setWord(levels);
                levels++;
                processLevels();
            }
        }
        
        processLevels(); // Iniciar el proceso
    }


    //Busca la palabra ganadora aleatoriamente por nivel en base de datos.
    async function setWord(level){

        const wordsRef = collection(db, "wordsLevels");
        const response = await getDocs(wordsRef);

        // Obtener las palabras disponibles para el nivel actual
        const wordsData = response.docs.map(doc => doc.data());
        const wordsCurrentLevel = wordsData[0][level.toString()];

        // Elegir una palabra aleatoria para el nivel actual
        const randomIndex = Math.floor(Math.random() * wordsCurrentLevel.length);
        const randomWord = wordsCurrentLevel[randomIndex];

        let savedPlayLS = JSON.parse(localStorage.getItem("savedPlay"));

        try {
            
            for(let lv in savedPlayLS){
                if(savedPlayLS.hasOwnProperty(lv) && lv === 'level'+level){

                    if(savedPlayLS[lv].winningWord.length==0){
                        for (let i = 0; i < randomWord.length; i++) {
                            savedPlayLS[lv].winningWord.push(randomWord.charAt(i))
                            localStorage.setItem("savedPlay", JSON.stringify(savedPlayLS));
                            setWinningWord(savedPlayLS['level'+currentLevel].winningWord) ;
                        }
                    } else {
                        let savedPlayLS = JSON.parse(localStorage.getItem("savedPlay"));
                        setWinningWord(savedPlayLS['level'+currentLevel].winningWord)   
                    }  
                }
            }

        } catch (error) {
            console.error(error);
        } 
    }


    //guarda la palabra jugada en local storage.
    function saveWordPlayed(attemp, inputLetter, letterState){
        let savedPlayLS = JSON.parse(localStorage.getItem("savedPlay"));

        for (let lv in savedPlayLS){
            if(savedPlayLS.hasOwnProperty(lv) && lv === 'level'+currentLevel){
                for (let value in savedPlayLS[lv]) {
                    if (savedPlayLS[lv].hasOwnProperty(value) && value === attemp) {
                        savedPlayLS[lv][value].push({ value: inputLetter, state: letterState });
                    }
                }   
            }
        }

        localStorage.setItem("savedPlay", JSON.stringify(savedPlayLS));

    }


    //guardar en estadisticas en que intento se terminó el juego (ganada o perdida).
    function saveAttempStatistics(attemp){
        let estadisticasAuxLS = JSON.parse(localStorage.getItem("estadisticasAux"));

        for(let estadistica in estadisticasAuxLS){
            if (estadistica == attemp){
                estadisticasAuxLS[estadistica]++;
            }
        }

        estadisticasAuxLS.victorias++

        localStorage.setItem("estadisticasAux", JSON.stringify(estadisticasAuxLS));
    }


    //guardar en estadisticas la partida perdida.
    function lostGameStatistics(){
        let estadisticasAuxLS = JSON.parse(localStorage.getItem("estadisticasAux"));

        estadisticasAuxLS.perdidas++

        localStorage.setItem("estadisticasAux", JSON.stringify(estadisticasAuxLS));
    }


    //vaciar el local storage del nivel(cuando se termina una partida)
    function clenLevelStorage(){
        let savedPlayLS = JSON.parse(localStorage.getItem("savedPlay"));

        for (let lv in savedPlayLS){
            if(savedPlayLS.hasOwnProperty(lv) && lv === 'level'+currentLevel){
                for (let word in savedPlayLS[lv]) {
                    savedPlayLS[lv][word]=([]);
                };
            }
        }

        localStorage.setItem("savedPlay", JSON.stringify(savedPlayLS));
    }
    

    //subir las nuevas estadisticas cuando se termina el juego.
    function uploadStatistics(){
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
    }


    //asignar una nueva palabra ganadora al nivel terminado.
    function setNewWordLevel(){

        let savedPlayLS = JSON.parse(localStorage.getItem("savedPlay"));

        for(let lv in savedPlayLS){
            if(savedPlayLS.hasOwnProperty(lv) && lv === 'level'+currentLevel){

                savedPlayLS[lv].winningWord=([])
                localStorage.setItem("savedPlay", JSON.stringify(savedPlayLS));
                setWord(currentLevel);
            }
        }
    }
     
    useEffect(() => {
        setWordsLevels()
        checkSavedPlay(6)
    }, []);

    useEffect(() => { 
        checkSavedPlay(currentLevel)
    }, [currentLevel]);

    const contextValue = useMemo(() => ({
        checkSavedPlay,
        setWordsLevels,
        saveWordPlayed,
        saveAttempStatistics,
        clenLevelStorage,
        lostGameStatistics,
        uploadStatistics,
        setNewWordLevel
    }), [
        checkSavedPlay,
        setWordsLevels,
        saveWordPlayed,
        saveAttempStatistics,
        clenLevelStorage,
        lostGameStatistics,
        uploadStatistics,
        setNewWordLevel
    ]);

  return ( 
    
    <localStorageContext.Provider value={contextValue}>
        {children}
    </localStorageContext.Provider>
  )
}

export default LocalStorageProvider