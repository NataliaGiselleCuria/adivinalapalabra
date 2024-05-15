
import { useContext } from 'react';
import { dataContext } from './dataContext';
import { localStorageContext } from './localStorageContext'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';


const LocalStorageProvider = ({ children }) => {

    
    const { currentLevel, enabledRow, onChangeWinningWord } = useContext(dataContext)
 
    //LocalStorag de estadisticas
    let estadisticas = JSON.parse(localStorage.getItem("estadisticas")) || {jugadas:0, victorias:0, word1:0, word2:0, word3:0, word4:0, word5:0, word6:0, perdidas:0};
    let estadisticasAux = JSON.parse(localStorage.getItem("estadisticasAux")) || {victorias:0, word1:0, word2:0, word3:0, word4:0, word5:0, word6:0, perdidas:0};   

    localStorage.setItem("estadisticas", JSON.stringify(estadisticas));
    localStorage.setItem("estadisticasAux", JSON.stringify(estadisticasAux));

    //LocalStorage de la jugada
    let savedPlay = JSON.parse(localStorage.getItem("savedPlay")) || {
        level6:{word1:[], word2:[], word3:[], word4:[], word5:[], word6:[], winningWord:[]},
        level7:{word1:[], word2:[], word3:[], word4:[], word5:[], word6:[], winningWord:[]},
        level8:{word1:[], word2:[], word3:[], word4:[], word5:[], word6:[], winningWord:[]},
        level9:{word1:[], word2:[], word3:[], word4:[], word5:[], word6:[], winningWord:[]}
    };
    localStorage.setItem("savedPlay", JSON.stringify(savedPlay));

    //comprobar si hay partida guardada y rellenar la tabla.
    function checkSavedPlay(){
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
                    onChangeWinningWord (savedPlayLS[lv].winningWord)
                    
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

    //Busca la palabra ganadora aleatoriamente por nivel en el json.
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
                            onChangeWinningWord (savedPlayLS['level'+currentLevel].winningWord) ;
                        }

                    } else {

                        let savedPlayLS = JSON.parse(localStorage.getItem("savedPlay"));

                        onChangeWinningWord (savedPlayLS['level'+currentLevel].winningWord)

                        
                    }  
                }
            }

        } catch (error) {
            console.error(error);
        }
        
    }

  return ( 
    
    <localStorageContext.Provider value={{checkSavedPlay, setWordsLevels}}>
        {children}
    </localStorageContext.Provider>
  )
}

export default LocalStorageProvider