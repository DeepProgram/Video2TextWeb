import Link from "next/link";
import classes from "./HeaderNonLoggedIn.module.css";

const HeaderNonLoggedIn = () => {
  return (
    <div className={classes.container}>
      <div className={classes["mobile-menu"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </div>
      <div className={classes.logo}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 384 512"
        >
          <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
        </svg>
        <p>Reuv Play</p>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li className={`${classes["list-item"]}`}>
            <Link
              className={`${classes.url} ${classes["btn-bold"]}`}
              href={"/video"}
            >
              Video
            </Link>
          </li>
          <li className={classes["list-item"]}>
            <Link className={classes.url} href={"/login"}>
              Log In
            </Link>
          </li>
          <li className={classes["list-item"]}>
            <Link className={classes.url} href={"/signup"}>
              Sign Up
            </Link>
          </li>
          <li className={classes["list-item"]}>
            <Link className={classes.url} href={"/signup"}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderNonLoggedIn;
