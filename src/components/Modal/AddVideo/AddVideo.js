import { useState } from "react";
import classes from "./AddVideo.module.css";
import { createPortal } from "react-dom";
import useGetVideoInfo from "@/customHooks/useGetVideoInfo";
import Image from "next/image";
import useStore from "@/store/zustandStore";

const BackDropComponent = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.modalCloseHandler}></div>
  );
};

const ModalComponent = (props) => {
  const [selectedPlatform, setSelectedPlatform] = useState(0);
  // 0 -> Nothing Selected
  // 1 -> Youtube Selected
  // 2 -> Twitch Selected
  const [url, setUrl] = useState("");

  const showSideMenu = useStore((state) => state.globalShowSideMenu);

  const { isLoading, error, sendRequestForVideoInfo, videoInfo } =
    useGetVideoInfo();

  const fetchVideoInfoHandler = () => {
    sendRequestForVideoInfo(selectedPlatform === 1 ? "youtube" : "twitch", url);
  };

  const urlChangeHandler = (evenet) => {
    setUrl(evenet.target.value);
  };

  const changeSelectedPlatform = (platfromNo) => {
    setSelectedPlatform(platfromNo);
  };

  const sendBtnHandler = () => {
    if (props.selectedTab === 2) {
      props.changeTabHandler(1);
      props.renderAndStartVideoProcessingHandler(
        selectedPlatform === 1 ? "youtube" : "twitch",
        url
      );
    } else {
      props.sendBtnHandler(selectedPlatform === 1 ? "youtube" : "twitch", url);
    }
    props.modalCloseHandler();
  };

  return (
    <div
      className={`${classes["modalContainer"]} ${
        showSideMenu && classes["modalContainer-side-menu-active"]
      }`}
    >
      <div
        onClick={props.modalCloseHandler}
        className={classes["modal-close-icon-container"]}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm97.9-320l-17 17-47 47 47 47 17 17L320 353.9l-17-17-47-47-47 47-17 17L158.1 320l17-17 47-47-47-47-17-17L192 158.1l17 17 47 47 47-47 17-17L353.9 192z" />
        </svg>
      </div>
      <div className={classes["modal-content"]}>
        <div className={classes["input-container"]}>
          <input
            onChange={urlChangeHandler}
            type="text"
            spellCheck={false}
            placeholder="Insert Video URL"
            value={url}
          />
        </div>
        <div className={classes["pre-insert-options"]}>
          <svg
            onClick={() => {
              changeSelectedPlatform(1);
            }}
            className={`${classes["icon-youtube"]} ${
              selectedPlatform === 1 && classes["icon-youtube-selected"]
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
          </svg>
          <svg
            onClick={() => {
              changeSelectedPlatform(2);
            }}
            className={`${classes["icon-twitch"]} ${
              selectedPlatform === 2 && classes["icon-twitch-selected"]
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z" />
          </svg>
        </div>
        <button
          onClick={fetchVideoInfoHandler}
          className={classes["fetch-info"]}
        >
          Fetch Info
        </button>
        {Object.keys(videoInfo).length !== 0 && (
          <div className={classes["video-info"]}>
            <div className={classes["thumbnail-and-creator"]}>
              <div className={classes["thumbnail"]}>
                <Image
                  className={classes["thumnail-image"]}
                  src={videoInfo["thumbnail"]}
                  width={600}
                  height={600}
                  alt={"Thumbnail"}
                />
              </div>
              <p className={classes["creator-name"]}>
                {videoInfo["creator_name"]}
              </p>
            </div>
            <p className={classes["video-title"]}>{videoInfo["title"]}</p>
          </div>
        )}
        {Object.keys(videoInfo).length !== 0 && (
          <button onClick={sendBtnHandler} className={classes["fetch-info"]}>
            {props.bottomButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

const ModalAddVideo = (props) => {
  return (
    <>
      {createPortal(
        <BackDropComponent modalCloseHandler={props.modalCloseHandler} />,
        document.getElementById("backdrop-root")
      )}
      {createPortal(
        <ModalComponent
          modalCloseHandler={props.modalCloseHandler}
          sendBtnHandler={props.sendBtnHandler}
          renderAndStartVideoProcessingHandler={
            props.renderAndStartVideoProcessingHandler
          }
          changeTabHandler={props.changeTabHandler}
          selectedTab={props.selectedTab}
          bottomButtonText={props.bottomButtonText}
        />,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default ModalAddVideo;
