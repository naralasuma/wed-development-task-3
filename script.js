// ==== Carousel Logic ====
const images = [
  "https://via.placeholder.com/600x300?text=Image+1",
  "https://via.placeholder.com/600x300?text=Image+2",
  "https://via.placeholder.com/600x300?text=Image+3"
];

let currentIndex = 0;
const carouselImg = document.getElementById("carousel-img");

function showImage(index) {
  if (carouselImg) {
    carouselImg.src = images[index];
  }
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

// Initial image
showImage(currentIndex);

// ==== Joke Loader ====
async function loadJoke() {
  const jokeElement = document.getElementById("joke");
  if (!jokeElement) return;

  jokeElement.textContent = "Loading...";
  try {
    const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
    const data = await res.json();
    jokeElement.textContent = data.joke || "No joke found.";
  } catch (error) {
    jokeElement.textContent = "Error loading joke.";
  }
}

// ==== Dark Mode Toggle ====
const toggleBtn = document.getElementById("darkModeToggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}

// ==== Back to Top Button ====
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTopBtn) return;

  const scrolled = window.scrollY || document.documentElement.scrollTop;
  backToTopBtn.style.display = scrolled > 200 ? "block" : "none";
});

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==== Animate Progress Bars ====
let progressAnimated = false;

function animateProgressBars() {
  const bars = document.querySelectorAll(".progress");
  bars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress");
    bar.style.width = progress + "%";
  });
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

window.addEventListener("scroll", () => {
  if (progressAnimated) return;

  const services = document.querySelector(".services");
  if (services && isElementInViewport(services)) {
    animateProgressBars();
    progressAnimated = true;
  }
});

// ==== Form Validation ====
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const message = form.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert(Thank you for contacting us, ${name}!);
    form.reset();
  });
}
