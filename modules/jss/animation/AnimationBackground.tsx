import { createUseStyles } from "react-jss";
import { motion } from "framer-motion";

export const useAnimationStyles = createUseStyles({
  background: {
    display: "flex",
    minHeight: "100vh",
    maxWidth: "100vw",
    overflow: "hidden",
  },
});

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

