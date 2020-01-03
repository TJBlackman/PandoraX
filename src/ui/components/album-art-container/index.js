import React, { useContext } from 'react';
import styled from 'styled-components';

import { SongContext } from '../../contexts/song-context';

import { AlbumSvgSpinner } from '../album-svg-spinner';
import { AlbumArtWork } from '../album-art-work';

export const AlbumArtContainer = () => {
  const { songInfo } = useContext(SongContext);
  const showAlbum = songInfo.albumArt ? true : false;

  // show spinning svg
  // show "Open Pandora In a New Tab"
  // show album art of playing track
  // show spnning svg with text "no album art"

  return (
    <Wrapper>
      {showAlbum ? <AlbumArtWork img={songInfo.albumArt} /> : <AlbumSvgSpinner openPandora={songInfo.pandoraNotOpen} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 300px;
  background-image: linear-gradient(180deg, #00a0ee, #3668ff 80%);
`;
