import React, { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useCycle,
  AnimateSharedLayout,
} from "framer-motion";
import { Text } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
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
  let randomChoice = useRef<number>(0);
  let displayDep = displayWord === false;

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "linear" }}
        >
          {altWords}
        </motion.span>
      </AnimatePresence>
    </>
  );
};
