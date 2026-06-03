const dogAudio = document.getElementById("dogAudio");
const barkButton = document.getElementById("barkButton");
const rewindBtn = document.getElementById("rewindBtn");
const pauseBtn = document.getElementById("pauseBtn");
const forwardBtn = document.getElementById("forwardBtn");
const dogVideo = document.getElementById("dogVideo");
const galleryItems = Array.from(document.querySelectorAll(".gallery figure"));
const prevImageBtn = document.getElementById("prevImageBtn");
const nextImageBtn = document.getElementById("nextImageBtn");
const imageStatus = document.getElementById("imageStatus");

const skipSeconds = 2;
let activeImage = 0;

barkButton.addEventListener("click", () => {
  dogAudio.currentTime = 0;
  dogAudio.play();
});

function selectImage(index) {
  activeImage = (index + galleryItems.length) % galleryItems.length;
  galleryItems.forEach((item, itemIndex) => {
    item.classList.toggle("is-active", itemIndex === activeImage);
  });
  imageStatus.textContent = `Imagen ${activeImage + 1} de ${galleryItems.length}`;
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => selectImage(index));
});

prevImageBtn.addEventListener("click", () => selectImage(activeImage - 1));
nextImageBtn.addEventListener("click", () => selectImage(activeImage + 1));
selectImage(0);

rewindBtn.addEventListener("click", () => {
  dogVideo.currentTime = Math.max(0, dogVideo.currentTime - skipSeconds);
});

pauseBtn.addEventListener("click", () => {
  if (!dogVideo.paused) {
    dogVideo.pause();
    pauseBtn.textContent = "Reproducir";
  } else {
    dogVideo.play();
    pauseBtn.textContent = "Pausar";
  }
});

forwardBtn.addEventListener("click", () => {
  const duration = Number.isFinite(dogVideo.duration) ? dogVideo.duration : dogVideo.currentTime + skipSeconds;
  dogVideo.currentTime = Math.min(duration, dogVideo.currentTime + skipSeconds);
});

dogVideo.addEventListener("ended", () => {
  pauseBtn.textContent = "Reproducir";
});
