"use client";
import { useState } from "react";
import classes from "./GlobalMainComponent.module.css";
import SideMenuComponent from "../SideMenu/SideMenu";
import VideoHeaderComponent from "../Video/VideoHeader/VideoHeader";
import VideoComponent from "../Video/VideoComponent";
import RequestVideo from "../RequestVideo/RequestVideo";
import ProcessVideoCompoent from "../ProcessVideo/ProcessVideo";
import WatchComponent from "../Watch/WatchComponent";
import { useRouter } from "next/navigation";
import useStore from "@/store/zustandStore";

const GlobalMainComponent = (props) => {
  const router = useRouter();
  const [searchVideoText, setSearchVideoText] = useState("");
  const showSideMenu = useStore((state) => state.globalShowSideMenu);
  const setShowSideMenu = useStore((state) => state.setGlobalShowSideMenu);
  const [href, setHref] = useState(props.href);

  const toggleSideMenuHandler = () => {
    if (showSideMenu) {
      setShowSideMenu(false);
    } else {
      setShowSideMenu(true);
    }
  };

  const selectPageHandler = (href) => {
    router.push(href, undefined, { shallow: true });
  };

  const watchVideoHandler = (videoID) => {
    const href = `/video/watch?v=${videoID}`;
    router.push(href, undefined, { shallow: true });
  };

  const searchVideoTextChangeHandler = (event) => {
    setSearchVideoText(event.target.value);
  };

  return (
    <div className={classes["wrapper"]}>
      <VideoHeaderComponent
        toggleSideMenuHandler={toggleSideMenuHandler}
        showSideMenu={showSideMenu}
      />
      {showSideMenu && (
        <SideMenuComponent href={href} selectPageHandler={selectPageHandler} />
      )}

      <div
        className={`${classes["search-video"]} ${
          showSideMenu && classes["search-video-side-menu-active"]
        }`}
      >
        <input
          type="text"
          placeholder="Search Videos"
          value={searchVideoText}
          onChange={searchVideoTextChangeHandler}
        />
      </div>
      <div
        className={`${classes["content-wrapper"]} ${
          showSideMenu && classes["content-wrapper-side-menu-active"]
        }`}
      >
        <div className={classes["content-body"]}>
          {href === "/video" && (
            <VideoComponent
              showSideMenu={showSideMenu}
              watchVideoHandler={watchVideoHandler}
            />
          )}
          {href === "/request" && <RequestVideo showSideMenu={showSideMenu} />}
          {href === "/process" && (
            <ProcessVideoCompoent showSideMenu={showSideMenu} />
          )}
          {href.includes("/video/watch") && (
            <WatchComponent href={href} showSideMenu={showSideMenu} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalMainComponent;
