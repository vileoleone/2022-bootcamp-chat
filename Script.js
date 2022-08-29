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

//
// Função para adicionar o enter no input (Bônus)
//

messageToSend.addEventListener("keypress", (enter) => {
    if (enter.key==="Enter") {
        sendMessage();
    }
})

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

//
// Função para pegar a lista de participantes e inserir lista
//

function getparticipants() {
    const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promisse.then((response) => {
        let ready =response.data;
        iconList.innerHTML=
        ` <li>
            <ion-icon name="person-circle"></ion-icon>
            <span>Todos</span>
            <span>
              <ion-icon name="checkmark" class = "checkmark" ></ion-icon>
            </span>
          </li>`;
        for (let i = 0; i < ready.length; i++) {
            let participant = ready[i].name
            iconList.innerHTML+=
            `<li><ion-icon name="people"></ion-icon>
                <span> ${participant}</span>
                <span>
              <ion-icon name="checkmark" class = "checkmark hidden" ></ion-icon>
            </span>
            </li>`
            
        }

    })
}
//
//Funções para response no momento de login 
//
function sucessEntry(response) {
    nameOfUser = userName.value
    loginSection.classList.toggle("hidden");
    chatSection.classList.toggle("hidden");
    addNametoList(nameOfUser);
    getparticipants();
    chatInitial();
    setInterval(getparticipants, 10000)
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
// Requisições e funções para chamar mensagens
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
//
// Funções para response no envio de mensagem
// 
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
