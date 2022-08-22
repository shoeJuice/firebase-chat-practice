import React from "react";

import {
  HStack,
  Box,
  VStack,
  Text,
  Flex,
  Spinner,
  theme,
} from "@chakra-ui/react";
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
import ChatInput from "./ChatInput";

const ChatBubble = ({ user, text, isUser, ref }: any) => {
  return (
    <Box
      px={15}
      py={5}
      borderRadius={10}
      sx={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        textAlign: isUser ? "right" : "left",
        backgroundColor: isUser ? "#8a2be2" : "#CED4DA",
        color: isUser ? "white" : theme.colors.blackAlpha[800],
      }}
    >
      <Flex gap={2} flexDirection="column" justifyContent="flex-start">
        {!isUser && <Text fontWeight="500">{user}</Text>}
        <HStack spacing={1}>
          <p>{text}</p>
        </HStack>
      </Flex>
    </Box>
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
    <Flex
      boxShadow="inner"
      flexDirection="column"
      height="100%"
      overflowY="scroll"
      padding={5}
      gap={10}
    >
      {loading ? (
        <div style={{ margin: "auto" }}>
          <Spinner size="xl" />
        </div>
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
                  width: "70%",
                }}
              >
                <ChatBubble user={message.user} text={message.text} key={key} />
              </div>
            );
          }
        })
      )}
    </Flex>
  );
};

export default ChatContainer;
