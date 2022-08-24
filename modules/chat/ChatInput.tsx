import React, { useRef } from "react";

import {
  addDoc,
  serverTimestamp,
  collection,
  getFirestore,
} from "firebase/firestore";
import { Input, Button, theme, useColorMode } from "@chakra-ui/react";

import { getFirestoreDB } from "../../config/FirebaseApp";
import { useAuthentication } from "../../context/AuthenticationContext";

const ChatInput = ({ roomID }: any) => {
  const firestore = getFirestoreDB();
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = collection(firestore, "rooms", roomID, "messages");
  const { colorMode } = useColorMode();
  const { user } = useAuthentication();

  const handleSubmit = async () => {
    let input = inputRef.current?.value;
    if (input == "") {
      return;
    }
    await addDoc(messagesRef, {
      user: user.displayName,
      text: input,
      createdAt: serverTimestamp(),
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
      backgroundColor={colorMode == "dark" ? theme.colors.purple[300] : theme.colors.purple[100]}
      sx={{
        border: "none",
      }}
      padding={7}
      placeholder="Type a message..."
    />
  );
};

export default ChatInput;
