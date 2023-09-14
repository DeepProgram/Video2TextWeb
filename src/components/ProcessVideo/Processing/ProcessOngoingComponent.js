/* eslint-disable react/display-name */
import useSWR, { mutate } from "swr";
import axios from "axios";
import useStore from "@/store/zustandStore";
import RequestAndProcessBodyUI from "@/components/UI/RequestAndProcessBody/RequestAndProcessBody";
import useProcessVideo from "@/customHooks/useProcessVideo";
import { forwardRef, useImperativeHandle } from "react";
import { useEffect } from "react";
import LoaderDotted from "@/components/UI/Loader/LoaderDotted/LoaderDotted";

const useFetcher = () => {
  const token = useStore((state) => state.token);
  const fetcher = () => {
    return axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/video/process/status/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw new Error("Server Offline");
      });
  };
  return {
    fetcher,
  };
};

const key = "/video/process/status/";

const ProcessOngoingComponent = forwardRef((props, ref) => {
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
    isLoadingProcessVideo,
    errorProcessVideo,
    sendReqForStartVideoProcess,
  } = useProcessVideo(refetchDataHandler);

  useImperativeHandle(ref, () => ({
    startProcessingHandler(platform, url) {
      sendReqForStartVideoProcess(platform, url);
    },
  }));

  useEffect(() => {
    const interval = setInterval(async () => {
      // Trigger a re-fetch
      if (data && data.code === 0 && !error) {
        await refetchData();
      }
      if (data && data.code === 1) {
        clearInterval(interval);
      }
      if (error) {
        clearInterval(interval);
      }
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearInterval(interval);
  }, [data, error]);

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            width: "100%",
          }}
        >
          <LoaderDotted isColorDark={true} />
        </div>
      )}
      {!isLoading && (
        <RequestAndProcessBodyUI
          modalShowHandler={props.modalShowHandler}
          changeTabHandler={props.changeTabHandler}
          componentOf={{ mainComponent: "process", subComponent: "ongoing" }}
          selectedTab={props.selectedTab}
          dataList={data.data}
        />
      )}
    </>
  );
});

export default ProcessOngoingComponent;
