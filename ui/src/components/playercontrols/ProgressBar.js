import React, { Component } from 'react'; 
import styled from 'styled-components';

export default class ProgressBar extends Component {
    render() {
        return (
            <Wrapper></Wrapper>
        )
    }
}

const Wrapper = styled.div`
    display: block; 
    height: 2px; 
    width: 100%;
    background-color: transparent; 
    position: relative; 
    
    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: white;
        border-top-right-radius: 99px;
        border-bottom-right-radius: 99px;
        transform: scaleX(0.7);
        transform-origin: left;
    }
`;