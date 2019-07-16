import React from 'react'; 
import styled from 'styled-components';

function SongInfo(props) {
    const { album, song, artist } = props.song;
    return (
        <Wrapper>
            <p><label>Song: </label>{song || 'Loading song...'}</p>
            <p><label>Artist: </label>{artist || 'Loading artist...'}</p>
            <p><label>Album: </label>{album || 'Loading album...'}</p>
        </Wrapper>
    )
}

export default SongInfo; 

const Wrapper = styled.div`
    margin: 10px 0px 5px 5px;

    p {
        color: white;
        margin: 0 0 6px 0;
        font-family: sans-serif;
        font-size: 14px; 

        &:nth-last-child(1){
            margin: 0px; 
        }

        label {
            font-weight: bold; 
        }
    }
`; 
