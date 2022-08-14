/**
 * @module BackgroundAnimations
 * This module contains all the background animations for the app.
 * The animations use motion from motion-framer to animate the background.
 * Note: The layout animations `ConfettiAnimation` are full-screen animations,
 * use them when displaying full-screen animations.
 */

import useRainbow from "../../utils/functions/useRainbow";
import { motion } from "framer-motion";

type ConfettiProps = {
  children?: React.ReactNode;
  opacity: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  numConfetti?: number;
  excludeList?: string[];
};

/**
 *
 * @description This component provides a back-ground confetti animation to its children.
 *
 * @ The layout animations `ConfettiAnimation` are full-screen animations,
 * use them when displaying full-screen animations.
 *
 * @param {ConfettiProps.numConfetti} numConfetti - The number of confetti to display.
 * @param {ConfettiProps.excludeList} excludeList - A list of colors to exclude from the confetti animation.
 * @param {ConfettiProps.opacity} opacity - The opacity of the confetti animation.
 * @param {ConfettiProps.children} children - The children of the component.
 *
 */
const ConfettiAnimation = ({
  opacity,
  excludeList,
  children,
  numConfetti,
}: ConfettiProps) => {
  const windowWidth = typeof window != "undefined" && window.innerWidth;
  const rainbowArray = useRainbow(opacity, excludeList);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        maxWidth: "100vw",
      }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100%",
          height: "100%",
        }}
      >
        {Array.from({ length: numConfetti ? numConfetti : 100 }).map(
          (index, key) => {
            // @ts-ignore
            const xSpread = Math.floor(Math.random() * windowWidth - 3);
            const fallSpread = Math.floor(Math.random() * 100) + 35;
            return (
              <motion.div
                key={key}
                style={{
                  position: "absolute",
                  x: xSpread,
                  y: -50,
                  zIndex: -key,
                  width: ".5rem",
                  height: ".5rem",
                  borderRadius: "0.5rem",
                  backgroundColor:
                    rainbowArray[
                      Math.floor(Math.random() * rainbowArray.length)
                    ],
                }}
                whileHover={{
                  scale: 2,
                }}
                onHoverStart={() => {
                  console.log("Hover Recognized");
                }}
                animate={{
                  y: `97vh`,
                  opacity: 0,
                  transition: {
                    duration: fallSpread,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: Math.floor(Math.random() * 10) + 1,
                    delay: Math.floor(Math.random() * 150) + 1,
                  },
                }}
              />
            );
          }
        )}
      </div>
      <div style={{ margin: "auto" }}>{children}</div>
    </div>
  );
};

export { ConfettiAnimation };
