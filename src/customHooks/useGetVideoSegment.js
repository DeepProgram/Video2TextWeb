import axios from "axios";
import { useState } from "react";

const useGetVideoSegment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: -1, hint: "" });
  const [segmentResponseData, setSegmentResponseData] = useState({});

  const getVideoSegmentFromServer = (clipID) => {
    setIsLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/video/stream/`, {
        clip_id: clipID,
      })
      .then((response) => {
        setIsLoading(false);
        setSegmentResponseData(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  return {
    isLoading,
    error,
    segmentResponseData,
    setSegmentResponseData,
    getVideoSegmentFromServer,
  };
};

export default useGetVideoSegment;
