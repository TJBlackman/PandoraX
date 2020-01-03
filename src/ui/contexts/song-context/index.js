import React, { createContext, useState, useEffect } from 'react';
import { sendMessage } from '../../utils/sendMessage';

const defaultSongContext = {
  station: 'Loading Station...',
  songName: 'Loading Song...',
  artist: 'Loading Artist...',
  album: 'Loading Album...',
  albumArt: null,
  volume: 0.5,
  isThumbsUp: false,
  isThumbsDown: false,
  currentTime: 0,
  duration: 180,
  paused: true,
  src: null,
  pandoraNotOpen: false
};

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [songState, setSongState] = useState(defaultSongContext);

  const setSongInfo = (songData) => {
    setSongState({
      ...defaultSongContext,
      ...songData
    });
  };

  // listen for window postMessage
  useEffect(() => {
    if (!window.chrome.runtime.onMessage) {
      return undefined;
    }

    const listener = (request) => {
      console.log('listener', request);
      switch (request.type) {
        case 'new song': {
          setSongInfo(request.payload);
          break;
        }
        default:
          return null;
      }
    };

    window.chrome.runtime.onMessage.addListener(listener);

    sendMessage({ type: 'GET SONG INFO' }, (res) => {
      if (res === 'not open') {
        setSongState({
          ...songState,
          pandoraNotOpen: true
        });
      } else {
        if (res) {
          setSongInfo(res);
        }
      }
    });
  }, []);

  return (
    <SongContext.Provider
      value={{
        songInfo: songState,
        setSongInfo
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
