// ================= RANDOM BACKGROUND GIF =================
const gifs = [
  "gif01.gif",
  "gif02.gif",
  "gif03.gif",
  "gif04.gif",
  "gif05.gif",
  "gif06.gif",
  "gif07.gif",
  "gif08.gif",
  "gif09.gif",
];

// pick a random GIF for the page
const randomGifBody = gifs[Math.floor(Math.random() * gifs.length)];
document.body.style.backgroundImage = `url('gifs/${randomGifBody}')`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundRepeat = "no-repeat";

// pick a separate random GIF for the alert
const randomGifAlert = gifs[Math.floor(Math.random() * gifs.length)];
const alertDiv = document.querySelector(".alert");
alertDiv.style.backgroundImage = `url('gifs/${randomGifAlert}')`;
alertDiv.style.backgroundSize = "cover";
alertDiv.style.backgroundPosition = "center";
alertDiv.style.backgroundRepeat = "no-repeat";

// ================= RESIZE <a> AND <p> =================
const text = document.querySelector(".main-link");
const paragraph = document.querySelector(".subtitle");

function resizeText() {
  const viewportWidth = window.innerWidth;

  // Temporary span to measure <a> width
  const tempSpan = document.createElement("span");
  tempSpan.style.fontFamily = window.getComputedStyle(text).fontFamily;
  tempSpan.style.fontWeight = window.getComputedStyle(text).fontWeight;
  tempSpan.style.visibility = "hidden";
  tempSpan.style.whiteSpace = "nowrap";
  tempSpan.textContent = text.textContent;
  document.body.appendChild(tempSpan);

  let min = 0;
  let max = 1000;
  let fontSize = 10;
  const sidePadding = 60;

  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    tempSpan.style.fontSize = mid + "px";

    if (tempSpan.offsetWidth + sidePadding > viewportWidth) {
      max = mid - 1;
    } else {
      fontSize = mid;
      min = mid + 1;
    }
  }

  text.style.fontSize = fontSize + "px";
  document.body.removeChild(tempSpan);

  // Lift <a> visually
  const translateY = fontSize * 0.25;
  text.style.transform = `translateY(-${translateY}px)`;
  text.style.visibility = "visible";

  // Position <p> below <a>
  const spacingVW = -6;
  const spacingPx = (spacingVW / 100) * viewportWidth;
  const aRect = text.getBoundingClientRect();
  paragraph.style.top = `${aRect.bottom + spacingPx}px`;
  paragraph.style.visibility = "visible";
}

window.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    resizeText();
    window.addEventListener("resize", resizeText);
  });
});

// ================= GIF INVASION =================
const crack = ["gifs/crack1.gif", "gifs/crack2.gif", "gifs/crack3.gif"];
let idleTimer;
let isIdle = false;
let invasionInProgress = false;
let gifTimeouts = [];

function showIdleGifs() {
  invasionInProgress = true;
  const total = 53;

  for (let i = 0; i < total; i++) {
    const timeoutID = setTimeout(() => {
      const img = document.createElement("img");
      img.src = crack[Math.floor(Math.random() * crack.length)];
      img.className = "idle-gif";

      const x = Math.random() * (window.innerWidth - 150);
      const y = Math.random() * (window.innerHeight - 150);

      img.style.left = `${x}px`;
      img.style.top = `${y}px`;

      document.body.appendChild(img);
    }, i * 1000); // <<-- This means each new GIF is added every 1000 ms (1 second)

    gifTimeouts.push(timeoutID);
  }
}

function resetIdleTimer() {
  if (invasionInProgress) {
    document.querySelectorAll(".idle-gif").forEach((el) => el.remove());
    invasionInProgress = false;
    isIdle = false;

    gifTimeouts.forEach((id) => clearTimeout(id));
    gifTimeouts = [];
  }

  clearTimeout(idleTimer);

  idleTimer = setTimeout(() => {
    if (!invasionInProgress) {
      isIdle = true;
      showIdleGifs();
    }
  }, 80000); // <<-- THIS is the idle time in ms (80,000 ms = 80 seconds)
}

["mousemove", "keydown", "scroll", "click", "touchstart"].forEach((evt) =>
  window.addEventListener(evt, resetIdleTimer)
);

resetIdleTimer();
