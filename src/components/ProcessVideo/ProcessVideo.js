"use client";
import ModalAddVideo from "../Modal/AddVideo/AddVideo";
import { useEffect, useState } from "react";
import ProcessCompletedComponent from "./Completed/ProcessCompletedComponent";
import ProcessOngoingComponent from "./Processing/ProcessOngoingComponent";
import { useRef } from "react";

const ProcessVideoCompoent = () => {
  const processVideoChildRef = useRef(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  // 1 -> Processing
  // 2 -> Completed

  const [renderAndStartProcess, setRenderAndStartProcess] = useState({
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

  const startProcessingHandler = (platform, url) => {
    processVideoChildRef.current.startProcessingHandler(platform, url);
  };

  const renderAndStartVideoProcessingHandler = (platform, url) => {
    setRenderAndStartProcess({ state: true, platform: platform, url: url });
  };

  useEffect(() => {
    if (renderAndStartProcess.state) {
      processVideoChildRef.current.startProcessingHandler(
        renderAndStartProcess.platform,
        renderAndStartProcess.url
      );
      setRenderAndStartProcess({ state: false, platform: "", url: "" });
    }
  }, [renderAndStartProcess.state]);

  return (
    <>
      {selectedTab === 1 && (
        <ProcessOngoingComponent
          ref={processVideoChildRef}
          changeTabHandler={changeTabHandler}
          modalShowHandler={modalShowHandler}
          selectedTab={selectedTab}
        />
      )}
      {selectedTab === 2 && (
        <ProcessCompletedComponent
          changeTabHandler={changeTabHandler}
          modalShowHandler={modalShowHandler}
          selectedTab={selectedTab}
        />
      )}
      {showAddModal && (
        <ModalAddVideo
          modalCloseHandler={modalCloseHandler}
          sendBtnHandler={startProcessingHandler}
          renderAndStartVideoProcessingHandler={
            renderAndStartVideoProcessingHandler
          }
          changeTabHandler={changeTabHandler}
          bottomButtonText={"Process"}
          selectedTab={selectedTab}
        />
      )}
    </>
  );
};

export default ProcessVideoCompoent;
