import classes from "./VideoComponent.module.css";
import axios from "axios";
import useSWR from "swr";
import useStore from "@/store/zustandStore";
import Image from "next/image";

const useFetcher = () => {
  const token = useStore((state) => state.token);
  const fetcher = () => {
    return axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/video/`, {
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

const key = "/video";

const VideoComponent = (props) => {
  const { fetcher } = useFetcher();
  const { data, error, isLoading } = useSWR(key, fetcher, {
    errorRetryCount: 0,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <div
      className={`${classes["video-container"]} ${
        props.showSideMenu && classes["video-container-side-menu-active"]
      }`}
    >
      {data &&
        data.data.map((obj) => {
          return (
            <div
              key={obj["video_id"]}
              className={classes["video-box"]}
              onClick={() => {
                props.watchVideoHandler(obj["video_id"]);
              }}
            >
              <div className={classes.thumbnail}>
                <Image
                  className={classes["thumbnail-img"]}
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${obj["thumbnail"]}`}
                  alt={obj["title"]}
                  width={500}
                  height={500}
                />
                <svg
                  className={classes["play-icon"]}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" />
                </svg>
              </div>
              <p className={classes["video-title"]}>{obj["title"]}</p>
            </div>
          );
        })}
    </div>
  );
};

export default VideoComponent;
