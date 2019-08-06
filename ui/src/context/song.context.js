import React, { useState, createContext } from "react";

export const SongContext = createContext();

const default_context = {
  station: "",
  song: "",
  artist: "",
  album: "",
  albumArt: "",
  volume: 1,
  isThumbsUp: false,
  isThumbsDown: false,
  currentTime: 0,
  duration: 0,
  paused: false,
  imgSrc: ""
};

export const SongProvider = ({ children }) => {
  const [state, setState] = useState(default_context);

  const providerValue = {
    song: state,
    setSong: setState
  };

  return (
    <SongContext.Provider value={providerValue}>
      {children}
    </SongContext.Provider>
  );
};
