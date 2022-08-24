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
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";
import { getFirestoreDB, firebaseAdminConfig } from "../../config/FirebaseApp";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { CustomModal } from "../widgets/CustomModal";

const Sidebar = ({ roomNameHandle, roomIDHandle, roomID }: any) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [roomName, setRoomName] = React.useState<string>("");
  const [values, loading, error] = useCollection(
    collection(getFirestoreDB(), "rooms")
  );
  const { colorMode } = useColorMode();

  return (
    <Box padding={3} backgroundColor={colorMode == "dark" ? theme.colors.whiteAlpha[500] : theme.colors.purple[100]}>
      <IconButton
        aria-label="Toggle Rooms Menu"
        display={["block", "block", "block", "none"]}
        colorScheme="purple"
        justifyContent="center"
        alignItems="center"
        icon={<HamburgerIcon />}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Box
        display={[
          isOpen ? "block" : "none",
          isOpen ? "block" : "none",
          isOpen ? "block" : "none",
          "block",
        ]}
      >
        <Heading color={colorMode == "dark" ? theme.colors.gray[50] : theme.colors.blackAlpha[700]} mb={2}>Rooms</Heading>
        <CustomModal />
        {values?.docs.map((value, key) => {
          return (
            <div key={value.id}>
              <Tooltip label={value.data().description} placement="bottom">
                <Button
                  variant="ghost"
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
    </Box>
  );
};

export default Sidebar;
