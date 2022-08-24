import React from "react";

import { Box, Text, Flex, Spinner, theme } from "@chakra-ui/react";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getFirestoreDB } from "../../config/FirebaseApp";

import { useAuthentication } from "../../context/AuthenticationContext";


const ChatBubble = ({ user, text, isUser, ref }: any) => {
  return (
    <Box
      px={10}
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
        <p>{text}</p>
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
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      boxShadow="inner"
      height="100%"
      width="100%"
      overflowY="scroll"
      padding={5}
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
                  marginBottom: "10px",
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
                  marginBottom: "10px",
                }}
              >
                <ChatBubble user={message.user} text={message.text} key={key} />
              </div>
            );
          }
        })
      )}
    </Box>
  );
};

export default ChatContainer;
