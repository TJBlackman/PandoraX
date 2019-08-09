import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ThemeProvider } from 'styled-components';
import Theme, { GlobalStyles } from './utils/Theme';
import ContextProvider from './context/providerComposer';


const Index = () => (
    <ThemeProvider theme={Theme}>
        <ContextProvider>
            <GlobalStyles />
            <App />
        </ContextProvider>   
    </ThemeProvider>
);

ReactDOM.render(<Index />, document.getElementById('root'));

