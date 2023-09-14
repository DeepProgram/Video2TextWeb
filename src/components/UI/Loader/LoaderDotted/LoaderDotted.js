import classes from "./LoaderDotted.module.css";

const LoaderDotted = (props) => {
  return (
    <div className={`${classes["lds-default"]}`}>
      <div
        className={`${
          props.isColorDark ? classes["dark-color"] : classes["light-color"]
        }`}
      ></div>
      <div
        className={`${
          props.isColorDark ? classes["dark-color"] : classes["light-color"]
        }`}
      ></div>
      <div
        className={`${
          props.isColorDark ? classes["dark-color"] : classes["light-color"]
        }`}
      ></div>
      <div
        className={`${
          props.isColorDark ? classes["dark-color"] : classes["light-color"]
        }`}
      ></div>
      <div
        className={`${
          props.isColorDark ? classes["dark-color"] : classes["light-color"]
        }`}
      ></div>
      <div
        className={`${
          props.isColorDark ? classes["dark-color"] : classes["light-color"]
        }`}
      ></div>
      <div
        className={`${
          props.isColorDark ? classes["dark-color"] : classes["light-color"]
        }`}
      ></div>
      <div
        className={`${
          props.isColorDark ? classes["dark-color"] : classes["light-color"]
        }`}
      ></div>
      <div
        className={`${
          props.isColorDark ? classes["dark-color"] : classes["light-color"]
        }`}
      ></div>
      <div
        className={`${
          props.isColorDark ? classes["dark-color"] : classes["light-color"]
        }`}
      ></div>
      <div
        className={`${
          props.isColorDark ? classes["dark-color"] : classes["light-color"]
        }`}
      ></div>
      <div
        className={`${
          props.isColorDark ? classes["dark-color"] : classes["light-color"]
        }`}
      ></div>
    </div>
  );
};

export default LoaderDotted;
