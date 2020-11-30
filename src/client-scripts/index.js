// when a pandora website is loaded
// this script is injected into the browser

import { jumpToTimeInSong, pauseSong, playSong, replaySong, skipSong } from './audio-commands';
import { downloadSong, thumbsDownSong, thumbsUpSong } from './pandora-commands';
import { getSongData } from './get-song-info';
import { onSongChangeObserver } from './observers/on-song-change';
import { onStillListeningObserver } from './observers/on-still-listening';
import { onAudioAdObserver, onVideoAdObserver } from './observers/on-ad-playing';
import { replaceNativeSkipButton } from './replace-native-skip';
import { replaceNativeReplayButton } from './replace-native-replay';
import { postMessageSongInfo } from './post-message-song-info';

window.addEventListener('load', () => {
  onSongChangeObserver();
  onStillListeningObserver();
  onAudioAdObserver();
  onVideoAdObserver();
  replaceNativeSkipButton();
  replaceNativeReplayButton();

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.type) {
      case 'GET SONG INFO': {
        const songData = getSongData();
        sendResponse(songData);
        break;
      }
      case 'replay': {
        replaySong();
        break;
      }
      case 'pause': {
        pauseSong();
        postMessageSongInfo();
        break;
      }
      case 'play': {
        playSong();
        postMessageSongInfo();
        break;
      }
      case 'next': {
        skipSong();
        break;
      }
      case 'thumbsup': {
        thumbsUpSong();
        postMessageSongInfo();
        break;
      }
      case 'thumbsdown': {
        thumbsDownSong();
        break;
      }
      case 'download': {
        downloadSong();
        break;
      }
      case 'scrub': {
        jumpToTimeInSong(request.payload); // time in seconds
        break;
      }
      default: {
        console.warn(`Unknown request.type "${request.type}"`);
      }
    }
    sendResponse({ success: true });
  });
});
