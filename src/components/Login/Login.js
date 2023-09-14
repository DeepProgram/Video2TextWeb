"use client";
import classes from "./Login.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import loginImage from "../../images/login.png";
import useLogin from "../../customHooks/useLogin";
import { useRouter } from "next/navigation";

const LoginComponent = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");

  const {
    isLoading,
    error,
    responseState,
    setResponseState,
    sendRequestForLogin,
  } = useLogin();

  const loginBtnHandler = () => {
    if (!isLoading) {
      sendRequestForLogin(email, passWord);
    }
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passWordChangeHandler = (event) => {
    setPassWord(event.target.value);
  };

  useEffect(() => {
    if (responseState !== 0) {
      if (responseState === 1) {
        setTimeout(() => {
          router.push("/video", undefined, { shallow: true });
        }, 1000);
      } else {
        setTimeout(() => {
          setResponseState(0);
        }, 2000);
      }
    }
  }, [responseState]);

  return (
    <div className={classes["login-page-wrapper"]}>
      <div className={classes["login-grid"]}>
        <div className={classes["login-page-visual"]}>
          {/* <div className={classes["login-page-visual-header"]}>
          <h2>Ready to explore !!</h2>
          <p>Lets begin the joruney to the realm of entertainment</p>
        </div> */}
          {responseState !== 0 && (
            <div
              className={`${classes["notification"]} ${
                responseState === 1
                  ? classes["login-success"]
                  : classes["login-fail"]
              }`}
            >
              {responseState === 1 ? "Loggin In" : "Login Failed"}
            </div>
          )}

          <Image
            className={classes["login-image"]}
            src={loginImage}
            width={400}
            height={200}
            alt="Login Vector Image"
          />
        </div>
        <div className={classes["login-container-wrapper"]}>
          <div className={classes["login-container"]}>
            <div className={classes["login-header"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="512"
                height="512"
                viewBox="0 0 512 512"
                id="login"
              >
                <path d="M255.988 32C160.473 32 78.934 91.804 46.727 176h34.639c9.396-20.484 22.457-39.35 38.868-55.762C156.497 83.973 204.709 64 255.988 64c51.286 0 99.504 19.973 135.771 56.239C428.027 156.505 448 204.719 448 256c0 51.285-19.973 99.501-56.239 135.765C355.494 428.029 307.275 448 255.988 448c-51.281 0-99.493-19.971-135.755-56.234-16.412-16.412-29.473-35.28-38.871-55.766H46.725c32.206 84.201 113.746 144 209.264 144C379.703 480 480 379.715 480 256c0-123.702-100.297-224-224.012-224z"></path>
                <path d="M206.863 323.883l22.627 22.627L320 256l-90.51-90.51-22.628 22.628L258.745 240H32v32h226.745z"></path>
              </svg>
              <h2>Hello Again !</h2>
            </div>
            <form className={classes["login-form"]}>
              <label name={"email"}>Email</label>
              <input
                onChange={emailChangeHandler}
                name={"email"}
                type={"email"}
              />
              <label name={"password"}>Password</label>
              <input
                onChange={passWordChangeHandler}
                name={"password"}
                type={"password"}
              />
            </form>
            <button
              onClick={loginBtnHandler}
              className={`${classes["btn-login"]}`}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
