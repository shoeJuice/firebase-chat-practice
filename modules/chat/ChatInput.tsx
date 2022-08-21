import React, { useRef } from "react";

import {
  addDoc,
  serverTimestamp,
  collection,
  getFirestore,
} from "firebase/firestore";
import { Input, Button } from "@chakra-ui/react";

import { getFirestoreDB } from "../../config/FirebaseApp";
import { useAuthentication } from "../../context/AuthenticationContext";
import styles from "../../styles/Chat.module.css";

const ChatInput = ({ roomID }: any) => {
  const firestore = getFirestoreDB();
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = collection(firestore, "rooms", roomID, "messages");

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
    <div className={styles.chatInput}>
        <Input
          ref={inputRef}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          style={{ width: "100%" }}
          placeholder="Type a message..."
        />
    </div>
  );
};

export default ChatInput;
