import injectSheet, { createUseStyles } from "react-jss";
import {motion} from "framer-motion";


/**
 * @description Object defining styles for the confetti used by the confetti animation
 * within the login page.
 */
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

/**
 * 
 * @description Render a basic confetti component for the confetti animation within the login page.
 * @param {Object} classes - The classes object from the JSS stylesheet.
 * @param {Object} key - The key of the confetti.
 * @param {Object} custom - The custom object defining props to pass to the JSS stylesheet
 * @param {Object} animate - The animate object defining props to pass to the framer-motion animation.
 */
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