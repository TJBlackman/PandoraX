// when song changes
// send new song data to extension

import { postMessageSongInfo } from '../post-message-song-info';

export const onSongChangeObserver = () => {
  try {
    const observer_target = document.querySelector('.nowPlayingTopInfo__artContainer').parentElement;
    const observer = new MutationObserver((mutations) => {
      postMessageSongInfo();
    });

    const observer_options = {
      childList: false,
      subtree: true,
      attributes: true,
    };
    observer.observe(observer_target, observer_options);
  } catch (err) {
    return setTimeout(onSongChangeObserver, 2000);
  }
};
