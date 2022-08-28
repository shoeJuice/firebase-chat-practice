import React from "react";
import {
  Box,
  IconButton,
  Heading,
  Tooltip,
  Button,
  theme,
  useColorMode,
  VStack,
  HStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestoreDB } from "../../config/FirebaseApp";
import { collection } from "firebase/firestore";
import { CustomModal } from "../widgets/CustomModal";
import { useAuthentication } from "../../context/AuthenticationContext";
import { Avatar } from "@mantine/core";
import Image from "next/image";

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
  const { user } = useAuthentication();

  console.log(user)

  return (
    <VStack
      padding={4}
      boxShadow="inner"
      backgroundColor={
        colorMode == "dark"
          ? theme.colors.whiteAlpha[500]
          : theme.colors.gray[50]
      }
      height="100%"
      
      alignItems="flex-start"
      justifyContent="flex-start"
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

      <Box
        display={isOpen ? "block" : "none"}
        overflowY="auto"
        overflowX="hidden"
        maxHeight="95%"
        flex={1}
      >
        <Heading
          color={
            colorMode == "dark"
              ? theme.colors.gray[50]
              : theme.colors.purple[700]
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
      <Flex borderTop="1px solid" paddingY={4} flexDirection="row" alignItems="center" width="100%" gap={2} justifyContent="center">
        <Image src={user.photoURL} alt="avatar" layout="fixed" width="40px" height="40px" style={{borderRadius: "2em"}} />
        <VStack alignItems="flex-start">
          <Text>{user.displayName}</Text>
          <Text>{user.email}</Text>
        </VStack>
      </Flex>
    </VStack>
  );
};

export default Sidebar;
