import classes from "./LoaderWave.module.css";

const LoaderWave = () => {
  return (
    <div className={classes["lds-ripple"]}>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoaderWave;
