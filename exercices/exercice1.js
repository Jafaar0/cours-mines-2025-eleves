function sendMessage() {
    const name = document.getElementById('nameInput').value;
    const messageText = document.getElementById('messageInput').value;
    const messageContainer = document.getElementById('messageContainer');

    if (name && messageText) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';

        const nameElement = document.createElement('div');
        nameElement.className = 'name';
        nameElement.textContent = name;

        const timeElement = document.createElement('span');
        timeElement.className = 'time';
        const messageTime = new Date();
        timeElement.textContent = ` - ${getRelativeTime(messageTime)}`;
        timeElement.dataset.time = messageTime;

        const textElement = document.createElement('div');
        textElement.className = 'text';
        textElement.textContent = messageText;

        const likeButton = document.createElement('button');
        likeButton.textContent = 'Liker';
        likeButton.onclick = () => likeMessage(likeCounter);

        const likeCounter = document.createElement('span');
        likeCounter.className = 'like-counter';
        likeCounter.textContent = '0';

        nameElement.appendChild(timeElement);
        messageElement.appendChild(nameElement);
        messageElement.appendChild(textElement);
        messageElement.appendChild(likeButton);
        messageElement.appendChild(likeCounter);

        messageContainer.insertBefore(messageElement, messageContainer.firstChild);

        document.getElementById('messageInput').value = '';
    }
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function likeMessage(likeCounter) {
    let count = parseInt(likeCounter.textContent);
    likeCounter.textContent = count + 1;
}

function getRelativeTime(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return `il y a ${diff} sec`;
    const diffMinutes = Math.floor(diff / 60);
    if (diffMinutes < 60) return `il y a ${diffMinutes} min`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `il y a ${diffHours} h`;
    const diffDays = Math.floor(diffHours / 24);
    return `il y a ${diffDays} j`;
}

function updateTimes() {
    const timeElements = document.querySelectorAll('.time');
    timeElements.forEach(timeElement => {
        const messageTime = new Date(timeElement.dataset.time);
        timeElement.textContent = ` - ${getRelativeTime(messageTime)}`;
    });
}

setInterval(updateTimes, 60000); // Update every minute
