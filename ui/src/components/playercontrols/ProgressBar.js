import React, { useState, useContext, useEffect } from 'react'; 
import styled from 'styled-components';

import { SongContext } from '../../context/song.context'; 

const ProgressBar = () => {
    const { song } = useContext(SongContext);
    const [duration, setDuration] = useState(song.duration);

    const animationInterval = 100;
    const incrementSlider = animationInterval / (song.duration * 1000); 
    let timeout;   

    useEffect(() => {
        if (song.paused === false){ 
            timeout = setTimeout(() => {
                const percent = duration + incrementSlider; 
                return percent <= 1
                    ? setDuration(percent)
                    : clearTimeout(timeout)
            }, animationInterval);
        };
        return () => clearTimeout(timeout);
    });

    useEffect(() => {
        clearTimeout(timeout);
        setDuration(song.currentTime/song.duration); 
    }, [song.name, song.currentTime])
        
    return <Wrapper duration={duration}></Wrapper>;
};

export default ProgressBar; 

const Wrapper = styled.div`
    display: block; 
    height: 4px; 
    width: 100%;
    background-color: transparent; 
    position: relative; 
    border-top: 1px solid rgb(54, 104, 255);
    
    &:before {
        content: "";
        position: absolute;
        top: 1px;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: white;
        border-top-right-radius: 99px;
        border-bottom-right-radius: 99px;
        transform: ${props => `scaleX(${props.duration || 1})`}; 
        transform-origin: left;
    }
`;