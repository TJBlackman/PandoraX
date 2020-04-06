import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ExtensionContainer } from "../components/extension-container";
import { AlbumArtContainer } from "../components/album-art-container";
import { ProgressBar } from "../components/progress-bar";
import { TrackInfoPanel } from "../components/track-info-panel";
import { PlayerControls } from "../components/player-controls";
import { Icon } from "../components/icon";

export const Index = () => (
  <ExtensionContainer>
    <Wrapper>
      <Link to="/settings" className="setting">
        <Icon svg="gear" />
      </Link>

      <AlbumArtContainer />
      <ProgressBar />
      <TrackInfoPanel />
      <PlayerControls />
    </Wrapper>
  </ExtensionContainer>
);

const Wrapper = styled.div`
  .setting {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 10;
    cursor: pointer;
    padding: 10px;

    &:hover svg {
      transform: scale(1.1);
    }
    &:active svg {
      transform: scale(0.9);
    }

    svg {
      height: 20px;
      width: 20px;
      fill: white;
      transition: transform 0.1s ease-in-out;
      filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.6));
      cursor: pointer;
    }
  }
`;
