import { createUseStyles } from "react-jss";
import {theme} from "@chakra-ui/react"

/**
 * @description The CSS-in-JS styles for the register page. This is a custom hook that is used to create a custom stylesheet for the register page.
 */
const usePageStyles = createUseStyles({
  fullPage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100vh",
    width: "100vw",
    backgroundColor: `"#e5e5f7"`,
    opacity: "1",
    backgroundImage:
      `linear-gradient(135deg, #be4bdb 25%, transparent 25%),\r\n    linear-gradient(225deg, #be4bdb 25%, transparent 25%),\r\n    linear-gradient(45deg, #be4bdb 25%, transparent 25%),\r\n    linear-gradient(315deg, #be4bdb 25%, ${theme.colors.gray[300]} 25%)`,
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


/**
 * @description The CSS-in-JS styles for the register form. This is a custom hook that is used to create a custom stylesheet for the register form.
 */
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
