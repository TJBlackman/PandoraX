import { getSongData } from './get-song-info';

export const postMessageSongInfo = () => {
  const songData = getSongData();
  chrome.runtime.sendMessage(chrome.runtime.id, {
    type: 'new song',
    payload: songData,
  });
};
