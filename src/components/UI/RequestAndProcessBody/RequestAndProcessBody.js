import classes from "./RequestAndProcessBody.module.css";
import RequestAndProcessHeaderUI from "../RequestAndProcessHeader/RequestAndProcessHeader";
import useStore from "@/store/zustandStore";
import Link from "next/link";

const RequestAndProcessBodyUI = (props) => {
  const showSideMenu = useStore((state) => state.globalShowSideMenu);

  return (
    <div
      className={`${classes["request-body"]} ${
        showSideMenu && classes["request-body-sidebar-active"]
      }`}
    >
      <div className={classes["options-list"]}>
        <RequestAndProcessHeaderUI
          changeTabHandler={props.changeTabHandler}
          modalShowHandler={props.modalShowHandler}
          componentOf={props.componentOf}
          selectedTab={props.selectedTab}
        />
      </div>
      {props.dataList === undefined ||
        (props.dataList.length === 0 && (
          <div className={classes["empty-list"]}>
            <div className={classes["message"]}>!! No Data Available !!</div>
          </div>
        ))}
      {props.dataList !== undefined && props.dataList.length !== 0 && (
        <div className={classes["requested-list"]}>
          {props.dataList.map((obj) => {
            return (
              <div
                key={obj["video_id"]}
                className={`${classes["requested-item"]} ${
                  props.componentOf.subComponent === "ongoing" &&
                  classes["processing-item"]
                }`}
              >
                <div className={classes["video-title"]}>
                  <p>{obj.title}</p>
                </div>
                <div className={classes["video-info"]}>
                  {props.componentOf.subComponent === "queue" && (
                    <p>{obj["queue"]}</p>
                  )}
                  {props.componentOf.subComponent === "completed" && (
                    <Link
                      className={classes["video-url"]}
                      href={`/video/watch?v=${obj["video_id"]}`}
                    >
                      <svg
                        className={classes["play-icon"]}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                      </svg>
                    </Link>
                  )}
                  {props.componentOf.subComponent === "ongoing" && (
                    <p>{obj["status"]}</p>
                  )}
                  {props.componentOf.subComponent === "ongoing" && (
                    <p>{obj.progress} %</p>
                  )}
                  {props.componentOf.subComponent !== "ongoing" && (
                    <p>
                      {`${String(Math.floor(obj.duration / 60)).padStart(
                        2,
                        "0"
                      )}
                      :${String(obj.duration % 60).padStart(2, "0")}`}
                    </p>
                  )}

                  <Link
                    className={classes["source-url"]}
                    href={obj["source_url"]}
                  >
                    {obj.platform === "youtube" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                      </svg>
                    )}
                  </Link>
                  {props.componentOf.subComponent !== "ongoing" && (
                    <p>
                      {new Date(obj.added * 1000)
                        .toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(/,/g, "")}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RequestAndProcessBodyUI;
