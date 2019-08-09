import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { SongContext } from './context/song.context';

import AlbumArt from './components/albumart/AlbumImage'
import ControlsAndInfo from './components/ControlsAndInfo';
import SettingsPanel from './components/settings/SettingsPanel';
import SettingsButton from './components/settings/SettingsButton';

import sendMessage from './utils/sendMessage';


const App = () => {

  const { setSong } = useContext(SongContext);


  useEffect(() => {
    if (!window.chrome.runtime.onMessage){ return undefined; }
    
    const listener = (request) => {
      switch(request.type){
        case 'new song': {
          setSong(request.payload); 
          break; 
        }
        default: return null; 
      }
    }

    window.chrome.runtime.onMessage.addListener(listener);
    
    sendMessage({type: 'GET SONG INFO'}, (res) => {
      if (res) {
        setSong(res);
      }
    });

  }, []); 

  return (
    <Wrapper>
      <SettingsButton />
      <SettingsPanel />
      <AlbumArt />
      <ControlsAndInfo />
    </Wrapper>
  );
}


export default App;

const Wrapper = styled.div`
  height: auto; 
  width: 300px; 
  position: relative;
`; 