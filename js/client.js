const socket=io('http://localhost:8000');

const messageContainer=document.querySelector('.container')
const messageInput=document.querySelector('#messageInp')
const form=document.querySelector('#send-container')

const appendMessage= (message,position) =>{
    const msg=document.createElement("div");
    msg.innerText=message;
    msg.classList.add('message');
    msg.classList.add(position);
    messageContainer.append(msg)
}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const msgVal=messageInput.value
    appendMessage(`You : ${msgVal}`,'left')
    socket.emit('send',msgVal);
    messageInput.value=''
})

const username=prompt("Enter your name to join:");
socket.emit('new-user-joined',username);


socket.on('user-joined',name=>{
    appendMessage(`${name} has joined the chat`,'right')
});
socket.on('receive',data=>{
    appendMessage( `${data.name}:${data.message}`,'right')
});
socket.on('left',(name)=>{
    appendMessage( `${name} left the chat`,'right')
});