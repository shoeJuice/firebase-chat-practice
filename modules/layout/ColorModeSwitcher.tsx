import React from "react";

import { useChakra, IconButton } from "@chakra-ui/react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

/**
 * @description Component used to switch between light and dark mode.
 *
 */
function ColorModeSwitcher() {

  const { colorMode, toggleColorMode } = useChakra();

  return <IconButton position="relative" zIndex={3} top={2} right={2}  float="right" icon={colorMode == "dark" ? <BsSunFill /> : <BsMoonFill />} onClick={toggleColorMode} colorScheme="purple" aria-label="Toggle Color Mode"/>;
}

export default ColorModeSwitcher;
