import { useState, useRef, useEffect } from "react";
import classes from "./VideoPlayerComponent.module.css";
import styled from "styled-components";

const DivInner = styled.div`
  background: #ccc;
  width: ${(props) => props.$percentage || 0}%;
  height: 100%;
`;

const VideoPlayerComponent = (props) => {
  const [videoPaused, setVideoPaused] = useState(true);
  const videoRef = useRef(null);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const videoPauseToggle = () => {
    if (videoPaused) {
      playVideo();
    } else {
      pauseVideo();
    }
    setVideoPaused((prevState) => !prevState);
  };

  const playVideo = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
    }
  };

  const pauseVideo = () => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  };

  const forwardVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 2;
    }
  };

  const backwardVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 2;
    }
  };

  const handleVideoEnded = () => {
    setVideoPaused(true);
    setCurrentDuration(0);
  };

  const updateVideoTime = () => {
    if (videoRef.current) {
      setTotalDuration(videoRef.current.duration);
      setCurrentDuration(videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", updateVideoTime);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", updateVideoTime);
      }
    };
  }, []);

  return (
    <div
      className={`${classes["container"]} ${
        props.showSideMenu && classes["container-side-menu-active"]
      }`}
    >
      {props.clipURL && (
        <video
          ref={videoRef}
          onEnded={handleVideoEnded}
          className={classes["video"]}
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${props.clipURL}`}
          id="video"
        ></video>
      )}

      <div className={`${classes["controls"]}`}>
        <button onClick={videoPauseToggle}>
          {videoPaused && (
            <svg
              className={classes["fa"]}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
            </svg>
          )}
          {!videoPaused && (
            <svg
              className={classes["fa"]}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
            </svg>
          )}
        </button>
        <div className={`${classes["middle-control"]}`}>
          <button onClick={backwardVideo}>
            <svg
              className={classes["fa"]}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M493.6 445c-11.2 5.3-24.5 3.6-34.1-4.4L288 297.7V416c0 12.4-7.2 23.7-18.4 29s-24.5 3.6-34.1-4.4L64 297.7V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V96C0 78.3 14.3 64 32 64s32 14.3 32 32V214.3L235.5 71.4c9.5-7.9 22.8-9.7 34.1-4.4S288 83.6 288 96V214.3L459.5 71.4c9.5-7.9 22.8-9.7 34.1-4.4S512 83.6 512 96V416c0 12.4-7.2 23.7-18.4 29z" />
            </svg>
          </button>
          <div
            className={`${classes["timeline"]} ${
              props.showSideMenu && classes["timeline-side-menu-active"]
            }`}
          >
            <div className={classes["bar"]}>
              <DivInner $percentage={(currentDuration / totalDuration) * 100} />
            </div>
          </div>
          <button onClick={forwardVideo}>
            <svg
              className={classes["fa"]}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M18.4 445c11.2 5.3 24.5 3.6 34.1-4.4L224 297.7V416c0 12.4 7.2 23.7 18.4 29s24.5 3.6 34.1-4.4L448 297.7V416c0 17.7 14.3 32 32 32s32-14.3 32-32V96c0-17.7-14.3-32-32-32s-32 14.3-32 32V214.3L276.5 71.4c-9.5-7.9-22.8-9.7-34.1-4.4S224 83.6 224 96V214.3L52.5 71.4c-9.5-7.9-22.8-9.7-34.1-4.4S0 83.6 0 96V416c0 12.4 7.2 23.7 18.4 29z" />
            </svg>
          </button>
        </div>

        <button onClick={toggleFullscreen}>
          <svg
            className={classes["fa"]}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VideoPlayerComponent;
