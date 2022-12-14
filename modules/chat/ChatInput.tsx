import React, { useRef } from "react";

import { addDoc, Timestamp, collection } from "firebase/firestore";
import { Input, theme, useColorMode } from "@chakra-ui/react";

import { getFirestoreDB } from "../../config/FirebaseApp";
import { useAuthentication } from "../../context/AuthenticationContext";

/**
 * Render a component that allows users to add messages to a unique
 * chat room.
 * @param {String} roomID The unique ID of the chat room.
 *
 */
const ChatInput = ({ roomID }: any) => {
  const firestore = getFirestoreDB();
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = collection(firestore, "rooms", roomID, "messages");
  const { colorMode } = useColorMode();
  const { user } = useAuthentication();

  const handleSubmit = async () => {
    let currentTimestamp = Timestamp.now();
    let input = inputRef.current?.value;
    if (input == "") {
      return;
    }
    await addDoc(messagesRef, {
      user: user,
      text: input,
      createdAt: currentTimestamp,
    }).catch((error) => {
      console.error(error.message);
    });
    
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Input
      ref={inputRef}
      top={-5}
      boxShadow="base"
      position="relative"
      zIndex={400}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          handleSubmit();
        }
      }}
      width="95%"
      margin="auto"
      backgroundColor={
        colorMode == "dark"
          ? theme.colors.purple[300]
          : theme.colors.purple[500]
      }
      color={theme.colors.whiteAlpha[900]}
      sx={{
        border: "none",
        _placeholder: {
          color: colorMode == "dark" ? theme.colors.purple[600] : theme.colors.whiteAlpha[800],
        },
      }}
      padding={7}
      placeholder="Type a message..."
    />
  );
};

export default ChatInput;
