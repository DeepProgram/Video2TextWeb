"use client";
import classes from "./Signup.module.css";
import Image from "next/image";
import useSignup from "../../customHooks/useSignup";
import signupImage from "../../images/signup.png";
import { useState } from "react";

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState(1);
  const { isLoading, error, sendRequestForSignup } = useSignup();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passWordChangeHandler = (event) => {
    setPassWord(event.target.value);
  };

  const fullNameChangeHandler = (event) => {
    setFullName(event.target.value);
  };

  const accountTypeChangeHandler = (event) => {
    if (event.target.value === "pro") {
      setSelectedAccountType(1);
    }
    if (event.target.value === "proplus") {
      setSelectedAccountType(2);
    }
  };

  const signupBtnHandler = () => {
    if (!isLoading) {
      sendRequestForSignup(email, passWord, fullName, selectedAccountType);
    }
  };

  return (
    <div className={classes["grid-container"]}>
      <div className={classes["signup-page-visual"]}>
        {/* <div className={classes["visual-text-container"]}>
          <h2>Start your journey with us</h2>
          <p>Discover the worlds best platform to play with media content</p>
        </div> */}
        <Image
          className={classes["image"]}
          src={signupImage}
          alt="Signup Vector Image"
          width={900}
          height={150}
        />
      </div>
      <div className={classes["signup-form-content-wrapper"]}>
        <div className={classes["signup-form-content"]}>
          <div className={classes["signup-form-header"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
            </svg>
            <h2>Welcome !!</h2>
          </div>
          <form className={classes["signup-form"]}>
            <label htmlFor={"fullname"}>Full Name</label>
            <input
              onChange={fullNameChangeHandler}
              id={"fullname"}
              name={"fullname"}
              type={"text"}
              value={fullName}
            />
            <label htmlFor={"email"}>Email</label>
            <input
              onChange={emailChangeHandler}
              id={"email"}
              name={"email"}
              type={"email"}
              value={email}
            />
            <label htmlFor={"password"}>Password</label>
            <input
              onChange={passWordChangeHandler}
              id={"password"}
              name={"password"}
              type={"password"}
              value={passWord}
            />
            <label htmlFor={"account-type"}>Account Type</label>
            <div className={classes["radio-input-container"]}>
              <input
                onChange={accountTypeChangeHandler}
                id={"pro"}
                name={"pro"}
                type={"radio"}
                value={"pro"}
                checked={selectedAccountType === 1}
              />
              <label htmlFor={"pro"}>Pro</label>
              <input
                id={"proplus"}
                name={"proplus"}
                type={"radio"}
                value={"proplus"}
                onChange={accountTypeChangeHandler}
                checked={selectedAccountType === 2}
              />
              <label htmlFor={"proplus"}>Pro Plus</label>
            </div>
          </form>
          <button onClick={signupBtnHandler} className={classes["btn-signup"]}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
