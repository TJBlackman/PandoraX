import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ExtensionContainer } from '../components/extension-container';
import { NowPlaying } from '../components/now-playing';

export const Settings = (props) => {
  return (
    <ExtensionContainer>
      <Wrapper>
        <div className='header'>
          <h1>Settings</h1>
          <NowPlaying />
        </div>
        <nav>
          <Link to='/settings/history'>Song History</Link>
          <Link to='/settings/library'>Song Library</Link>
          <Link to='/settings/controls'>Controls</Link>
          <Link to='/settings/theme'>Theme</Link>
          <Link to='/settings/donate'>Donate</Link>
        </nav>
      </Wrapper>
    </ExtensionContainer>
  );
};

const Wrapper = styled.div`
  height: 100%;
  background-color: #f7f7f7;
  padding: 5px;

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;

    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid grey;
  }

  h1 {
    color: #1b1b1b;
    font-size: 24px;
  }

  nav a {
    display: block;
    height: 40px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding-left: 10px;
  }
`;
