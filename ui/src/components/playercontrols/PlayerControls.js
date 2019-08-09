import React, { useContext } from 'react'; 
import styled from 'styled-components';

import { SongContext } from '../../context/song.context'

import Button from '../buttonsAndIcons/Button';

import sendMessage from '../../utils/sendMessage'

const PlayerControls = () => {
    const { song, clearSong } = useContext(SongContext);

    const thumbsDownIcon = song.isThumbsDown ? 'thumbsdownconfirmed' : 'thumbsdown';
    const thumbsUpIcon = song.isThumbsUp ? 'thumpsupconfirmed' : 'thumbsup'
    const thumbsDown = () => { 
        clearSong(); 
        sendMessage({type:'thumbsdown'}); 
    }
    const play = () => { sendMessage({type:'play'}) }
    const pause = () => { sendMessage({type:'pause'}) }
    const next = () => { 
        clearSong(); 
        sendMessage({type:'next'}); 
    }
    const thumbsUp = () => { sendMessage({type:'thumbsup'}) }
    const download = () => { sendMessage({type:'download'}) }
    const replay = () => sendMessage({type:'replay'});


    return (
        <Wrapper>
            <Button icon={thumbsDownIcon} onClick={thumbsDown} />
            <Button icon="replay" onClick={replay} />
            {
                song.paused
                    ? <Button icon="play" onClick={play} />
                    : <Button icon="pause" onClick={pause} />
            }
            <Button icon="next" onClick={next} />
            <Button icon={thumbsUpIcon} onClick={thumbsUp} />
            <Button icon="download" onClick={download} />
        </Wrapper>
    )
};

export default PlayerControls; 

const Wrapper = styled.div`
    display: flex; 
    flex-flow: row nowrap;
    justify-content: space-around; 
    align-items: center;  

    button {
        height: 40px; 
        width: 40px; 
        border: none; 
        background-color: transparent; 
        cursor: pointer; 
        text-align: center; 
        display: flex; 
        justify-content: center; 
        align-items: center; 

        &:hover {
            opacity: 0.66;
        }

        svg {
            fill: white; 
            height: 35px;
            width: 35px; 
        }
    }
`; 
