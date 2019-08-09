import React, { useContext } from 'react'; 
import styled from 'styled-components';
import { UIContext } from '../../context/ui.context';

const SettingsPanel = () => {

    const { ui, toggle_menu } = useContext(UIContext);
    return (
        <Wrapper className={ui.menuIsOpen ? 'visible' : 'hidden'}>
            <div className="close-menu">
                <button onClick={toggle_menu}>Close Menu</button>
            </div>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        </Wrapper>
    )
}; 

export default SettingsPanel;

const Wrapper = styled.div`
    position: absolute;
    top: 0; 
    left: 0; 
    width: 100%; 
    z-index: 99;
    height: 100%; 
    background-color: white; 
    transition: cubic-bezier(0, 0, 0.2, 1) .4s all;
    opacity: 1; 
    &.hidden {
        transform: translateX(105%);
        opacity: 0; 
    }



    .close-menu {
        button {
            padding: 10px; 
            border: 1px solid rgba(0,0,0,0.2);
        }
    }

`;