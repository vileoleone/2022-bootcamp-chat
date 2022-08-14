//Verificar qual o conjunto de alimentos que o usuário está escolhendo
function typeOfCuisine (clickedBox) {
   let cuisineType;
   let cuisineSelector;
   let secondClass = clickedBox.classList[1];
   if (secondClass == "food") {cuisineType = ".foodCuisine"}
   else if (secondClass =="drink") {cuisineType = ".drinkCuisine"} 
   else {cuisineType = ".sweetCuisine"};
   cuisineSelector = document.querySelector(cuisineType);
   return cuisineSelector;
}
//Function to turn style on clicked box
function styleOn(boxElement, IconElement) {
   boxElement.classList.toggle("selectedStyle");
   IconElement.classList.toggle("hideIcon");
   IconElement.classList.toggle("online");
}
//Function to turn style off clicked box
function styleOff(boxElement, IconElement) {
   boxElement.classList.toggle("selectedStyle");
   IconElement.classList.toggle("online");
   IconElement.classList.toggle("hideIcon");
}
let footerBox = document.querySelector(".order-box");
//
function styleFooter() {
   footerBox.style.backgroundColor = "#32B72F";
   footerBox.querySelector("p").innerHTML = "Fechar o pedido";
   footerBox.querySelector("p").style.fontWeight = "700";
   footerBox.classList.add("ready-to-close")
}
function initialStyleFooter() {
   footerBox.style.backgroundColor = "#CBCBCB";
   footerBox.querySelector("p").innerHTML = "Selecione os 3 itens <br> para fechar o pedido";
   footerBox.querySelector("p").style.fontWeight = "400";
   footerBox.classList.remove,("ready-to-close");
}
//
function verifyNumberOfChoices () {
   if (document.querySelectorAll(".selectedStyle").length == 3) {
      styleFooter();
   }else { 
      initialStyleFooter();
   }
}
//Function to apply tests and give client visual feedback of his/her choices 
function optionClick(boxChosen) {
   let cuisineSet = typeOfCuisine(boxChosen);
   let verifyVariable = cuisineSet.querySelector(".selectedStyle");
   let verifyIcon = cuisineSet.querySelector(".online");
   //Criar variável para armazenar o caminho até o ícone da caixa selecionada
   let IconToDisplay = boxChosen.querySelector(".hideIcon");
   //Consertando bug do usuário clicar duas vezes no mesmo item
   if (boxChosen.classList.contains("selectedStyle")) {
      let IconToHide = boxChosen.querySelector(".online");
      verifyNumberOfChoices();
      return;
   }
   if (verifyVariable !=  null) {
      if (verifyVariable.classList[1] == boxChosen.classList[1]) {
         //Desestilizar o previamente selecionado
         styleOff(verifyVariable, verifyIcon);
         // Estilizar o selecionado
         styleOn(boxChosen, IconToDisplay);
        // Caso o selecionado esteja em grupo diferente do previament selecionado 
      }else {styleOn(boxChosen, IconToDisplay)};
   } 
   //Caso seja o primeiro clique do usuário
      else {styleOn(boxChosen, IconToDisplay)};
   //Verificando se o pedido foi feito de maneira completa
   verifyNumberOfChoices();
   linkToContact();
}

function linkToContact() {
   let footer =document.querySelector(".footer-box") 
   if (footerBox.classList.contains("ready-to-close")) {
     footer.onmouseover = () => {
      footer.style.cursor ="pointer";
     }
      footer.onclick = () => location.href = "https://wa.me/?text="+constructString();
   }
}

function constructString () {
   let cuisinesToClose = document.querySelectorAll(".selectedStyle");
   let foodToClose =cuisinesToClose[0].querySelector("p2").innerHTML;
   let drinkToClose =cuisinesToClose[1].querySelector("p2").innerHTML;
   let sweetToClose =cuisinesToClose[2].querySelector("p2").innerHTML;
   //
   let foodPrice = Number(cuisinesToClose[0].querySelector("p4").innerHTML.replace(/[a-z]|[$]/gi,"").replace(/[,]/,"."));
   let drinkPrice = Number(cuisinesToClose[1].querySelector("p4").innerHTML.replace(/[a-z]|[$]/gi,"").replace(/[,]/,"."));
   let sweetPrice = Number(cuisinesToClose[2].querySelector("p4").innerHTML.replace(/[a-z]|[$]/gi,"").replace(/[,]/,"."));
   //
   let totalPrice = foodPrice + drinkPrice + sweetPrice; 
   let partialString = `Olá, gostaria de fazer o pedido:
   - Prato: ${foodToClose};
   - Bebida: ${drinkToClose};
   - Sobremesa: ${sweetToClose};
   Total: R$ ${totalPrice.toFixed(2)}`;
   //
   let totalString = encodeURIComponent(partialString);
   return totalString;
   }


