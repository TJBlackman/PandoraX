import React, { useContext } from 'react';
import styled from 'styled-components';
import { ScrollableText } from '../scrollable-text';

import { SongContext } from '../../contexts/song-context';

export const TrackInfoPanel = () => {
  const songContext = useContext(SongContext);
  const { songName, album, artist } = songContext.songInfo;
  return (
    <Wrapper>
      <div className='row'>
        <label>Title:</label>
        <ScrollableText text={songName} />
      </div>
      <div className='row'>
        <label>Album:</label>
        <ScrollableText text={album} />
      </div>
      <div className='row'>
        <label>Artist:</label>
        <ScrollableText text={artist} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .row {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    margin: 0px 0 10px 0;
  }
  label {
    flex: 0 0 60px;
    color: ${props => props.theme.colors.white};
    letter-spacing: 0.5px;
    font-weight: 400;
    font-size: 14px;
  }
`;
