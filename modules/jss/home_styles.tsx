import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    splashContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      padding: "80px 40px",
      margin: "auto",
      height: "100%",
      alignItems: "center",
      "& div": {
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        width: "100%",
        "& p": {
          fontSize: "1.5rem",
        },
        "& h1": {
          fontSize: "2.8em",
        },
      },
    },
    fullPage: {
      height: "100vh",
      width: "100vw",
    },
    splashImage: {
      placeSelf: "center",
    },
    button: {
      margin: {
        top: "20px",
      },
    },
  });

export default useStyles;