import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  FormControl,
  FormLabel,
  theme,
  useColorModeValue
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { getFirestoreDB } from "../../config/FirebaseApp";

/**
 * @description Component used to render modals for creating and joining rooms.
 *
 * @returns \<Modal\> component
 */

export const CustomModal = ({ roomIDHandler, roomNameHandle }: any) => {
  const firestore = getFirestoreDB();
  const [opened, setOpened] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = async () => {
    let newDoc = await addDoc(collection(firestore, "rooms"), {
      title: roomName,
      description: roomDescription,
    })
      .then((doc) => {
        roomIDHandler(doc.id);
        roomNameHandle(roomName);
      })
      .catch((error) => {
        console.log(error);
      });

    setOpened(false);
    onClose();
  };
  return (
    <>
      <Button colorScheme="purple" onClick={onOpen}>
        Create Room
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={useColorModeValue(theme.colors.whiteAlpha[800], theme.colors.whiteAlpha[400])}>
          <ModalHeader>Create Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl>
                <FormLabel mt={5} htmlFor="room-name">
                  Room Name
                </FormLabel>
                <Input
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  borderColor="gray.400"
                />
                <FormLabel mt={5} htmlFor="room-description">
                  Room Description
                </FormLabel>
                <Input
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                  borderColor="gray.400"
                />
                <Button
                  mt={5}
                  isDisabled={!roomDescription && !roomName}
                  onClick={handleSubmit}
                  colorScheme="purple"
                >
                  Create Room
                </Button>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
