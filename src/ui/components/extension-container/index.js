import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Theme, GlobalStyles } from '../../theme';

import { SongContextProvider } from '../../contexts/song-context';

// this file should wrap every page, it provides high-level utilities
// such as theme providers, context providers, and global listeners

export const ExtensionContainer = ({ children }) => {
  return (
    <ThemeProvider theme={Theme}>
      <SongContextProvider>
        <GlobalStyles />
        <Wrapper>{children}</Wrapper>
      </SongContextProvider>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  height: 449px;
  width: 310px;
  position: relative;
  padding: 5px;
  background-color: ${(props) => props.theme.colors.primary};
  box-sizing: border-box;
  margin: 0 auto;
`;
