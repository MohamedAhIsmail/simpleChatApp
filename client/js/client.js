const socket = io("http://localhost:3000/");

const msgInput = document.getElementById("msg");

function sendMsg() {
  if (msgInput.value) {
    socket.emit("msgInput", msgInput.value);
  }
  msgInput.value = "";
}

socket.on("replay", (value) => {
  console.log(value);

  const ms = `<li>
                <div class="msgbody">
                  <div class="top" id="top">
                    <div class="avatar"></div>
                    <div class="user">
                      <p class="fw-bold mb-0" id="user">Mohamed</p>
                      <p class="mb-0 time" id="time"></p>
                    </div>
                  </div>
                  <div class="msgtext" id="msgtext">${value}</div>
                </div>
              </li>`;

  document.getElementById("messageContainer").innerHTML += ms;

  function updateTime() {
    const now = new Date();

    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    
    const timeString = `${String(hours).padStart(2, "0")}:${minutes} ${period}`;

    const timeElements = document.querySelectorAll(".time");
    
    const lastTimeElement = timeElements[timeElements.length - 1];
    if (lastTimeElement) {
      lastTimeElement.textContent = timeString;
    }

  }

  // setInterval(updateTime, 1000);
  updateTime();

  window.scrollTo(0, document.body.scrollHeight);
});




msgInput.addEventListener("input", () => {
  socket.emit("typing");
});



socket.on("userTyping", () => {
  document.getElementById("typing").innerHTML = "Mohamed is typing";
});



msgInput.addEventListener("keyup", () => {
  socket.emit("stopTyping");
});



socket.on("userStopTyping", () => {
  setTimeout(() => {
    document.getElementById("typing").innerHTML = "";
  }, 2000);
});
