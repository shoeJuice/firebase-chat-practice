import { createUseStyles } from "react-jss";


/**
 * @description The CSS-in-JS styles for the home page. This is a custom hook that is used to create a custom stylesheet for the home page.
 */
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
      width: "100%",
      "& p": {
        fontSize: "1.5rem",
      },
      "& h1": {
        fontSize: "2.8em",
      },
    },
    '& splashImage': {
      placeSelf: "center",
      display: "none"
    },
    
  },
  fullPage: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
  splashText: {
    padding: "0 20px",
  },
  splashImage: {
    placeSelf: "center",
    display: "block",
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  button: {
    margin: {
      top: "20px",
    },
  },
  "@media (max-width: 480px)": {
    splashContainer: {
      padding: "2em .5em",
      display: "flex",
      flexDirection: "column",
      
    },
    splashText: {
      order: 2,
    },
    splashImage: {
      display: "flex",
      order: 1,
    }
    
  },
});

export default useStyles;
