import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

export const ScrollableText = ({ text }) => {
  const [scrollDistance, setScrollDistance] = useState(0);
  const wrapperRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const containerWidth = wrapperRef.current.offsetWidth;
    const textWidth = spanRef.current.offsetWidth;
    if (textWidth - 100 > containerWidth) {
      setScrollDistance(textWidth);
    } else {
      setScrollDistance(0);
    }
  }, [text]);

  return (
    <Wrapper ref={wrapperRef} className={scrollDistance ? 'scroll' : ''} scrollDistance={scrollDistance}>
      <i ref={spanRef}>{text}</i>
      {scrollDistance > 0 ? <i>{text}</i> : null}
    </Wrapper>
  );
};

const scroll = (scrollDistance) => keyframes`
  0% {
    transform: translateX(0);
  }
  33% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(${scrollDistance}px);
  }
`;

const Wrapper = styled.p`
  flex: 1 1 auto;
  color: ${(props) => props.theme.colors.white};
  letter-spacing: 0.5px;
  font-weight: 100;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;

  i {
    display: inline-block;
    padding-right: 100px;
    width: fit-content;
  }
  &.scroll i {
    animation: ${(props) => scroll(-props.scrollDistance)} 15s ease-in-out 0s infinite forwards;
  }
`;
