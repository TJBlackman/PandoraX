// listen for audio ads
// skip to the end of them

import { isCurrentMediaAdvertisement } from '../is-current-media-ad';
import { getLastAudioTag, skipSong } from '../audio-commands';

export const onAudioAdObserver = () => {
  try {
    const observer = new MutationObserver((arrayOfMutations) => {
      const isAd = isCurrentMediaAdvertisement();
      if (!isAd) {
        return;
      }

      const audioTagIsAdded = arrayOfMutations.some((mutation) =>
        Array.from(mutation.addedNodes).some((node) => node.tagName.toLowerCase() === 'audio')
      );
      if (!audioTagIsAdded) {
        return;
      }

      const skipAudioAd = () => {
        setTimeout(skipSong, 100);
        audioTag.removeEventListener('loadedmetadata', skipAudioAd, false);
      };

      const audioTag = getLastAudioTag();
      audioTag.addEventListener('loadedmetadata', skipAudioAd, false);
    });

    observer.observe(document.body, { childList: true });
  } catch (err) {
    return setTimeout(onAudioAdObserver, 2000);
  }
};

export const onVideoAdObserver = () => {
  const target = document.getElementById('adContainer');
  try {
    const observer = new MutationObserver((arrayOfMutations) => {
      const videoTags = target.querySelectorAll('[title="Advertisement"]');
      videoTags.forEach((video) => {
        const skipVideoAd = () => {
          video.volume = 0;
          video.currentTime = video.duration;
          video.removeEventListener('play', skipVideoAd, false);
        };
        video.addEventListener('play', skipVideoAd, false);
      });
    });

    observer.observe(target, { childList: true, subtree: true });
  } catch (err) {
    return setTimeout(onVideoAdObserver, 2000);
  }
};
