document.addEventListener("DOMContentLoaded", function() {
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");

  const channelID = 'fDFO6KFGLXFBD0jS';

  const drone = new Scaledrone(channelID);

  drone.on('open', error => {
    if (error) {
      console.error(error);
    } else {
      console.log('Connected to Scaledrone');
    }
  });

  const room = drone.subscribe('chat-room');

  sendButton.addEventListener("click", function() {
    const message = messageInput.value.trim();
    if (message !== "") {
      drone.publish({
        room: 'chat-room',
        message,
        username: 'Nate'
      });
      messageInput.value = "";
    }
  });

  drone.on('message', (message) => {
    const messageElement = document.createElement("div");
    messageElement.className = "message";

    const senderUsername = message.clientData.username === 'Nate' ? 'Nate' : 'Ani';
    messageElement.textContent = `${senderUsername}: ${message.data}`;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendButton.click();
      event.preventDefault();
    }
  });
});
