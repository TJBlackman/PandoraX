import React, { Component, Suspense } from 'react';
import styled from 'styled-components';

import AlbumArtAndSettings from './components/AlbumArtAndSettings';
import AlbumArt from './components/albumart/AlbumImage'
import ControlsAndInfo from './components/ControlsAndInfo';
import SettingsPanel from './components/settings/SettingsPanel';
import SettingsButton from './components/settings/SettingsButton';

import sendMessage from './utils/sendMessage';

const songObjModel = {
  album: '',
  albumArt: '',
  artist: '',
  isThumbsUp: false,
  song: '',
  station: '',
  volume: ''
};


class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      settingsPanelIsOpen: true,
      song: songObjModel
    }
  }

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
      <Wrapper>
        <SettingsButton onClick={this.toggleSettings} />
        <SettingsPanel open={settingsPanelIsOpen} />
        <AlbumArt imgSrc={song.albumArt} />
        <ControlsAndInfo song={song}/>
      </Wrapper>
    );
  }
}

export default App;

const Wrapper = styled.div`
  height: auto; 
  width: 300px; 
  position: relative;
`; 