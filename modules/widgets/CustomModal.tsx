import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { addDoc, collection } from "firebase/firestore";
import { getFirestoreDB } from "../../config/FirebaseApp";

/**
 * @description Component used to render modals for creating and joining rooms.
 *
 * @returns \<Modal\> component
 */

export const CustomModal = ({ roomIDHandler, roomNameHandle }: any) => {
  const router = useRouter();
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
    console.log(
      `Room ${roomName} gets created. Description: ${roomDescription}`
    );

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
        <ModalContent>
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
                />
                <FormLabel mt={5} htmlFor="room-description">
                  Room Description
                </FormLabel>
                <Input
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                />
                <Button
                  mt={5}
                  isDisabled={!roomDescription && !roomName}
                  onClick={handleSubmit}
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
