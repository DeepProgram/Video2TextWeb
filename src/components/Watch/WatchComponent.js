import classes from "./WatchComponent.module.css";
import axios from "axios";
import useSWR from "swr";
import useStore from "@/store/zustandStore";
import { useEffect, useState } from "react";
import useGetVideoSegment from "@/customHooks/useGetVideoSegment";
import VideoPlayerComponent from "../VideoPlayer/VideoPlayer";
import Image from "next/image";
import LoaderWave from "../UI/Loader/LoaderWave/LoaderWave";
import LoaderDotted from "../UI/Loader/LoaderDotted/LoaderDotted";
import Link from "next/link";

const useFetcher = (videoID) => {
  const token = useStore((state) => state.token);
  const fetcher = () => {
    return axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/video/watch?v=${videoID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.code === 1) {
          return response.data;
        }
      })
      .catch((err) => {
        throw new Error("Server Offline");
      });
  };
  return {
    fetcher,
  };
};

const key = "/video/watch/";

const WatchComponent = (props) => {
  let videoID = props.href.split("/video/watch?v=")[1].trim();
  const { fetcher } = useFetcher(videoID);
  const { data, error, isLoading } = useSWR(key, fetcher, {
    errorRetryCount: 0,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const {
    isLoading: isLoadingVideoSegment,
    error: errorVideosegment,
    segmentResponseData,
    setSegmentResponseData,
    getVideoSegmentFromServer,
  } = useGetVideoSegment();

  const [componentMounted, setComponentMounted] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [textSegmentsData, setTextSegmentsData] = useState([]);

  const searchSegmentInputChangeHandler = (event) => {
    if (data && data.data.segments) {
      const tempSearchText = event.target.value.toLowerCase().trim();
      const filtertedSegements = data.data.segments.filter((obj) =>
        obj["text"].toLowerCase().trim().includes(tempSearchText)
      );
      setSearchText(event.target.value);
      setTextSegmentsData(filtertedSegements);
    }
  };

  const getVideoSegment = (clipID) => {
    setSegmentResponseData({});
    getVideoSegmentFromServer(clipID);
  };

  useEffect(() => {
    if (data && data.data.segments) {
      setTextSegmentsData(data.data.segments);
    }
  }, [data]);

  useEffect(() => {
    if (textSegmentsData.length !== 0) {
      setComponentMounted(true);
    }
  }, [textSegmentsData.length]);

  return (
    <>
      {!componentMounted && (
        <div className={classes["page-loader"]}>
          <LoaderWave />
        </div>
      )}
      {componentMounted && (
        <div className={classes["watch-wrapper"]}>
          <div
            className={`${classes["grid-container"]} ${
              props.showSideMenu && classes["grid-container-side-menu-active"]
            }`}
          >
            <div className={classes["text-container"]}>
              <div className={classes["text-search-container"]}>
                <input
                  onChange={searchSegmentInputChangeHandler}
                  className={classes["search-text"]}
                  type="text"
                  placeholder="Search Text"
                  value={searchText}
                />
                <div className={classes["search-icon-container"]}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M330.7 376L457.4 502.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L376 330.7C363.3 348 348 363.3 330.7 376z" />
                    <path d="M208 64a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm0 352A208 208 0 1 0 208 0a208 208 0 1 0 0 416z" />
                  </svg>
                </div>
              </div>
              <div className={classes["text-segments"]}>
                {data &&
                  textSegmentsData.map((obj, index) => {
                    const val = obj["text"].trim();

                    if (val !== "") {
                      const tempSearchText = searchText.trim();
                      if (tempSearchText === "") {
                        return (
                          <p
                            onClick={() => {
                              getVideoSegment(obj["clip_id"]);
                            }}
                            key={index}
                          >
                            {val}
                          </p>
                        );
                      } else {
                        const regex = new RegExp(tempSearchText, "gi");
                        const newVal = val.replace(
                          regex,
                          `<strong>$&</strong>`
                        );
                        return (
                          <p
                            key={index}
                            onClick={() => {
                              getVideoSegment(obj["clip_id"]);
                            }}
                            dangerouslySetInnerHTML={{ __html: newVal }}
                          ></p>
                        );
                      }
                    }
                  })}
              </div>
            </div>
            <div className={classes["video"]}>
              <div
                className={`${classes["video-content"]} ${
                  props.showSideMenu &&
                  classes["video-content-side-menu-active"]
                }`}
              >
                <div className={classes["video-player"]}>
                  {segmentResponseData["video_url"] && (
                    <VideoPlayerComponent
                      showSideMenu={props.showSideMenu}
                      clipURL={segmentResponseData["video_url"]}
                    />
                  )}

                  {!segmentResponseData["video_url"] && data && (
                    <div
                      className={`${classes["thumbnail-container"]} ${
                        props.showSideMenu &&
                        classes["thumbnail-container-side-menu-active"]
                      }`}
                    >
                      <Image
                        className={classes["thumbnail"]}
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${data.data.thumbnail}`}
                        width={500}
                        height={500}
                        alt={data.data.title}
                      />
                    </div>
                  )}
                  {!segmentResponseData["video_url"] &&
                    data &&
                    (!isLoadingVideoSegment ? (
                      <svg
                        className={classes["video-player-middle-icon"]}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" />
                      </svg>
                    ) : (
                      <div className={classes["segement-loader"]}>
                        <LoaderDotted isColorDark={false} />
                      </div>
                    ))}
                </div>
                <div
                  className={`${classes["download-button-container"]} ${
                    props.showSideMenu &&
                    classes["download-button-container-side-menu-active"]
                  }`}
                >
                  {data && segmentResponseData["video_url"] && (
                    <a
                      className={classes["download-urls"]}
                      download
                      href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${segmentResponseData["video_url"]}`}
                    >
                      VIDEO
                    </a>
                  )}
                  {data && !segmentResponseData["video_url"] && (
                    <button
                      className={`${classes["download-urls"]} ${classes["download-urls-not-active"]}`}
                    >
                      VIDEO
                    </button>
                  )}
                  {/* <Link href={"/"} className={classes["download-urls"]}>
                    GIF
                  </Link> */}
                  <button
                    className={`${classes["download-urls"]} ${classes["download-urls-not-active"]}`}
                  >
                    GIF
                  </button>
                </div>
              </div>
              {data && (
                <div className={classes["video-info"]}>
                  <div className={classes["item"]}>
                    <Link
                      className={classes["item-embed_url"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.youtube.com/channel/${data.data["channel_id"]}`}
                    >
                      {data.data["channel"]}
                    </Link>
                  </div>
                  <div className={classes["item"]}>
                    <Link
                      className={classes["item-embed_url"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={data.data["source_url"]}
                    >
                      {data.data["title"]}
                    </Link>
                  </div>
                  <div className={classes["item"]}>
                    {`${String(Math.floor(data.data["duration"] / 60)).padStart(
                      2,
                      "0"
                    )}:${String(data.data["duration"] % 60).padStart(2, "0")}`}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WatchComponent;
