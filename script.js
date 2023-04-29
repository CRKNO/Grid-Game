const position = document.querySelectorAll(".background");
const gameArea = document.querySelector("main");
const scoreSpan = document.querySelector(".score");

let playerPosition = 0;
let scorePosition= -1;
let newScore = true;
let score = 0;

document.addEventListener("keydown", hearKeyboard);

function hearKeyboard(e){
    console.log(e.key);
    movement(e.key);
    updateScore(scorePosition, playerPosition);
    print();
}

function movement(key){

    switch(key){
        /* Up */
        case "w": 
            if(playerPosition >= 3){
                playerPosition -= 3;
            }
            break;
        case "ArrowUp": 
            if(playerPosition >= 3){
                playerPosition -= 3;
            }
            break;

            /* Down */
        case "s": 
            if(playerPosition <= 5){
                playerPosition += 3;
            }
            break;
        case "ArrowDown": 
            if(playerPosition <= 5){
                playerPosition += 3;
            }
            break;

            /* Left */
        case "a":
            if(playerPosition >=1){
                playerPosition--;
            }
            break;
        case "ArrowLeft":
            if(playerPosition >=1){
                playerPosition--;
            }
            break;

            /* Right */
        case "d":
            if(playerPosition <=7){
                playerPosition++;
            }
            break;
        case "ArrowRight":
            if(playerPosition <=7){
                playerPosition++;
            }
            break;
    }
}

function print(){
    for(p of position){
        p.classList.remove("player-color");
        p.classList.remove("score-color");
    }
    position[scorePosition].classList.add("score-color");
    position[playerPosition].classList.add("player-color");
}

function scoreGenerator(arr){
    let randomNumber = randomNum(0, arr.length -1);
    console.log("random: " + randomNumber)
    scorePosition = randomNumber;
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
        scoreGenerator(position);
        newScore = false;
    }
}

/* MEJORAS */

//1) Poder elejir el tamaño de la cuadricula.
//2) Que la posicion de score no pueda superponerse con la posicion del jugador.
