let  cardNumber;
let gifArray = []
let mainDiv = document.querySelector(".main-box");
//Função inicial para montar layout do jogo de acordo com a escolha do jogador
function initialNumberInput () {
    cardNumber = Number(prompt("Escolha com quantas cartas você quer jogar, por favor digite um número par entre 4 e 14"));
    if (cardNumber < 4 || cardNumber > 7) {
            alert("Por favor digite um número de cartas entre 4 e 7")
            initialNumberInput();
        }
    if (cardNumber % 2 !== 0 ) {
        alert("Por favor digite um número par entre 4 e 7")
        initialNumberInput();
    }
    //for (let index = 0; index <= 2*cardNumber; index++) {
          // adicionar child e colocar  classe "card-box"
          //adicionar link, img com o gifs
    //}
}

initialNumberInput();