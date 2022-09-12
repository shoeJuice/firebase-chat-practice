import { createUseStyles } from "react-jss";
import { theme } from "@chakra-ui/react";

const loginStyles = createUseStyles({
    loginForm: {
      borderRadius: 6,
      zIndex: 50,
      backgroundColor: ({ colorMode }: any) =>
        colorMode == "dark"
          ? theme.colors.whiteAlpha[500]
          : theme.colors.purple[400],
      color: theme.colors.gray[50],
      padding: {
        left: 30,
        right: 30,
        top: 20,
        bottom: 20,
      },
      boxShadow: "10 10 5 rgba(0, 0, 0, 0.1)",
    },
    
  });
  

export default loginStyles;