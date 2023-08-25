const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumnRange = document.getElementById("volumn");

let volumnValue = 0.5;
video.volume = volumnValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Paused";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
    video.volume = volumnValue;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumnRange.value = video.muted ? 0 : volumnValue;
};

const handleVolumn = (event) => {
  const {
    target: { value },
  } = event;

  //   if (video.muted) {
  //     video.muted = false;
  //     muteBtn.innerText = "Mute";
  //   }
  if (Number(value) === 0) {
    video.muted = true;
    muteBtn.innerText = "Unmute";
  } else {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  video.volume = value;
};

const handleChangeVolumn = (event) => {
  const {
    target: { value },
  } = event;

  if (value != 0) {
    volumnValue = value;
  }
};
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumnRange.addEventListener("input", handleVolumn);
volumnRange.addEventListener("change", handleChangeVolumn);
