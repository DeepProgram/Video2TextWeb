import HeaderNonLoggedIn from "../Header/HeaderNonLoggedIn/HeaderNonLoggedIn";
import HomeMainComponent from "./HomeMainComponent";
import FooterComponent from "../Footer/Footer";
import classes from "./Home.module.css";

const HomeComponent = () => {
  return (
    <>
      <HeaderNonLoggedIn />
      <div className={classes.wrapper}>
        <div className={classes["container-top-content"]}>
          <h1 className={classes["top-content-title"]}>
            Transforming Video Watching with Interactive{" "}
            <span>Transcripts</span>, <span>Word Search</span>,{" "}
            <span>Timestamps</span>, and <span>GIF</span> Clips!
          </h1>
          <div className={classes.player}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" />
            </svg>
          </div>
        </div>
        <div className={classes["small-text"]}>
          Unlock the Power of Words: Seamlessly Navigate, Search, and Engage
          with Videos Like Never Before
        </div>
      </div>
      <HomeMainComponent />
      <FooterComponent />
    </>
  );
};

export default HomeComponent;
