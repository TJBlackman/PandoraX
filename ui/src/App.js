import React, { Component, Suspense } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

import Theme, { GlobalStyles } from './utils/Theme';


import AlbumArtAndSettings from './components/AlbumArtAndSettings';
import AlbumArt from './components/albumart/AlbumImage'
import ControlsAndInfo from './components/ControlsAndInfo';
import SettingsPanel from './components/settings/SettingsPanel';
import SettingsButton from './components/settings/SettingsButton';

import sendMessage from './utils/sendMessage';
import ContextProvider from './context/providerComposer'

const songObjModel = {
  station: '',
  song: '',
  artist: '',
  album: '',
  albumArt: '',
  volume: 1,
  isThumbsUp: false,
  isThumbsDown: false,
  currentTime: 0,
  duration: 0,
  paused: false
};


class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      settingsPanelIsOpen: true,
      song: songObjModel
    }
  }

  resetSongInfo = () => this.setState({ song: songObjModel });

  updateCurrentSong = (song) => {
    this.setState({ song: song });
  }

  componentDidMount () {
    if (!window.chrome.runtime.onMessage){ return false; }

    sendMessage({type: 'GET SONG INFO'}, (res) => {
      if (res) {
        this.setState({ song: res });
      }
    });

    window.chrome.runtime.onMessage.addListener((request) => {
      switch(request.type){
        case 'new song': {
          this.updateCurrentSong(request.payload); 
          break; 
        }
        default: return null; 
      }
    });
  }

  toggleSettings = () => this.setState({ showSettings: !this.state.showSettings });

  render() {
    const { settingsPanelIsOpen, song } = this.state; 
    return (
      <ThemeProvider theme={Theme}>
        <ContextProvider>

          <GlobalStyles />
          
          <Wrapper>
            <SettingsButton onClick={this.toggleSettings} />
            <SettingsPanel open={settingsPanelIsOpen} />
            <AlbumArt imgSrc={song.albumArt} />
            <ControlsAndInfo song={song} reset={this.resetSongInfo}/>
          </Wrapper>
          
        </ContextProvider>   
      </ThemeProvider>
    );
  }
}

export default App;

const Wrapper = styled.div`
  height: auto; 
  width: 300px; 
  position: relative;
`; 