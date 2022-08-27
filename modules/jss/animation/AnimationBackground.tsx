import { createUseStyles } from "react-jss";


/**
 * @description The CSS-in-JS styles for the background animation. This utilizes a hook to create a custom stylesheet for the background animation.
 */
export const useAnimationStyles = createUseStyles({
  background: {
    display: "flex",
    minHeight: "100vh",
    maxWidth: "100vw",
    overflow: "hidden",
  },
});

/**
 * @description The CSS-in-JS styles for the background confetti. This utilizes a hook to create a custom stylesheet for the background confetti.
 */
export const useConfettiStyles = createUseStyles({
  background: {
    position: "absolute",
    zIndex: "-1",
    width: "100%",
    height: "100%",
  },
});

export const childStyle = createUseStyles({
    pageContent: {
      margin: "auto",
    }
  })

