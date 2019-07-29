import React, { Component } from 'react'; 
import styled from 'styled-components';

export default class ProgressBar extends Component {

    state = {
        percentThroughSong: 0
    }; 

    interval; 

    componentDidMount () {
        this.startSlider();
    };

    componentWillUnmount(){
        clearInterval(this.interval);
    }; 

    componentDidUpdate(prevProps){
        if (this.props.song === prevProps.song){
            return; 
        }
        clearInterval(this.interval);
        this.resetSlider();
        this.startSlider();
    }

    startSlider = () => {
        const { song } = this.props; 
        if (song.paused){
            return; 
        }

        const animationInterval = 100;
        const incrementSlider = animationInterval / (song.duration * 1000); 

        this.interval = setInterval(() => {
            this.setState({ percentThroughSong: this.state.percentThroughSong + incrementSlider }); 
        }, animationInterval);
    }; 

    pauseSlider = () => clearInterval(this.interval);
    resetSlider = () => {
        try {
            const { song } = this.props; 
            this.setState({ percentThroughSong: song.currentTime / song.duration });
        }
        catch(err){
            console.log(err);
            this.setState({ percentThroughSong: 0 });
        }
    }


    render() {
        const { percentThroughSong } = this.state; 
        return (
            <Wrapper percentThroughSong={percentThroughSong}></Wrapper>
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
        transform: ${props => `scaleX(${props.percentThroughSong || 1})`}; 
        transform-origin: left;
    }
`;