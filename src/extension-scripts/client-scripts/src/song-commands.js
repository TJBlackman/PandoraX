import { getLastAudioTag } from './get-last-audio-tag';

export const PandoraCommands = {
  skip: function () {
    const audioTag = getLastAudioTag();
    audioTag.currentTime = audioTag.duration;
  },
  replay: function () {
    const audioTag = getLastAudioTag();
    audioTag.currentTime = 0;
  },
  scrub: function (time) {
    // in seconds
    const audioTag = getLastAudioTag();
    let target = time;
    if (time > audioTag.duration) {
      target = audioTag.duration;
    }
    if (time < 0) {
      target = 0;
    }
    audioTag.currentTime = target;
  },
  volume: function (number) {
    // 0 - 1
    const audioTag = getLastAudioTag();
    let target = number;
    if (number > 1) {
      target = 1;
    }
    if (number < 0) {
      target = 0;
    }
    audioTag.volume = target;
  },
  mute: function (boolean) {
    const audioTag = getLastAudioTag();
    audioTag.muted = boolean;
  },
  play: function () {
    const audioTag = getLastAudioTag();
    audioTag.play();
  },
  pause: function () {
    const audioTag = getLastAudioTag();
    audioTag.pause();
  },
  playbackRate: function (speed) {
    // 1 is normal, 1.5 is 150%
    const audioTag = getLastAudioTag();
    audioTag.playbackRate = speed;
  },
  thumbsup: () => {
    const btn = document.querySelector('[data-qa="thumbs_up_button"]');
    if (btn) {
      btn.click();
    }
  },
  thumbsdown: () => {
    const btn = document.querySelector('[data-qa="thumbs_down_button"]');
    if (btn) {
      btn.click();
    }
  },
  download: function () {
    let song = {
      songName: 'Unknown song',
      artist: 'Unknown Artist',
      src: undefined,
    };
    try {
      song = getSongData();
    } catch (err) {
      console.log(err);
    }
    console.log('download', song);
    // send to bg script
    chrome.runtime.sendMessage(extensionId, {
      type: 'download this song',
      payload: song,
    });
  },
};
