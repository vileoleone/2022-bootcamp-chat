let  cardNumber;
let mainDiv = document.querySelector(".main-box");
let cardsList =document.querySelectorAll(".card-box")
let temporaryArray =[];
let cardCounting;
//
function comparador() { 
	return Math.random() - 0.5; 
}
//Função inicial para montar layout do jogo de acordo com a escolha do jogador
function initialNumberInput () {
    cardNumber = Number(prompt("Escolha com quantas cartas você quer jogar, por favor digite um número par entre 4 e 14"));
    cardCounting = cardNumber/2;
    if (cardNumber < 4 || cardNumber > 14) {
            alert("Por favor digite um número de cartas entre 4 e 7");
            initialNumberInput();
        }
    if (cardNumber % 2 !== 0 ) {
        alert("Por favor digite um número par entre 4 e 7");
        initialNumberInput();
    }
    showAndShuffle(cardNumber);
    mainDiv.style.width = `${80*cardNumber + 70}px`
}

function showAndShuffle (number) {
    let arrayToShuffle = []
    for (let index = 0; index <cardNumber; index++) {
        arrayToShuffle.push(cardsList[index]);
    }
    arrayToShuffle.sort(comparador);
    for (let index = 0; index < arrayToShuffle.length; index++) {
     arrayToShuffle[index].classList.remove("hidden")
     arrayToShuffle[index].style.order = index;
    }
}
initialNumberInput ()

function flipCardBackFront(element) {
    element.children[1].classList.remove("hidden");
    element.children[0].classList.add("hidden"); 
}

function flipCardFrontBack(element) {
    element.children[1].classList.add("hidden");
    element.children[0].classList.remove("hidden");    
}

function compareCards() {
    let comparison = (temporaryArray[0].classList[1] === temporaryArray[1].classList[1]) ? true : false;
    return comparison;
}

function gameLogic (element) {
    if (temporaryArray.length < 2) {
        temporaryArray.push(element);
        flipCardBackFront(element);
    }
    if (temporaryArray.length == 2){
       if (temporaryArray[0].classList[1] === temporaryArray[1].classList[1]) {
        setTimeout(() => {
            temporaryArray[0].classList.add("hidden");
            flipCardBackFront(temporaryArray[0]);
            temporaryArray[1].classList.add("hidden");
            flipCardBackFront(temporaryArray[1]);
            temporaryArray = [];
            cardCounting = cardCounting-1;
            console.log(cardCounting)
            setTimeout(() => {
                if(cardCounting == 0) {
                    alert("você venceu au!!")
                    initialNumberInput();
                }
            }, 1000)
        }, 2000)
       } else {
        setTimeout(() => {
        flipCardFrontBack(temporaryArray[0]);
        flipCardFrontBack(temporaryArray[1]);
        temporaryArray = [];
            }, 2000);
       }
    }
}


