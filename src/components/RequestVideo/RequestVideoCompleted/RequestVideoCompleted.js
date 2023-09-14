import useStore from "@/store/zustandStore";
import RequestAndProcessBodyUI from "@/components/UI/RequestAndProcessBody/RequestAndProcessBody";
import useSWR from "swr";
import axios from "axios";
import LoaderDotted from "@/components/UI/Loader/LoaderDotted/LoaderDotted";

const useFetcher = () => {
  const token = useStore((state) => state.token);
  const fetcher = () => {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/video/request/data/completed/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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

const key = "/video/request/data/completed";
const RequestVideoCompletedComponent = (props) => {
  const { fetcher } = useFetcher();
  const { data, error, isLoading } = useSWR(key, fetcher, {
    errorRetryCount: 0,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

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
          componentOf={{ mainComponent: "request", subComponent: "completed" }}
          selectedTab={props.selectedTab}
          dataList={data ? data.data : []}
        />
      )}
    </>
  );
};

export default RequestVideoCompletedComponent;
