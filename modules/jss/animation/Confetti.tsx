import injectSheet, { createUseStyles } from "react-jss";
import {motion} from "framer-motion";

type ConfettiProps = {
  children?: React.ReactNode;
  opacity: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  numConfetti?: number;
  excludeList?: string[];
};

const motionStyles = {
  confetti: (props: {
    xSpread: number;
    key: number;
    rainbowArray: string[];
  }) => ({
    position: "absolute",
    left: props.xSpread,
    top: "-10%",
    zIndex: -(props.key - 2),
    width: ".7rem",
    height: ".7rem",
    borderRadius: ".7rem",
    backgroundColor:
      props.rainbowArray[Math.floor(Math.random() * props.rainbowArray.length)],
  }),
};

const Confetti = ({ classes, key, custom, animate }: any) => {
    return (
      <motion.div
        key={key}
        className={classes.confetti}
        custom={custom}
        animate={animate}
      />
    );
  };
  
export const StyledConfetti = injectSheet(motionStyles)(Confetti);