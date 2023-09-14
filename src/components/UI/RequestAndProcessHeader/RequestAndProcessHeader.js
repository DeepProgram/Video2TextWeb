import classes from "./RequestAndProcessHeader.module.css";

const RequestAndProcessHeaderUI = (props) => {
  return (
    <>
      <div className={classes["option-left-items"]}>
        <button
          onClick={() => {
            props.changeTabHandler(1);
          }}
          className={`${classes["btn"]} ${
            props.selectedTab === 1
              ? classes["btn-active"]
              : classes["btn-not-active"]
          }`}
        >
          {props.componentOf.mainComponent === "process" ? "Process" : "Queue"}
        </button>
        <button
          onClick={() => {
            props.changeTabHandler(2);
          }}
          className={`${classes["btn"]} ${
            props.selectedTab === 2
              ? classes["btn-active"]
              : classes["btn-not-active"]
          }`}
        >
          Completed
        </button>
      </div>
      <button
        onClick={props.modalShowHandler}
        className={`${classes["btn"]} ${classes["add-video"]}`}
      >
        <p>Add</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M320 112c8.8 0 16 7.2 16 16V384c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V128c0-8.8 7.2-16 16-16H320zM64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V351 161 128c0-35.3-28.7-64-64-64H64zm464 84.6V363.4L416 313v52.6l104.3 46.9c5.1 2.3 10.6 3.5 16.2 3.5c21.8 0 39.5-17.7 39.5-39.5v-241c0-21.8-17.7-39.5-39.5-39.5c-5.6 0-11.1 1.2-16.2 3.5L416 146.4V199l112-50.4zM216 184c0-13.3-10.7-24-24-24s-24 10.7-24 24v48H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h48v48c0 13.3 10.7 24 24 24s24-10.7 24-24V280h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V184z" />
        </svg>
      </button>
    </>
  );
};

export default RequestAndProcessHeaderUI;
