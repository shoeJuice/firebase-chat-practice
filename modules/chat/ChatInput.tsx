import React, { useRef } from "react";

import {
  addDoc,
  serverTimestamp,
  collection,
  getFirestore,
} from "firebase/firestore";
import { Input, Group, Button } from "@mantine/core";

import firebaseApp from "../../config/FirebaseApp";
import { useAuthentication } from "../../context/AuthenticationContext";

const ChatInput = ({ roomID }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = collection(
    getFirestore(firebaseApp),
    "rooms",
    roomID,
    "messages"
  );

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
    <Group mt={10}>
      <Input
        ref={inputRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <Button onClick={handleSubmit}>Send</Button>
    </Group>
  );
};

export default ChatInput;
