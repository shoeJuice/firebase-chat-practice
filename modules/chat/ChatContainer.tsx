import React from "react";

import { Stack, Paper, Group } from "@mantine/core";
import {
  collection,
  getFirestore,
  query,
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getFirestoreDB } from "../../config/FirebaseApp";

import { useAuthentication } from "../../context/AuthenticationContext";

const ChatBubble = ({ user, text, isUser, ref }: any) => {
  return (
    <Paper
      px={15}
      py={10}
      mx={10}
      sx={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        textAlign: isUser ? "right" : "left",
        backgroundColor: isUser ? "#D0EBFF" : "#CED4DA",
      }}
    >
      <Group>
        <Stack spacing={1}>
          {isUser ? null : <span>{user}</span>}
          <p>{text}</p>
        </Stack>
      </Group>
    </Paper>
  );
};

const ChatContainer = ({ roomID }: any) => {
  const firestore = getFirestoreDB();
  const { user } = useAuthentication();

  const messagesRef = collection(firestore, "rooms", roomID, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt"));

  const [messages, loading, error] = useCollectionData(messagesQuery);
  const messageEndRef = React.useRef<null | HTMLDivElement>(null);
  React.useEffect(() => {
    console.log("Bingo!");
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        overflowY: "auto",
        height: "600px",
        margin: 'auto',
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        messages?.map((message, key) => {
          if (message.user == user.displayName) {
            return (
              <div
                ref={messageEndRef}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <ChatBubble
                  ref={messageEndRef}
                  user={message.user}
                  text={message.text}
                  isUser={true}
                  key={key}
                />
              </div>
            );
          } else {
            return (
              <div
                ref={messageEndRef}
                style={{
                  display: "flex",
                  width: "50%",
                }}
              >
                <ChatBubble user={message.user} text={message.text} key={key} />
              </div>
            );
          }
        })
      )}
    </div>
  );
};

export default ChatContainer;
