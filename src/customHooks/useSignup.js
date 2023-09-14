import axios from "axios";
import useStore from "@/store/zustandStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: -1, hint: "" });
  const router = useRouter();
  const setToken = useStore((state) => state.setToken);
  const setUserLevel = useStore((state) => state.setUserLevel);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const sendRequestForSignup = (email, passWord, fullName, accountType) => {
    setError({ status: -1, hint: "" });
    setIsLoading(true);
    axios
      .post(`${API_BASE_URL}/user/signup/`, {
        email: email,
        password: passWord,
        fullname: fullName,
        account_type: accountType,
      })
      .then((response) => {
        if (response.headers && response.headers.authorization) {
          try {
            const token = response.headers.authorization.split(" ")[1];
            setToken(token);
            if (response.data.code === 1) {
              setUserLevel(response.data["user_level"]);
              router.push("/video", undefined, { shallow: true });
            }
          } catch {
            const token = "";
            setToken("");
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError({ status: 100, hint: "general_error" });
      });
  };
  return {
    isLoading,
    error,
    sendRequestForSignup,
  };
};

export default useSignup;
