import React, { Component } from 'react'; 
import styled, { keyframes } from 'styled-components'; 

const AlbumSvgSpinner = () => (
    <div className="svg-spinner">
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="Icon icon-album-loading-spinner" role="img"><title>ic_art_empty</title><path d="M11.983 5.291l-.257.175c.506.741.78 1.616.78 2.534 0 .917-.274 1.792-.78 2.534l.257.174A4.781 4.781 0 0 0 12.815 8c0-.98-.29-1.917-.832-2.709M13.268 4.418l-.257.175A6.014 6.014 0 0 1 14.058 8a6.015 6.015 0 0 1-1.047 3.408l.257.175A6.324 6.324 0 0 0 14.37 8a6.323 6.323 0 0 0-1.1-3.582M8 8.466a.466.466 0 1 1 0-.933.466.466 0 0 1 0 .933m0-3.573a3.107 3.107 0 1 0 0 6.214 3.107 3.107 0 0 0 0-6.214M4.017 10.709l.257-.175A4.474 4.474 0 0 1 3.494 8c0-.917.274-1.792.78-2.534l-.257-.174A4.781 4.781 0 0 0 3.185 8c0 .98.29 1.917.832 2.709M2.732 11.582l.257-.175a6.014 6.014 0 0 1-1.047-3.406c0-1.234.366-2.411 1.047-3.408l-.257-.175A6.324 6.324 0 0 0 1.63 8c0 1.296.385 2.534 1.1 3.582"></path><path d="M8 15.534A7.534 7.534 0 1 1 8 .466a7.534 7.534 0 0 1 0 15.068M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0"></path></svg>
    </div>
); 

class AlbumImage extends Component {

    render(){
        const src = this.props.imgSrc;
        return (
            <Wrapper imgSrc={src}>
                {
                    src 
                        ? <div className="album-art"></div>
                        : <AlbumSvgSpinner />
                }
            </Wrapper>
        );
    }
}

export default AlbumImage;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
    position: relative; 
    height: 300px; 
    width: 300px;
    background-image: linear-gradient(180deg, #00a0ee, #3668ff 80%);
    background-color: rgb(54, 104, 255);

    .album-art {
        height: 100%; 
        background-image: ${props => `url(${props.imgSrc || ''})`}; 
        background-size: cover; 
    }
    .svg-spinner {
        height: 100%; 
        padding: 0 20%;

        svg {
            height: 100%; 
            width: 100%;
            fill: white;
            animation: ${rotate} 1s cubic-bezier(0.37, 0.7, 0.75, 0.42) infinite;
        }
    }
`