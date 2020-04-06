import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AlbumArtContainer } from "../album-art-container";

export const NowPlaying = () => {
  return (
    <Wrapper to="/">
      <h3>
        <span>Now</span>
        <span>Playing</span>
      </h3>
      <div className="album-art">
        <AlbumArtContainer />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-end;

  .album-art {
    display: block;
    height: 50px;
    width: 50px;
    box-sizing: border-box;
    border: 1px solid #3668ff;
    margin-left: 5px;

    /* album art overrides */
    > div {
      height: 50px;

      > div {
        padding: 3px;
      }
    }
  }

  small {
    margin: 0;
    font-size: 12px;
    line-height: 1;
  }
  h3 {
    font-size: 18px;
    margin: 0;
    line-height: 1;
  }
  span {
    display: block;
    text-align: right;
    color: #3668ff;
  }
`;
