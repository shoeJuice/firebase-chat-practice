/**
 * @module BackgroundAnimations
 * This submodule contains all the background animations for the app.
 * The animations use motion from motion-framer to animate the background.
 * Note: The layout animations `ConfettiAnimation` are full-screen animations,
 * use them when displaying full-screen animations.
 */

import { useEffect, useState } from "react";
import useRainbow from "../../utils/functions/useRainbow";
import { motion, useAnimationControls } from "framer-motion";

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
  const [windowWidth, setWindowWidth] = useState(
    typeof window != "undefined" && window.innerWidth
  );
  const rainbowArray = useRainbow(opacity, excludeList);
  const confettiControls = useAnimationControls();
  const backgroundControls = useAnimationControls();

  useEffect(() => {
    backgroundControls.start({
      opacity: 1,
      transition: {
        duration: 1,
        ease: "linear",
      },
    })
  }, []);

  if (typeof window != "undefined") {
    window.addEventListener("focus", () => {
      console.log("Window has focus");
      confettiControls.start(({durationSpread, repeatSpread, delaySpread}) => ({
        y: `97vh`,
        opacity: 1,
        transition: {
          duration: durationSpread,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: repeatSpread,
          delay: delaySpread,
        },
      }));
    });
    window.addEventListener("blur", () => {
      console.log("Window lost focus");
      confettiControls.stop();
      backgroundControls.stop();
    });
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }

  return (
    <motion.div
      style={{
        display: "flex",
        minHeight: "100vh",
        maxWidth: "100vw",
      }}
      
      exit={{opacity: 0}}
    >
      <motion.div
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100%",
          height: "100%",
        }}
        initial={{ opacity: 0 }}
        animate={backgroundControls}
      >
        {Array.from({ length: numConfetti ? numConfetti : 100 }).map(
          (index, key) => {
            // @ts-ignore
            const xSpread = Math.floor(Math.random() * windowWidth - 3);
            const durationSpread = Math.floor(Math.random() * 100) + 35;
            const repeatSpread = Math.floor(Math.random() * 10) + 1;
            const delaySpread = Math.floor(Math.random() * 60) + 1;

            const customConfig = {
              durationSpread,
              repeatSpread,
              delaySpread,
            }
            
            return (
              <motion.div
                key={key}
                style={{
                  position: "absolute",
                  x: xSpread,
                  y: "-100%",
                  zIndex: -(key - 2),
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "1.5rem",
                  backgroundColor:
                    rainbowArray[
                      Math.floor(Math.random() * rainbowArray.length)
                    ],
                }}
                custom={customConfig}
                animate={{
                  y: `99vh`,
                  opacity: 1,
                  transition: {
                    duration: durationSpread,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: repeatSpread,
                    delay: delaySpread,
                  },
                }}
              />
            );
          }
        )}
      </motion.div>
      <div style={{ margin: "auto" }}>{children}</div>
    </motion.div>
  );
};

export { ConfettiAnimation };
