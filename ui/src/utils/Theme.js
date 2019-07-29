import { createGlobalStyle } from 'styled-components';


const Theme = {
  colors: {
    primary: '#EB5757',
    white: '#fff',
    black: '#14171a',
    background: '#e6ecf0',
    muted: '#66757f',
    error: '#b40000',
    like: '#ee2626',
    star: '#ff8f00',
    success: '#229e08'
  },
  fonts: {
    primary: 'sans-serif'
  }
}; 

export default Theme;


// base styles
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0; 
    padding: 0; 
    font-family: sans-serif;
    box-sizing: border-box;
  }
  html {
    overflow-y: scroll;
    overflow-x: hidden;
  }
  a {
    text-decoration: none; 
  }
  button {
    border: none; 
    background-color: transparent; 
    outline: none;
  }
  a, 
  a *,
  button, 
  button * {
    cursor: pointer;
  }
  ul,
  ol {
    list-style: none;
    li {
      list-style-type: none;
    }
  }
  #root {
    position: relative; 
  }
  p {
    color: ${props => props.theme.colors.black};
  }
`;