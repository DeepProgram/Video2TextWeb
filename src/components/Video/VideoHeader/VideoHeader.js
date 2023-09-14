import classes from "./VideoHeader.module.css";

const VideoHeaderComponent = (props) => {
  return (
    <div className={classes["video-header-container"]}>
      <div className={classes["logo-container"]}>
        <div className={classes["logo"]}>
          <svg
            className={`${classes["menu-icon"]} ${
              props.showSideMenu && classes["menu-icon-sidemenu-active"]
            }`}
            onClick={props.toggleSideMenuHandler}
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
          <h3
            className={`${classes["logo-text"]} ${
              props.showSideMenu && classes["logo-text-sidemenu-active"]
            }`}
          >
            Reuv Play
          </h3>
        </div>
      </div>
    </div>
  );
};

export default VideoHeaderComponent;
