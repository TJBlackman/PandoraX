import React, { useRef, useState, useContext, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { SongContext } from "../../contexts/song-context";

import { sendMessage } from "../../utils/sendMessage";

// utility
const getPercentCompletedAtTargetPosition = (
  targetPosition,
  constraintWidth,
  negateDistanceLeft
) => {
  const percentCompleteAtClick =
    (targetPosition - negateDistanceLeft) / constraintWidth;
  return percentCompleteAtClick;
};

// component
export const ProgressBar = () => {
  const songContext = useContext(SongContext);
  const { currentTime, duration, paused } = songContext.songInfo;

  const [percentCompleted, setPercentCompleted] = useState(
    currentTime / duration
  );
  const durationRemaining = duration - duration * percentCompleted;
  const loadingRef = useRef(null);

  useEffect(() => {
    setPercentCompleted(currentTime / duration);
  }, [currentTime, duration]);

  const updateFromClick = e => {
    // negate 5px left for application border
    const percentCompletedAtClick = getPercentCompletedAtTargetPosition(
      e.clientX,
      loadingRef.current.clientWidth,
      5
    );
    sendMessage({ type: "scrub", payload: duration * percentCompletedAtClick });
    setPercentCompleted(percentCompletedAtClick);
  };

  return (
    <Wrapper
      percentCompleted={percentCompleted}
      durationRemaining={durationRemaining}
      paused={paused}
      ref={loadingRef}
      onClick={updateFromClick}
    >
      <div className="progress"></div>
    </Wrapper>
  );
};

const scale = percentCompleted => keyframes`
  from {
    transform: scaleX(${percentCompleted});
  }
  to {
    transform: scaleX(1);
  }
`;

const Wrapper = styled.div`
  padding: 5px 0 10px;
  cursor: pointer;

  .progress {
    position: relative;
    height: 3px;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    overflow: hidden;

    &:after {
      content: "";
      display: block;
      height: 3px;
      border-radius: 3px;
      cursor: pointer;
      background-color: ${props => props.theme.colors.white};
      transform-origin: left;
      ${props =>
        props.paused
          ? css`
              transform: scaleX(${props.percentCompleted});
            `
          : css`
              animation: ${scale(props.percentCompleted)}
                ${props.durationRemaining}s linear forwards;
            `}
    }
  }
`;
