export const getLastAudioTag = () => document.querySelector('body > audio:last-of-type');

export const skipSong = () => {
  const audioTag = getLastAudioTag();
  audioTag.currentTime = audioTag.duration;
};

export const replaySong = () => {
  const audioTag = getLastAudioTag();
  audioTag.currentTime = 0;
};

export const jumpToTimeInSong = (timeInSeconds) => {
  const audioTag = getLastAudioTag();
  let time = timeInSeconds;
  if (timeInSeconds > audioTag.duration) {
    time = audioTag.duration;
  }
  if (timeInSeconds < 0) {
    time = 0;
  }
  audioTag.currentTime = time;
};

export const setSongVolume = (number) => {
  const audioTag = getLastAudioTag();
  let target = number;
  if (number > 1) {
    target = 1;
  }
  if (number < 0) {
    target = 0;
  }
  audioTag.volume = target;
};

export const toggleSongMute = () => {
  const audioTag = getLastAudioTag();
  audioTag.muted = !audioTag.muted;
};

export const pauseSong = () => {
  const audioTag = getLastAudioTag();
  audioTag.pause();
};

export const playSong = () => {
  const audioTag = getLastAudioTag();
  audioTag.play();
};

export const setPlaybackSpeed = () => {
  // 1 is normal, 1.5 is 150%
  const audioTag = getLastAudioTag();
  audioTag.playbackRate = speed;
};
