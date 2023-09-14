import classes from "./SideMenu.module.css";
import useStore from "@/store/zustandStore";

const SideMenuComponent = (props) => {
  const userLevel = useStore((state) => state.userLevel);

  return (
    <div className={classes["menu-content"]}>
      <div className={classes["menu-option"]}>
        <div
          className={`${classes["menu-item"]}
            } ${props.href === "/video" && classes["menu-item-active"]}`}
          onClick={(e) => {
            e.preventDefault();
            props.selectPageHandler("/video");
          }}
        >
          <svg
            className={`${classes["menu-item-icon"]} ${
              props.href === "/video" && classes["menu-item-active-icon"]
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M48 416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V208H48V416zM336 160h64l64-64c0-8.8-7.2-16-16-16H416l-80 80zm-96 0l80-80H256l-80 80h64zM80 160l80-80H96L48 128v32H80zM512 96v64 24 24V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V208 184 160 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64zM216.5 241.9c5.2-2.8 11.5-2.5 16.4 .8l96 64c4.4 3 7.1 8 7.1 13.3s-2.7 10.3-7.1 13.3l-96 64c-4.9 3.3-11.2 3.6-16.4 .8s-8.5-8.2-8.5-14.1V256c0-5.9 3.2-11.3 8.5-14.1z" />
          </svg>
          <p className={classes["menu-item-text"]}>Videos</p>
        </div>
        <div
          className={`${classes["menu-item"]} ${
            props.href === "/cc" && classes["menu-item-active"]
          }`}
          onClick={(e) => {
            e.preventDefault();
            props.selectPageHandler("/cc");
          }}
        >
          <svg
            className={`${classes["menu-item-icon"]} ${
              props.href === "/cc" && classes["menu-item-active-icon"]
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M512 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H512zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM208 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H176zM376 144c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376z" />
          </svg>
          <p className={classes["menu-item-text"]}>Content Creator</p>
        </div>
        {userLevel >= 1 && (
          <div
            className={`${classes["menu-item"]} ${
              props.href === "/setting" && classes["menu-item-active"]
            }`}
            onClick={(e) => {
              e.preventDefault();
              props.selectPageHandler("/setting");
            }}
          >
            <svg
              className={`${classes["menu-item-icon"]} ${
                props.href === "/setting" && classes["menu-item-active-icon"]
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 0c17 0 33.6 1.7 49.8 4.8c7.9 1.5 21.8 6.1 29.4 20.1c2 3.7 3.6 7.6 4.6 11.8l9.3 38.5C350.5 81 360.3 86.7 366 85l38-11.2c4-1.2 8.1-1.8 12.2-1.9c16.1-.5 27 9.4 32.3 15.4c22.1 25.1 39.1 54.6 49.9 86.3c2.6 7.6 5.6 21.8-2.7 35.4c-2.2 3.6-4.9 7-8 10L459 246.3c-4.2 4-4.2 15.5 0 19.5l28.7 27.3c3.1 3 5.8 6.4 8 10c8.2 13.6 5.2 27.8 2.7 35.4c-10.8 31.7-27.8 61.1-49.9 86.3c-5.3 6-16.3 15.9-32.3 15.4c-4.1-.1-8.2-.8-12.2-1.9L366 427c-5.7-1.7-15.5 4-16.9 9.8l-9.3 38.5c-1 4.2-2.6 8.2-4.6 11.8c-7.7 14-21.6 18.5-29.4 20.1C289.6 510.3 273 512 256 512s-33.6-1.7-49.8-4.8c-7.9-1.5-21.8-6.1-29.4-20.1c-2-3.7-3.6-7.6-4.6-11.8l-9.3-38.5c-1.4-5.8-11.2-11.5-16.9-9.8l-38 11.2c-4 1.2-8.1 1.8-12.2 1.9c-16.1 .5-27-9.4-32.3-15.4c-22-25.1-39.1-54.6-49.9-86.3c-2.6-7.6-5.6-21.8 2.7-35.4c2.2-3.6 4.9-7 8-10L53 265.7c4.2-4 4.2-15.5 0-19.5L24.2 218.9c-3.1-3-5.8-6.4-8-10C8 195.3 11 181.1 13.6 173.6c10.8-31.7 27.8-61.1 49.9-86.3c5.3-6 16.3-15.9 32.3-15.4c4.1 .1 8.2 .8 12.2 1.9L146 85c5.7 1.7 15.5-4 16.9-9.8l9.3-38.5c1-4.2 2.6-8.2 4.6-11.8c7.7-14 21.6-18.5 29.4-20.1C222.4 1.7 239 0 256 0zM218.1 51.4l-8.5 35.1c-7.8 32.3-45.3 53.9-77.2 44.6L97.9 120.9c-16.5 19.3-29.5 41.7-38 65.7l26.2 24.9c24 22.8 24 66.2 0 89L59.9 325.4c8.5 24 21.5 46.4 38 65.7l34.6-10.2c31.8-9.4 69.4 12.3 77.2 44.6l8.5 35.1c24.6 4.5 51.3 4.5 75.9 0l8.5-35.1c7.8-32.3 45.3-53.9 77.2-44.6l34.6 10.2c16.5-19.3 29.5-41.7 38-65.7l-26.2-24.9c-24-22.8-24-66.2 0-89l26.2-24.9c-8.5-24-21.5-46.4-38-65.7l-34.6 10.2c-31.8 9.4-69.4-12.3-77.2-44.6l-8.5-35.1c-24.6-4.5-51.3-4.5-75.9 0zM208 256a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm48 96a96 96 0 1 1 0-192 96 96 0 1 1 0 192z" />
            </svg>
            <p className={classes["menu-item-text"]}>Settings</p>
          </div>
        )}
        {userLevel >= 1 && (
          <div
            className={`${classes["menu-item"]} ${
              props.href === "/request" && classes["menu-item-active"]
            }`}
            onClick={(e) => {
              e.preventDefault();
              props.selectPageHandler("/request");
            }}
          >
            <svg
              className={`${classes["menu-item-icon"]} ${
                props.href === "/request" && classes["menu-item-active-icon"]
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M320 112c8.8 0 16 7.2 16 16V384c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V128c0-8.8 7.2-16 16-16H320zM64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V351 161 128c0-35.3-28.7-64-64-64H64zm464 84.6V363.4L416 313v52.6l104.3 46.9c5.1 2.3 10.6 3.5 16.2 3.5c21.8 0 39.5-17.7 39.5-39.5v-241c0-21.8-17.7-39.5-39.5-39.5c-5.6 0-11.1 1.2-16.2 3.5L416 146.4V199l112-50.4zM216 184c0-13.3-10.7-24-24-24s-24 10.7-24 24v48H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h48v48c0 13.3 10.7 24 24 24s24-10.7 24-24V280h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V184z" />
            </svg>
            <p className={classes["menu-item-text"]}>Request Video</p>
          </div>
        )}
        {userLevel === 2 && (
          <div
            className={`${classes["menu-item"]} ${
              props.href === "/process" && classes["menu-item-active"]
            }`}
            onClick={(e) => {
              e.preventDefault();
              props.selectPageHandler("/process");
            }}
          >
            <svg
              className={`${classes["menu-item-icon"]} ${
                props.href === "/process" && classes["menu-item-active-icon"]
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z" />
            </svg>
            <p className={classes["menu-item-text"]}>Process Video</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideMenuComponent;
