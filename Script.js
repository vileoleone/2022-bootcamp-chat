const loginSection = document.querySelector(".login-section");
const chatSection = document.querySelector(".chat-section");
const chatDiv = document.querySelector(".chat");
const iconList = document.querySelector(".list ul");
let peopleIcon = document.querySelector(".peopleIcon")
let sideBar = document.querySelector(".aside-bar")
let userName = document.querySelector(".entry-input")
let homeButton = document.querySelector(".entry-button")
let nameOfUser;
let blackWindow = document.querySelector(".black-visibility")
// Função para chamar o side-bar
function showSideBar() {
    sideBar.style.display = "initial"
    blackWindow.style.display = "initial"
 }

function hideSideBar() {
    sideBar.style.display = "none"
    blackWindow.style.display = "none"
 }
//
// Requisições e funções para entrar no chat
//

function addNametoList(name) {
    iconList.innerHTML+=
    `<li><ion-icon name="people"></ion-icon>
        <span> ${name}</span>
    </li>`
}

function removeNametoList(name) {
    iconList.innerHTML-=
    `<li><ion-icon name="people"></ion-icon>
        <span> ${name}</span>
    </li>`
}

function entryAnnounce(name) {
    chatDiv.innerHTML +=
    `<div class="chatbox"> 
        <p>(09:21:45) <b>${name}</b> entra na sala...</p> 
     </div>`
}

function departureAnnounce(name) {
    chatDiv.innerHTML +=
    `<div class="chatbox"> 
        <p>(09:21:45) <b>${name}</b> saiu da sala...</p> 
     </div>`
}

function postName() {
    nameOfUser= userName.value;
    let nameWritten = nameIntoObject(userName.value);
    let promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',nameWritten)
    return promisse
}
function postStatus() {
    nameOfUser= userName.value;
    let nameWritten = nameIntoObject(userName.value);
    let promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',nameWritten)
    return promisse    
}

function statusOn(response) {
    return console.log(true)
}

function statusOFF(response) {
    removeNametoList(nameOfUser);
    departureAnnounce(nameOfUser);
}

function callForStatus() {
    let serverAwnser = postStatus();
    serverAwnser.then(statusOn);
    serverAwnser.catch(statusOFF);
}

function nameIntoObject (name) {
    return {
        name: `${name}`
      }
}

function sucessEntry(response) {
    loginSection.classList.toggle("hidden");
    chatSection.classList.toggle("hidden");
    addNametoList(nameOfUser);
    entryAnnounce(nameOfUser);
    setInterval(callForStatus, 5000)
}
function entryDenied(erro) {
    const statusCode = erro.response.status
    if(statusCode === 400) {
        userName.value="";
        alert("por favor digite um nome válido")
    }
}

function initialChatEntry(element) {
    let ServerAwnser = postName();
    ServerAwnser.then(sucessEntry)
    ServerAwnser.catch(entryDenied);
 }
//
// Requisições e funções para indicar status online
// 
chatInitial
function checkStatus(name) {
    console.log(name);
}

//
// Requisições e funções para chamar mensagem
// 

function receivedMessages(response) {
    console.log(response);
 }

function messageError(erro) {
    const statusCode = erro.response.status
    if(statusCode === 400) {
        userName.value="";
        alert("por favor digite um nome válido")
    }
}

function chatInitial() {
    alert("oi")
    console.log("oi")
    //const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    //promisse.then(receivedMessages)
    //promisse.catch(messageError)
}

