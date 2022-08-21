import { createUseStyles } from "react-jss";

const usePageStyles = createUseStyles({
  fullPage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#e5e5f7",
    opacity: "1",
    backgroundImage:
      "linear-gradient(135deg, #be4bdb 25%, transparent 25%),\r\n    linear-gradient(225deg, #be4bdb 25%, transparent 25%),\r\n    linear-gradient(45deg, #be4bdb 25%, transparent 25%),\r\n    linear-gradient(315deg, #be4bdb 25%, #e5e5f7 25%)",
    backgroundPosition: "40px 0, 40px 0, 0 0, 0 0",
    backgroundSize: "80px 80px",
    backgroundRepeat: "repeat",
  },
  chevron: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "1",
    background: 'url("../public/pattern.png")',
  },
  panel: {
    width: "40%",
  },
  "@media (max-width: 480px)": {
    ".fullPage": {
      padding: 20,
    },
    panel: {
      width: "100%",
      placeSelf: "center",
      borderRadius: 20,
    },
  },
});

export const useMotionStyles = createUseStyles({
  registerBackground: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 0,
  },
  registerPanel: {
    position: "relative",
    zIndex: 2,
    padding: 10,
  }
});

export default usePageStyles;
