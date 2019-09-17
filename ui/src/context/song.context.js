import React, { useState, createContext } from "react";

export const SongContext = createContext();

const default_context = {
  station: "",
  songName: "",
  artist: "",
  album: "",
  albumArt: "",
  volume: 1,
  isThumbsUp: false,
  isThumbsDown: false,
  currentTime: 1,
  duration: 1,
  paused: false,
  src: ""
};

export const SongProvider = ({ children }) => {
  const [song, setSong] = useState(default_context);

  const clearSong = () => setSong(default_context);

  const providerValue = {
    song: song,
    setSong: setSong,
    clearSong: clearSong
  };

  return (
    <SongContext.Provider value={providerValue}>
      {children}
    </SongContext.Provider>
  );
};
