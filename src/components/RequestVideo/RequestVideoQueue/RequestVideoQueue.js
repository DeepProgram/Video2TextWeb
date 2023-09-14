/* eslint-disable react/display-name */
import { forwardRef, useImperativeHandle } from "react";
import useRequestVideo from "@/customHooks/useRequestVideo";
import RequestAndProcessBodyUI from "@/components/UI/RequestAndProcessBody/RequestAndProcessBody";
import axios from "axios";
import useSWR, { mutate } from "swr";
import useStore from "@/store/zustandStore";
import LoaderDotted from "@/components/UI/Loader/LoaderDotted/LoaderDotted";

const useFetcher = () => {
  const token = useStore((state) => state.token);
  const fetcher = () => {
    return axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/video/request/data/`, {
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

const key = "/video/request/data/";
const RequestVideoQueueComponent = forwardRef((props, ref) => {
  const { fetcher } = useFetcher();
  const { data, error, isLoading } = useSWR(key, fetcher, {
    errorRetryCount: 0,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const refetchData = async () => {
    await mutate(key);
  };
  const refetchDataHandler = () => {
    refetchData();
  };

  const {
    isLoading: isLoadingVideoRequest,
    eror: errorVideoRequest,
    sendRequestForVideoRequest,
  } = useRequestVideo(refetchDataHandler);

  useImperativeHandle(ref, () => ({
    sendQueueRequestToServer(platform, url) {
      sendRequestForVideoRequest(platform, url);
    },
  }));
  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoaderDotted isColorDark={true} />
        </div>
      )}
      {!isLoading && (
        <RequestAndProcessBodyUI
          modalShowHandler={props.modalShowHandler}
          changeTabHandler={props.changeTabHandler}
          componentOf={{ mainComponent: "request", subComponent: "queue" }}
          selectedTab={props.selectedTab}
          dataList={data ? data.data : []}
        />
      )}
    </>
  );
});

export default RequestVideoQueueComponent;
