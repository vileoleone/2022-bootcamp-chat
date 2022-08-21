let  cardNumber;
let cardCounting;
let cardsList =document.querySelectorAll(".card-box")
let clickCounts = 0;
let mainDiv = document.querySelector(".main-box");
let temporaryArray =[];
//Função para embaralhar cartas
function comparador() { 
	return Math.random() - 0.5; 
}
//Função inicial para montar layout do jogo de acordo com a escolha do jogador.
function initialNumberInput () {
    cardNumber = Number(prompt("Escolha com quantas cartas você quer jogar, por favor digite um número par entre 4 e 14"));
    cardCounting = cardNumber/2;
    // Condições para input do jogador
    if (cardNumber < 4 || cardNumber > 14) {
            alert("Por favor digite um número de cartas entre 4 e 14");
            initialNumberInput();
        }
    if (cardNumber % 2 !== 0 ) {
        alert("Por favor digite um número par entre 4 e 7");
        initialNumberInput();
    }
    showAndShuffle(cardNumber);
    // Comando para flexibilizar e organizar as cartas para o jogador
    mainDiv.style.width = `${80*cardNumber + 70}px`
}
//Função para mostrar as cartas e embaralha-lás
function showAndShuffle (number) {
    let arrayToShuffle = []
    // Organizando em array para embarlhamento
    for (let index = 0; index <cardNumber; index++) {
        arrayToShuffle.push(cardsList[index]);
    }
    //Embaralhando as cartas
    arrayToShuffle.sort(comparador);
    //Mostrando as cartas para jogador
    for (let index = 0; index < arrayToShuffle.length; index++) {
     arrayToShuffle[index].classList.remove("hidden")
     arrayToShuffle[index].style.order = index;
    }
}
//Função principal para funcionamento do jogo
function gameLogic (element) {
    temporaryArray.push(element)
    if (temporaryArray.length>2) {
        clickCounts=clickCounts-1;
        return;
    }
    clickCounts++;
    console.log(clickCounts);
//Caso o jogador clique na mesma carta duas vezes
    if (temporaryArray.length == 2 && temporaryArray[0].style.order === temporaryArray[1].style.order) {
        temporaryArray.splice(1,1)
        clickCounts=clickCounts-1;
        console.log(clickCounts);
        return;
    }
    element.classList.toggle("flip");
    if (temporaryArray.length == 2){
       if (temporaryArray[0].classList[1] === temporaryArray[1].classList[1]) {
            temporaryArray[0].setAttribute("onclick","");
            temporaryArray[1].setAttribute("onclick","");
            temporaryArray = [];
            cardCounting = cardCounting-1;
            setTimeout(() => {
                if(cardCounting == 0) {
                    alert(`você venceu  em ${clickCounts} jogadas!!`)
                    clickCounts = 0;
                    for (let index = 0; index < cardNumber; index++) {
                        cardsList[index].classList.toggle("flip");
                        cardsList[index].setAttribute("onclick", "gameLogic(this)")
                        cardsList[index].classList.add("hidden");
                    }
                    initialNumberInput();
                }
            }, 2000)
       }else {
            setTimeout(() => {
            temporaryArray[0].classList.toggle("flip")
            temporaryArray[1].classList.toggle("flip")
            temporaryArray = [];
            }, 1000);
       }
    }
}
// Funções complementares para funcionamento da função principal
function flipCardBackToFront(element) {
    //children[1] = 'front-side' children [0] = 'backside'
    element.children[1].classList.toggle("flip");
    element.children[0].classList.toggle("flip"); 
}

function flipCardFrontToBack(element) {
    element.children[1].classList.toggle("flip");
    element.children[0].classList.toggle("flip");    
}

function compareCards() {
    let comparison = (temporaryArray[0].classList[1] === temporaryArray[1].classList[1]) ? true : false;
    return comparison;
}
// Comando incial
initialNumberInput ()