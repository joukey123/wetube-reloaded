import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

//
const handleDownload = async () => {
  // load
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerText = "Transcoding...";
  actionBtn.disabled = true;

  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";
  const ffmpeg = new FFmpeg();

  ffmpeg.on("log", ({ message }) => console.log(message));

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });

  // transcode
  await ffmpeg.writeFile("recording.webm", await fetchFile(videoFile));
  await ffmpeg.exec(["-i", "recording.webm", "-r", "60", "output.mp4"]);
  await ffmpeg.exec([
    "-i",
    "recording.webm",
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    "thumbnail.png",
  ]);

  const mp4File = await ffmpeg.readFile("output.mp4");
  const thumbFile = await ffmpeg.readFile("thumbnail.png");

  const mp4Url = URL.createObjectURL(
    new Blob([mp4File.buffer], { type: "video/mp4" })
  );
  const thumUrl = URL.createObjectURL(
    new Blob([thumbFile.buffer], { type: "image/png" })
  );

  const mp4A = document.createElement("a");
  mp4A.href = mp4Url;
  mp4A.download = "myMp4.mp4";
  document.body.appendChild(mp4A);
  mp4A.click();

  const thumbA = document.createElement("a");
  thumbA.href = thumUrl;
  thumbA.download = "myThumbnail.png";
  document.body.appendChild(thumbA);
  thumbA.click();

  actionBtn.disabled = false;
  actionBtn.innerText = "Record Again";
  init();
  actionBtn.addEventListener("click", handleStart);
};
const handleStop = () => {
  actionBtn.innerText = "Download Video";
  actionBtn.removeEventListener("click", handleStop);
  actionBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  actionBtn.innerText = "Stop Recorder";
  actionBtn.removeEventListener("click", handleStart);
  actionBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };

  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};
init();

actionBtn.addEventListener("click", handleStart);
