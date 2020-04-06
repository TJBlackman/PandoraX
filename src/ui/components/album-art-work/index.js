import React from "react";
import styled from "styled-components";

export const AlbumArtWork = ({ img }) => {
  const image = img[0] === "/" ? `https://www.pandora.com${img}` : img;
  return <Wrapper img={image} />;
};

const Wrapper = styled.div`
  height: 100%;
  background-image: ${props => `url(${props.img})`};
  background-size: cover;
`;
