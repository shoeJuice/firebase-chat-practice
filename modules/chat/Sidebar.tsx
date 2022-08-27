import React from "react";
import {
  Box,
  IconButton,
  Heading,
  Tooltip,
  Button,
  theme,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestoreDB } from "../../config/FirebaseApp";
import { collection } from "firebase/firestore";
import { CustomModal } from "../widgets/CustomModal";
import { motion, MotionConfig } from "framer-motion";

/**
 *
 * Renders a sidebar with a list of rooms alongside a button to create a new room.
 *
 * @param {Function} roomNameHandle - Function to handle room name change
 * @param {Function} roomIDHandler - Function to handle room ID change
 * @param {String} roomID - The unique ID of the chat room.
 */
const Sidebar = ({ roomNameHandle, roomIDHandle, roomID }: any) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const [values, loading, error] = useCollection(
    collection(getFirestoreDB(), "rooms")
  );
  const { colorMode } = useColorMode();

  return (
    <Box
      padding={3}
      boxShadow="inner"
      backgroundColor={
        colorMode == "dark"
          ? theme.colors.whiteAlpha[500]
          : theme.colors.gray[50]
      }
    >
      <IconButton
        aria-label="Toggle Rooms Menu"
        display={["block", "block", "block", "none"]}
        colorScheme="purple"
        justifyContent="center"
        alignItems="center"
        icon={<HamburgerIcon />}
        onClick={() => setIsOpen(!isOpen)}
      />
      <motion.div
        animate={{
          x: isOpen ? 0 : "-100%",
          display: isOpen ? "block" : "none",
          transition: { duration: 0.2 },
        }}
      >
        <Box overflowY="auto" overflowX="hidden" maxHeight="85%">
          <Heading
            color={
              colorMode == "dark"
                ? theme.colors.gray[50]
                : theme.colors.blackAlpha[700]
            }
            mb={2}
          >
            Rooms
          </Heading>
          <CustomModal
            roomNameHandle={roomNameHandle}
            roomIDHandler={roomIDHandle}
          />
          {values?.docs.map((value, key) => {
            return (
              <div key={value.id}>
                <Tooltip label={value.data().description} placement="bottom">
                  <Button
                    variant="ghost"
                    colorScheme={colorMode == "dark" ? "gray" : "purple"}
                    isActive={roomID == value.id}
                    width="100%"
                    justifyContent="flex-start"
                    my={2}
                    onClick={() => {
                      roomNameHandle(value.data().title);
                      roomIDHandle(value.id);
                    }}
                  >
                    {value.data().title}
                  </Button>
                </Tooltip>
              </div>
            );
          })}
        </Box>
      </motion.div>
    </Box>
  );
};

export default Sidebar;
