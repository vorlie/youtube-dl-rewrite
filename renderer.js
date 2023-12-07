
function downloadVideo(videoUrl, savePath) {
  const defaultSavePath = './downloaded';
  const dependenciesPath = './binaries/';

  const outputPath = savePath || defaultSavePath;
  const ytDlpPath = dependenciesPath +'yt-dlp.exe';

  try {
    spawn(ytDlpPath, ['-P', outputPath, videoUrl]);
  } catch (error) {
    console.error('Failed to download video:', error);
  }
}

function downloadAudio(audioUrl, savePath) {
  const defaultSavePath = './downloaded';
  const dependenciesPath = './binaries/';
  const ffmpegLocation = dependenciesPath;
  

  const outputPath = savePath || defaultSavePath;
  const ytDlpPath = dependenciesPath + 'yt-dlp.exe';

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

const { electronBridge } = window || {};

document.getElementById('downloadAudioButton').addEventListener('click', async () => {
  const audioUrl = document.getElementById('videoUrl').value;
  const savePath = await electronBridge.selectFolder();
  electronBridge.downloadAudio(audioUrl, savePath);
});

document.getElementById('downloadVideoButton').addEventListener('click', async () => {
  const videoUrl = document.getElementById('videoUrl').value;
  const savePath = await electronBridge.selectFolder();
  electronBridge.downloadVideo(videoUrl, savePath);
});

document.getElementById('selectFolder').addEventListener('click', selectFolder);