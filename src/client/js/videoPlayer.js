const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumnRange = document.getElementById("volumn");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");

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
const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(11, 19);
};
const handleLoadedMetaData = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
const handleTimeUpDate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumnRange.addEventListener("input", handleVolumn);
volumnRange.addEventListener("change", handleChangeVolumn);

video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpDate);
timeline.addEventListener("input", handleTimelineChange);
