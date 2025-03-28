document.addEventListener("DOMContentLoaded", () => {
  const quoteDisplay = document.querySelector("quote");
  const moodSelect = document.getElementById("mood");
  const journalInput = document.getElementById("journal");
  const logList = document.getElementById("dailyLogs");

  function addLogItem(content) {
    const logItem = document.createElement("li");
    logItem.innerHTML = `
      ${content}
      <button class="editLog">Edit</button>
      <button class="deleteLog">Delete</button>
    `;
    logList.appendChild(logItem);
  }

  function fetchQuote() {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        quoteDisplay.textContent = `"${data.content}" - ${data.author}`;
      })
      .catch(() => {
        quoteDisplay.textContent = "Unable to load quote, please try again.";
      });
  }

  document.getElementById("button-1").addEventListener("click", fetchQuote);

  document.getElementById("inputMood").addEventListener("click", () => {
    const selectedMood = moodSelect.value;
    if (selectedMood) {
      addLogItem(`Mood: ${selectedMood}`);
    } else {
      alert("Please select a mood!");
    }
  });

  document.getElementById("inputJournal").addEventListener("click", () => {
    const journalText = journalInput.value.trim();
    if (journalText) {
      addLogItem(`Journal: ${journalText}`);
      journalInput.value = "";
    } else {
      alert("Please write a journal entry!");
    }
  });

  logList.addEventListener("click", (event) => {
    const logItem = event.target.parentElement;
    if (event.target.classList.contains("editLog")) {
      const newLog = prompt("Edit your log:", logItem.textContent.split("Edit")[0].trim());
      if (newLog) {
        logItem.innerHTML = `
          ${newLog}
          <button class="editLog">Edit</button>
          <button class="deleteLog">Delete</button>
        `;
      }
    } else if (event.target.classList.contains("deleteLog")) {
      logItem.remove();
      alert("Log deleted successfully!");
    }
  });

  const userList = document.getElementById("userList");

  function addUserToList(username, email) {
    const userItem = document.createElement("li");
    userItem.innerHTML = `
      Username: ${username}, Email: ${email}
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
    `;
    userList.appendChild(userItem);
  }

  document.getElementById("addUserForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    if (username && email) {
      addUserToList(username, email);
      alert("User added successfully!");
      event.target.reset();
    } else {
      alert("Please provide both username and email!");
    }
  });

  userList.addEventListener("click", (event) => {
    const userItem = event.target.parentElement;
    if (event.target.classList.contains("editBtn")) {
      const newUsername = prompt("Enter new username:", userItem.dataset.username || "Current Username");
      const newEmail = prompt("Enter new email:", userItem.dataset.email || "Current Email");
      if (newUsername && newEmail) {
        userItem.innerHTML = `
          Username: ${newUsername}, Email: ${newEmail}
          <button class="editBtn">Edit</button>
          <button class="deleteBtn">Delete</button>
        `;
      }
    } else if (event.target.classList.contains("deleteBtn")) {
      userItem.remove();
      alert("User deleted successfully!");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chatForm");
  const userMessageInput = document.getElementById("userMessage");
  const messagesDiv = document.getElementById("messages");

  const botResponses = {
    hello: "Hi there! How can I assist you today?",
    mood: "Tracking your mood is important. How are you feeling today?",
    journal: "You can share your thoughts with me. Journaling is great for mental clarity!",
    quote: "Stay positive! Here's a motivational quote for you: 'Believe you can and you're halfway there.'",
    goodbye: "Goodbye! Take care and stay well.",
    default: "Sorry, I don't quite understand that. Can you try asking something else?"
  };

  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userMessage = userMessageInput.value.trim().toLowerCase();

    if (userMessage) {
      addMessage("You: " + userMessage);

      const botReply = botResponses[userMessage] || botResponses.default;
      setTimeout(() => addMessage("Bot: " + botReply), 500);

      userMessageInput.value = "";
    }
  });

  function addMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
});
