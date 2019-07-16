import React, { Component } from 'react'; 
import styled from 'styled-components';

export default class ProgressBar extends Component {

    state = {
        currentTime: 0
    }; 

    interval; 

    componentDidMount () {
        this.startSlider();
    };

    componentWillUnmount(){
        clearInterval(this.interval);
    }; 

    componentDidUpdate(prevProps){
        if (this.props.song.song === prevProps.song.song){ return; }
        clearInterval(this.interval);
        this.startSlider();
    }

    startSlider = () => {
        const { song } = this.props; 
        const currentTime = song.currentTime / song.duration;        

        if (isNaN(currentTime)){
            return this.setState({ currentTime: 0 })
        }

        this.setState({ currentTime });

        const step = 100;
        const incrementSlider = step / (song.duration * 1000); 

        this.interval = setInterval(() => {
            this.setState({ currentTime: this.state.currentTime + incrementSlider }); 
        }, step);
    }


    render() {
        const { currentTime } = this.state; 
        return (
            <Wrapper currentTime={currentTime}></Wrapper>
        )
    }
}

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
        transform: ${props => `scaleX(${props.currentTime || 0.5})`}; 
        transform-origin: left;
    }
`;