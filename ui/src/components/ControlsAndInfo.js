import React, { Component } from 'react'; 
import styled from 'styled-components'; 

import ProgressBar from "./playercontrols/ProgressBar";
import SongInfo from './SongInfo';
import PlayerControls from "./playercontrols/PlayerControls";

class ControlsAndInfo extends Component {

    render(){
        return (
            <Wrapper>
                <ProgressBar song={this.props.song} />
                <SongInfo song={this.props.song} />
                <PlayerControls song={this.props.song} reset={this.props.reset} />
            </Wrapper>
        ); 
    }
}

export default ControlsAndInfo;

const Wrapper = styled.div`
    background-image: linear-gradient(180deg,#00a0ee,#3668ff 50%);
    background-color: #3668ff;
    padding-bottom: 5px; 
`;