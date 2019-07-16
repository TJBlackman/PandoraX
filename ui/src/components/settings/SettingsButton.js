import React, { Component } from 'react'; 
import styled from 'styled-components';

import Button from '../buttonsAndIcons/Button';

export default class SettingsPanel extends Component {
    render() {
        return (
            <Wrapper>
                <Button icon="gear" onClick={this.props.onClick}/>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    display: inline;
    position: absolute; 
    top: 5px; 
    right: 0; 
    z-index: 19;

    > button {
        border: none; 
        background-color: transparent;
        cursor: pointer; 

        svg {
            fill: white; 
            height: 20px; 
            width: 20px; 
            filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.75));
        }
    }
`;