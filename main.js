let slideId = [
  "mySlides1",
  "mySlides2",
  "mySlides3",
  "mySlides4",
  "mySlides5",
  "mySlides6",
  "mySlides7",
  "mySlides8",
  "mySlides9",
  "mySlides10",
  "mySlides11",
];
let slideIndex = new Array(slideId.length).fill(1);

// inicializar todos os sliders
for (let i = 0; i < slideId.length; i++) {
  showSlides(1, i);
}

function plusSlides(n, no) {
  showSlides((slideIndex[no] += n), no);
}

function showSlides(n, no) {
  let i;
  let x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {
    slideIndex[no] = 1;
  }
  if (n < 1) {
    slideIndex[no] = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex[no] - 1].style.display = "block";
}

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // remove active from all links
        navLinks.forEach((link) => link.classList.remove("active"));
        // add active to the current one
        const activeLink = document.querySelector(
          `nav a[href="#${entry.target.id}"]`
        );
        activeLink.classList.add("active");
      }
    });
  },
  { threshold: 0.6 } // section must be at least 60% visible to be "active"
);

sections.forEach((section) => observer.observe(section));

// ============= GIF INVASION

const crack = ["gifs/crack1.gif", "gifs/crack2.gif", "gifs/crack3.gif"];
let idleTimer;
let isIdle = false;
let invasionInProgress = false;
let gifTimeouts = []; // track all scheduled GIF timeouts

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

    gifTimeouts.push(timeoutID); // save timeout ID
  }
}

function resetIdleTimer() {
  // remove GIFs if invasion is running
  if (invasionInProgress) {
    document.querySelectorAll(".idle-gif").forEach((el) => el.remove());
    invasionInProgress = false;
    isIdle = false;

    // clear all pending GIF timeouts
    gifTimeouts.forEach((id) => clearTimeout(id));
    gifTimeouts = [];
  }

  // clear idle timer
  clearTimeout(idleTimer);

  // start a new 10s timer
  idleTimer = setTimeout(() => {
    if (!invasionInProgress) {
      isIdle = true;
      showIdleGifs();
    }
  }, 80000); // <<-- THIS is the idle time in ms (80,000 ms = 80 seconds)
}

// listen for user activity
["mousemove", "keydown", "scroll", "click", "touchstart"].forEach((evt) =>
  window.addEventListener(evt, resetIdleTimer)
);

// start timer on page load
resetIdleTimer();

// ============= ALERT PAGE

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

// pick a random GIF
const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

// select the alert div
const alertDiv = document.querySelector(".alert");

// set the background
alertDiv.style.backgroundImage = `url('gifs/${randomGif}')`;
alertDiv.style.backgroundSize = "cover"; // fill the div
alertDiv.style.backgroundPosition = "center"; // center the GIF
alertDiv.style.backgroundRepeat = "no-repeat"; // prevent tiling
