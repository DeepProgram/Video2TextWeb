"use client";
import { useState } from "react";
import ModalAddVideo from "../Modal/AddVideo/AddVideo";
import RequestVideoQueueComponent from "./RequestVideoQueue/RequestVideoQueue";
import RequestVideoCompletedComponent from "./RequestVideoCompleted/RequestVideoCompleted";
import { useRef, useEffect } from "react";

const RequestVideo = () => {
  const queueVideoChildRef = useRef(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  // 1 -> Processing
  // 2 -> Completed

  const [renderAndStartRequest, setRenderAndStartRequest] = useState({
    state: false,
    platform: "",
    url: "",
  });

  const modalShowHandler = () => {
    setShowAddModal(true);
  };

  const modalCloseHandler = () => {
    setShowAddModal(false);
  };

  const changeTabHandler = (tabNo) => {
    setSelectedTab(tabNo);
  };

  const sendQueueRequestHandler = (platform, url) => {
    queueVideoChildRef.current.sendQueueRequestToServer(platform, url);
  };

  const renderAndSendRequestHandler = (platform, url) => {
    setRenderAndStartRequest({ state: true, platform: platform, url: url });
  };

  useEffect(() => {
    if (renderAndStartRequest.state) {
      queueVideoChildRef.current.sendQueueRequestToServer(
        renderAndStartRequest.platform,
        renderAndStartRequest.url
      );
      setRenderAndStartRequest({ state: false, platform: "", url: "" });
    }
  }, [renderAndStartRequest.state]);

  return (
    <>
      {selectedTab === 1 && (
        <RequestVideoQueueComponent
          ref={queueVideoChildRef}
          changeTabHandler={changeTabHandler}
          modalShowHandler={modalShowHandler}
          selectedTab={selectedTab}
        />
      )}
      {selectedTab === 2 && (
        <RequestVideoCompletedComponent
          changeTabHandler={changeTabHandler}
          modalShowHandler={modalShowHandler}
          selectedTab={selectedTab}
        />
      )}
      {showAddModal && (
        <ModalAddVideo
          modalCloseHandler={modalCloseHandler}
          sendBtnHandler={sendQueueRequestHandler}
          renderAndStartVideoProcessingHandler={renderAndSendRequestHandler}
          changeTabHandler={changeTabHandler}
          bottomButtonText={"Request"}
          selectedTab={selectedTab}
        />
      )}
    </>
  );
};

export default RequestVideo;
