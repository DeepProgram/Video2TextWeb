import useSWR from "swr";
import axios from "axios";
import useStore from "@/store/zustandStore";
import RequestAndProcessBodyUI from "@/components/UI/RequestAndProcessBody/RequestAndProcessBody";
import LoaderDotted from "@/components/UI/Loader/LoaderDotted/LoaderDotted";

const useFetcher = () => {
  const token = useStore((state) => state.token);
  const fetcher = () => {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/video/process/status/completed/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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

const key = "/video/process/status/completed";
const ProcessCompletedComponent = (props) => {
  const { fetcher } = useFetcher();
  const { data, error, isLoading } = useSWR(key, fetcher, {
    errorRetryCount: 0,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  //   const refetchData = async () => {
  //     await mutate(key);
  //   };

  //   const refetchDataHandler = () => {
  //     refetchData();
  //   };

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
          componentOf={{ mainComponent: "process", subComponent: "completed" }}
          selectedTab={props.selectedTab}
          dataList={data.code === 1 ? data.data : []}
        />
      )}
    </>
  );
};

export default ProcessCompletedComponent;
