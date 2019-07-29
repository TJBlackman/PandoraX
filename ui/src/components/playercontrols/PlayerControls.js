import React, { Component } from 'react'; 
import styled from 'styled-components';

import Button from '../buttonsAndIcons/Button';

import sendMessage from '../../utils/sendMessage'

export default class PlayerControls extends Component {

    render() {
        console.log(this.props.song);
        const { song, reset } = this.props; 
        return (
            <Wrapper>
                <Button icon={song.isThumbsDown ? 'thumbsdownconfirmed' : 'thumbsdown'} onClick={() => { sendMessage({type:'thumbsdown'}); reset(); }} />
                <Button icon="replay" onClick={() => { sendMessage({type:'replay'}) }} />
                {
                    song.paused
                        ? <Button icon="play" onClick={() => { sendMessage({type:'play'}) }} />
                        : <Button icon="pause" onClick={() => { sendMessage({type:'pause'}) }} />
                }
                <Button icon="next" onClick={() => { sendMessage({type:'next'}); reset(); }} />
                <Button icon={song.isThumbsUp ? 'thumpsupconfirmed' : 'thumbsup'} onClick={() => { sendMessage({type:'thumbsup'}) }} />
                <Button icon="download" onClick={() => { sendMessage({type:'download'}) }} />
            </Wrapper>
        )
    }
}; 

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