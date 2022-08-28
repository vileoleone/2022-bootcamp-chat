const loginSection = document.querySelector(".login-section");
const chatSection = document.querySelector(".chat-section");
const chatDiv = document.querySelector(".chat");
const chatContainer= document.querySelector(".chat-container")
const iconList = document.querySelector(".list ul");
let peopleIcon = document.querySelector(".peopleIcon")
let sideBar = document.querySelector(".aside-bar")
let userName = document.querySelector(".entry-input")
let homeButton = document.querySelector(".entry-button")
let blackWindow = document.querySelector(".black-visibility")
let sendButton = document.querySelector(".send-button");
let messageToSend = document.querySelector(".user-write");
let messagesInObject;
let nameWritten;
//
// Função auxiliares
//
function showSideBar() {
    sideBar.style.display = "initial"
    blackWindow.style.display = "initial"
 }

function hideSideBar() {
    sideBar.style.display = "none"
    blackWindow.style.display = "none"
 }

function addNametoList(name) {
    iconList.innerHTML+=
    `<li><ion-icon name="people"></ion-icon>
        <span> ${name}</span>
    </li>`
}

function nameIntoObject (name) {
    nameWritten = name;
    return {
        name: `${name}`
      }
}

function forWhom(element) {;
    let ul = document.querySelector(".receiver-list");
    let itens = ul.getElementsByTagName('ion-icon');
    //const nameClass = element;
    //console.log(nameClass.classList.value)
    switch (element.classList.value) {
        case "receiver open":
            element.removeChild(element.children[0])
            
            break;
        case "receiver closed":
            element.removeChild(element.children[0])

            break;
        default :
        console.log(element.classname)
    }



   
}

//
// Requisições e funções para entrar no chat
//
function postName() {
    let nameWritten = nameIntoObject(userName.value);
    let promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',nameWritten)
    return promisse
}
function postStatus() {
    let nameWritten = nameIntoObject(userName.value);
    let promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',nameWritten)
}
//Funções para response no login 
function sucessEntry(response) {
    nameOfUser = userName.value
    loginSection.classList.toggle("hidden");
    chatSection.classList.toggle("hidden");
    addNametoList(nameOfUser);
    setInterval(chatInitial, 3000)
    setInterval(postStatus, 5000)
}
function entryDenied(erro) {
    let statusCode = erro.response.status
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
// Requisições e funções para chamar mensagem
// 

function receivedMessages(response) {
    messagesInObject = response.data
    chatDiv.innerHTML=""
    for (let i = 0; i < messagesInObject.length; i++) {
        currentMessage =messagesInObject[i];
        if(messagesInObject[i].type==="status") {
            chatDiv.innerHTML+=
            `<span class = "chatbox">
                <div class="time">(${messagesInObject[i].time})</div>
                <div><b>${messagesInObject[i].from}</b> ${messagesInObject[i].text}</div>
            </span>`
            }
        if(messagesInObject[i].type==="message") {
            chatDiv.innerHTML+=
            `<span class = "chatbox normal">
                <div class="time">(${messagesInObject[i].time})</div>
                <div><b>${messagesInObject[i].from}</b> para <b>${messagesInObject[i].to}: </b>${messagesInObject[i].text}</div>
            </span>`
            }
        if(messagesInObject[i].type==="private_message") {
            chatDiv.innerHTML+=
            `<span class = "chatbox private">
                <div class="time">(${messagesInObject[i].time})</div>
                <div><b>${messagesInObject[i].from}</b> Reservadamente para <b>${messagesInObject[i].to}: </b>${messagesInObject[i].text}</div>
            </span>`
            }
    }
    let lastMessage = chatDiv.querySelectorAll(".chatbox");
    lastMessage[lastMessage.length-1].scrollIntoView(false);
 }
function messageError(erro) {
    let statusCode = erro.response.status
    console.log(statusCode);
}
function chatInitial() {
    let promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promisse.then(receivedMessages);
    promisse.catch(messageError);    
}
//
// Funções para envio de mensagem
//
function sendMessage() {
    let messageToPost = {
        from: userName.value,
        to: "Todos",
        text: messageToSend.value,
        type: "message" 
    }
    const promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",messageToPost)
    promisse.then( () => {
        messageToSend.value =""
        chatInitial();
    })
    promisse.catch( () => {
        window.location.reload();
    })
}





