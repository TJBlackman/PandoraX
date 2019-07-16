import React from 'react';

import Download from './svg/download';
import Gear from './svg/gear';
import Thumpsup from './svg/thumbsup';
import Thumpsupconfirmed from './svg/thumbsupconfirmed';
import Thumbsdown from './svg/thumbsdown';
import Thumbsdownconfirmed from './svg/thumbsdownconfirmed';
import Replay from './svg/replay';
import Pause from './svg/pause';
import Play from './svg/play';
import Next from './svg/next';

function IconButton(props) {
    let SvgIcon; 
    switch(props.icon){
        case 'thumbsup':            { SvgIcon = Thumpsup; break; }
        case 'thumpsupconfirmed':   { SvgIcon = Thumpsupconfirmed; break; }
        case 'thumbsdown':          { SvgIcon = Thumbsdown; break; }
        case 'thumbsdownconfirmed': { SvgIcon = Thumbsdownconfirmed; break; }
        case 'replay':              { SvgIcon = Replay; break; }
        case 'pause':               { SvgIcon = Pause; break; }
        case 'play':                { SvgIcon = Play; break; }
        case 'next':                { SvgIcon = Next; break; }
        case 'download':            { SvgIcon = Download; break; }
        case 'gear':                { SvgIcon = Gear; break; }
        default: { SvgIcon = Download; }
    }

    return (
        <button onClick={props.onClick}>
            <SvgIcon />
        </button>
    )
}

export default IconButton;