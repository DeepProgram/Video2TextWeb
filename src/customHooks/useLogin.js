const { useState } = require("react");
import useStore from "@/store/zustandStore";
import axios from "axios";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: -1, hint: "" });
  const [responseState, setResponseState] = useState(0);
  // 1 -> Login Success
  // 2 -> Login Failed

  const setToken = useStore((state) => state.setToken);
  const setUserLevel = useStore((state) => state.setUserLevel);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const sendRequestForLogin = (email, passWord) => {
    setIsLoading(true);
    setError({ status: -1, hint: "" });
    axios
      .post(`${API_BASE_URL}/user/login/`, {
        email: email,
        password: passWord,
      })
      .then((response) => {
        if (response.data.code != 1) {
          setResponseState(2);
        }
        if (response.headers && response.headers.authorization) {
          try {
            const token = response.headers.authorization.split(" ")[1];
            setToken(token);
            if (response.data.code === 1) {
              setUserLevel(response.data["user_level"]);
              setResponseState(1);
            }
          } catch {
            const token = "";
            setToken("");
          }
        }
        setIsLoading(false);
      })
      .catch((errResponse) => {
        setIsLoading(false);
        setError({ status: 100, hint: "general_error" });
      });
  };
  return {
    isLoading,
    error,
    responseState,
    setResponseState,
    sendRequestForLogin,
  };
};

export default useLogin;
