const { shell, dialog, remote } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

const dependenciesPath = path.join(__dirname, 'binaries');

document.getElementById('openLink').addEventListener('click', (event) => {
    event.preventDefault();
    const url = event.target.dataset.url;
    shell.openExternal(url);
  });

function downloadVideo(videoUrl, savePath) {
  const defaultSavePath = './downloaded';

  const outputPath = savePath || defaultSavePath;
  const ytDlpPath = path.join(dependenciesPath, 'yt-dlp.exe');

  try {
    spawn(ytDlpPath, ['-P', outputPath, videoUrl]);
  } catch (error) {
    console.error('Failed to download video:', error);
  }
}

function downloadAudio(audioUrl, savePath) {
  const defaultSavePath = './downloaded';
  const ffmpegLocation = dependenciesPath;

  const outputPath = savePath || defaultSavePath;
  const ytDlpPath = path.join(dependenciesPath, 'yt-dlp.exe');

  try {
    spawn(ytDlpPath, [
      '-P',
      outputPath,
      '--ffmpeg-location',
      ffmpegLocation,
      '--extract-audio',
      '--audio-format',
      'mp3',
      audioUrl
    ]);
  } catch (error) {
    console.error('Failed to download audio:', error);
  }
}

async function selectFolder() {
    const window = remote.getCurrentWindow();
  
    try {
      const result = await dialog.showOpenDialog(window, {
        properties: ['openDirectory']
      });
      const selectedPath = result.filePaths[0];
      return selectedPath;
    } catch (error) {
      console.error('Failed to select folder:', error);
    }
  }

document.getElementById('downloadAudioButton').addEventListener('click', async () => {
    const audioUrl = document.getElementById('videoUrl').value;
    const savePath = await selectFolder();
    downloadAudio(audioUrl, savePath);
  });
  
  document.getElementById('downloadVideoButton').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    const savePath = await selectFolder();
    downloadVideo(videoUrl, savePath);
  });

document.getElementById('selectFolder').addEventListener('click', selectFolder);