import { useState } from "react";
import useStore from "@/store/zustandStore";
import axios from "axios";

const useRequestVideo = (refetchAllVideoInfoFunction) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: -1, hint: "" });
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = useStore((state) => state.token);

  const sendRequestForVideoRequest = (platform, url) => {
    axios
      .post(
        `${API_BASE_URL}/video/request/`,
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
        if (response.data.code === 1) {
          setIsLoading(false);
          refetchAllVideoInfoFunction();
        } else {
          setError({ status: 100, hint: "general_error" });
        }
      })
      .catch((err) => {
        setError({ status: 100, hint: "general_error" });
      });
  };
  return {
    isLoading,
    error,
    sendRequestForVideoRequest,
  };
};

export default useRequestVideo;
