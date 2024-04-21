const chathuSelectorBtn = document.querySelector('#chathu-selector');
const ChantiSelectorBtn = document.querySelector('#Chanti-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => {
  return `
    <div class="message ${message.sender === 'chathu' ? 'from-chathu' : ''}">
      <div class="message-sender">${message.sender}</div>
      <div class="message-text">${message.text}</div>
      <div class="message-timestamp">${message.timestamp}</div>
    </div>`;
};

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });
};

let messageSender = 'chathu';

const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} chatting...`;
  chatInput.placeholder = `Type here, ${messageSender}...`;

  if (name === 'chathu') {
    chathuSelectorBtn.classList.add('active-person');
    ChantiSelectorBtn.classList.remove('active-person');
  }
  if (name === 'Chanti') {
    ChantiSelectorBtn.classList.add('active-person');
    chathuSelectorBtn.classList.remove('active-person');
  }

  
  chatInput.focus();
};

chathuSelectorBtn.onclick = () => updateMessageSender('chathu');
ChantiSelectorBtn.onclick = () => updateMessageSender('Chanti');

const sendMessage = (e) => {
  e.preventDefault();

  if (!chatInput.value.trim()) {
    return; // Prevent sending empty messages
  }

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };

  
  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));

   chatMessages.innerHTML += createChatMessageElement(message);

 
  chatInput.value = '';

 
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener('submit', sendMessage);

clearChatBtn.addEventListener('click', () => {
  localStorage.clear();
  chatMessages.innerHTML = '';
});
