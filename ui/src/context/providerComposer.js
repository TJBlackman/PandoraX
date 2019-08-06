import React from 'react';

// https://gist.github.com/stolinski/2d9545e19dd67bda64143cb1aae04ac0

import { SongProvider } from './song.context'; 

function ProviderComposer({ contexts, children }) {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  );
}

function ContextProvider({ children }) {
  return (
    <ProviderComposer contexts={[<SongProvider />]} >
      {children}
    </ProviderComposer>
  );
}

export default ContextProvider; 