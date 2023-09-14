import { useState } from "react";
import useStore from "@/store/zustandStore";
import axios from "axios";

const useGetVideoInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: -1, hint: "" });
  const [videoInfo, setVideoInfo] = useState({});
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = useStore((state) => state.token);

  const sendRequestForVideoInfo = (platform, url) => {
    setVideoInfo({});
    setError({
      status: -1,
      hint: "",
    });
    setIsLoading(true);
    axios
      .post(
        `${API_BASE_URL}/video/search/`,
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
          setVideoInfo(response.data.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError({
          status: 100,
          hint: "general_error",
        });
        setIsLoading(false);
      });
  };
  return {
    isLoading,
    error,
    sendRequestForVideoInfo,
    videoInfo,
  };
};

export default useGetVideoInfo;
