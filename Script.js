let  cardNumber;
let mainDiv = document.querySelector(".main-box");
let cardsList =document.querySelectorAll(".card-box")
//
function comparador() { 
	return Math.random() - 0.5; 
}
//Função inicial para montar layout do jogo de acordo com a escolha do jogador
function initialNumberInput () {
    cardNumber = Number(prompt("Escolha com quantas cartas você quer jogar, por favor digite um número par entre 4 e 14"));
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
    arrayToShuffle.sort(comparador)
    for (let index = 0; index < arrayToShuffle.length; index++) {
        arrayToShuffle[index].classList.remove("hidden")
    }
}
initialNumberInput ()

function flipCardAndCompare(element) {
    
}






