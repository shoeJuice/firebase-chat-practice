import React, { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useCycle,
} from "framer-motion";
import useRainbow from "../../utils/functions/useRainbow";

/**
 * A component that animates switches between two different words.
 */
export const WordSwitcher = () => {
  const [displayWord, setDisplayWord] = React.useState<boolean>(false);
  const rainbowArray = useRainbow(6, [
    "blackAlpha",
    "whiteAlpha",
    "gray",
    "dark",
  ]);
  const [altWords, setAltWords] = React.useState("Practice");

  const [index, setIndex] = useCycle(0, 4);


  React.useEffect(() => {
    setTimeout(() => {
      setIndex();
      altWords == "Portfolio" ? setAltWords("Practice") : setAltWords("Portfolio");
    }, 3000);
  }, [altWords]);

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <motion.span
          style={{
            color: rainbowArray[index],
            display: "inline-block",
            width: "95pt",
          }}
          key={altWords}
          initial={{ opacity: 0,
          y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
          exit={{ opacity: 0, y: 10, transition: { duration: 0.7, ease: "easeInOut" } }}
          transition={{ duration: 1, ease: "linear" }}
        >
          {altWords}
        </motion.span>
      </AnimatePresence>
    </>
  );
};
