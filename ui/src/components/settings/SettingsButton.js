import React, { useContext } from 'react'; 
import styled from 'styled-components';

import { UIContext } from '../../context/ui.context'; 

import Button from '../buttonsAndIcons/Button';

const SettingsPanel = (props) => {
    const { toggle_menu } = useContext(UIContext);
    
    return (
        <Wrapper>
            <Button icon="gear" onClick={toggle_menu}/>
        </Wrapper>
    )
}; 

export default SettingsPanel;

const Wrapper = styled.div`
    display: inline;
    position: absolute; 
    top: 0; 
    right: 0; 
    z-index: 19;

    > button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 10px;
        outline: 0;

        svg {
            fill: white; 
            height: 20px; 
            width: 20px; 
            filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.75));
        }
    }
`;