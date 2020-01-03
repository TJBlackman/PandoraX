import React, { useContext } from 'react';
import styled from 'styled-components';
import { SongContext } from '../../contexts/song-context';

import { Icon } from '../icon';
import { sendMessage } from '../../utils/sendMessage';

export const PlayerControls = () => {
  const { songInfo } = useContext(SongContext);
  return (
    <Wapper>
      <button
        type='button'
        onClick={() => {
          sendMessage({ type: 'thumbsdown' });
        }}
      >
        <Icon svg={songInfo.isThumbsDown ? 'thumbsdownconfirmed' : 'thumbsdown'} />
      </button>
      <button
        type='button'
        onClick={() => {
          sendMessage({ type: 'replay' });
        }}
      >
        <Icon svg='replay' />
      </button>
      <button
        type='button'
        onClick={() => {
          sendMessage({ type: songInfo.paused ? 'play' : 'pause' });
        }}
      >
        <Icon svg={songInfo.paused ? 'play' : 'pause'} />
      </button>
      <button
        type='button'
        onClick={() => {
          sendMessage({ type: 'next' });
        }}
      >
        <Icon svg='next' />
      </button>
      <button
        type='button'
        onClick={() => {
          sendMessage({ type: 'thumbsup' });
        }}
      >
        <Icon svg={songInfo.isThumbsUp ? 'thumpsupconfirmed' : 'thumbsup'} />
      </button>
      <button
        type='button'
        onClick={() => {
          sendMessage({ type: 'download' });
        }}
      >
        <Icon svg='download' />
      </button>
    </Wapper>
  );
};

const Wapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px 5px 0;

  button {
    padding: 0 5px;
  }

  button:hover svg {
    transform: scale(1.1);
  }

  button:active svg {
    transform: scale(0.9);
  }

  svg {
    fill: white;
    height: 30px;
    width: 30px;
    transition: transform 0.2 ease-in-out;
  }
`;

// songInfo.station: "Big Data Radio"
// songName: "Bleed Bleed Bleed (Part 1)"
// artist: "Thieves Like Us"
// album: "Bleed Bleed Bleed"
// albumArt: "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/public/int/2/2/3/4/817949014322_500W_500H.jpg"
// volume: "50"
// isThumbsUp: true
// isThumbsDown: false
// currentTime: 157.423828
// duration: 285.651882
// paused: false
// src:
