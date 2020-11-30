import { getSongData } from './get-song-info';

export const thumbsUpSong = () => {
  const btn = document.querySelector('[data-qa="thumbs_up_button"]');
  if (btn) {
    btn.click();
  }
};

export const thumbsDownSong = () => {
  const btn = document.querySelector('[data-qa="thumbs_down_button"]');
  if (btn) {
    btn.click();
  }
};

export const downloadSong = () => {
  try {
    const song = getSongData();
    chrome.runtime.sendMessage(chrome.runtime.id, {
      type: 'download this song',
      payload: song,
    });
  } catch (err) {
    console.log(err);
  }
};
