const socket = io();

let username;

// Check if user already has identity stored
if (!localStorage.getItem("username")) {
  const choice = confirm("Do you want to chat anonymously?\nOK = Anonymous, Cancel = Choose a name.");

  if (choice) {
    // Anonymous with random tag
    username = "Anonymous#" + Math.floor(1000 + Math.random() * 9000);
  } else {
    username = prompt("Enter your username:") || "Guest";
  }

  localStorage.setItem("username", username);
} else {
  username = localStorage.getItem("username");
}

const form = document.getElementById("chat-form");
const input = document.getElementById("msg");
const messagesDiv = document.getElementById("messages");

// Send message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    const data = {
      user: username,
      msg: input.value,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    socket.emit("chat message", data);
    input.value = "";
  }
});

// Receive message
socket.on("chat message", (data) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<strong>${data.user}</strong> <span class="time">[${data.time}]</span>: ${data.msg}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
