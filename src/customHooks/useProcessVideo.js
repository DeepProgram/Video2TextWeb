import { useState } from "react";
import useStore from "@/store/zustandStore";
import axios from "axios";

const useProcessVideo = (refetchAllVideoInfoFunction) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: -1, hint: "" });
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = useStore((state) => state.token);

  const sendReqForStartVideoProcess = (platform, url) => {
    setError({
      status: -1,
      hint: "",
    });
    setIsLoading(true);
    axios
      .post(
        `${API_BASE_URL}/video/process/`,
        {
          platform: platform,
          video_url: url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        refetchAllVideoInfoFunction();
      })
      .catch((err) => {});
  };
  return {
    isLoading,
    error,
    sendReqForStartVideoProcess,
  };
};

export default useProcessVideo;
