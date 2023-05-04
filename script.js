const position = document.querySelectorAll(".background");
const gameArea = document.querySelector("main");
const scoreSpan = document.querySelector(".score");
const gameContainer = document.querySelector(".game-table");
const gameSection = document.querySelector(".game");
const menuForm = document.querySelector("form");
const gameMenu = document.querySelector(".menu")
const formButton = document.querySelector(".start-button")

let playerPosition = 0;
let scorePosition= -1;
let newScore = true;
let score = 0;

let tableSize = 5;
let slots = [];


menuForm.addEventListener("input", inputSelected);
menuForm.addEventListener("submit", startGame);

function inputSelected(event){
    formButton.removeAttribute("disabled");
}
function startGame(event){
    let options = event.target.elements.namedItem("size-radio");
    
    event.preventDefault();
    
    for(radio of options){
        if(radio.checked){
            tableSize = Number(radio.value);
        }
    }
    
    document.addEventListener("keydown", hearKeyboard);
    gameMenu.classList.add("inactive");

    gameSection.classList.remove("inactive");

    prepareTable(tableSize);
}

function hearKeyboard(e){
    console.log(e.key);
    movement(e.key, slots, tableSize);
    updateScore(scorePosition, playerPosition);
    print();
}

function movement(key, arr, tbSize){

    switch(key){
        /* Up */
        case "w": 
            if(playerPosition >= tbSize){
                playerPosition -= tbSize;
            }
            break;
        case "ArrowUp": 
            if(playerPosition >= tbSize){
                playerPosition -= tbSize;
            }
            break;

            /* Down */
        case "s": 
            if(playerPosition <= (arr.length - tbSize)){
                playerPosition += tbSize;
            }
            break;
        case "ArrowDown": 
            if(playerPosition <= (arr.length - tbSize)){
                playerPosition += tbSize;
            }
            break;

            /* Left */
        case "a":
            if(playerPosition >= 1){
                playerPosition--;
            }
            break;
        case "ArrowLeft":
            if(playerPosition >= 1){
                playerPosition--;
            }
            break;

            /* Right */
        case "d":
            if(playerPosition <= (arr.length -2)){
                playerPosition++;
            }
            break;
        case "ArrowRight":
            if(playerPosition <= (arr.length -2)){
                playerPosition++;
            }
            break;
    }
    console.log(playerPosition);
}

function print(){
    for(p of slots){
        p.classList.remove("player-color");
        p.classList.remove("score-color");
    }
    slots[scorePosition].classList.add("score-color");
    slots[playerPosition].classList.add("player-color");
}

function scoreGenerator(arr){
    do{
        let randomNumber = randomNum(0, arr.length -1);
        scorePosition = randomNumber;
    }while(scorePosition == playerPosition);
}

function randomNum(min, max){
    return Math.floor(Math.random()*(max - min + 1)+min)
}

function updateScore(a, b){
    if(a == b){
        score++;
        newScore = true;
        scoreSpan.innerHTML = `${score}`;
    }

    if(newScore){
        scoreGenerator(slots);
        newScore = false;
    }
}

function prepareTable(size){
    let tableGrid = size*size;
    // document.createElement("div")
    
    for(let i = 0; i < (size*size); i++){
        slots.push(document.createElement("div"));
        slots[i].classList.add("background");
        gameContainer.appendChild(slots[i]);
        console.log("hecho");
    }

    slots[0].classList.add("player-color");

    gameContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gameContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}
/* MEJORAS */

//1) Poder elejir el tamaño de la cuadricula.
//2) Que la posicion de score no pueda superponerse con la posicion del jugador.
