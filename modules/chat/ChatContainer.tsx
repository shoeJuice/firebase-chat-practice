import React from "react";

import { Box, Text, Flex, Spinner, theme } from "@chakra-ui/react";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getFirestoreDB } from "../../config/FirebaseApp";

import { useAuthentication } from "../../context/AuthenticationContext";
import { motion } from "framer-motion";

const ChatBubble = ({ user, text, isUser, ref }: any) => {
  return (
    <Box
      px={10}
      py={5}
      borderRadius={10}
      boxShadow="lg"
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

/**
 *
 * Render a component that displays all messages for a unique chat room.
 * @param {String} roomID The unique ID of the chat room.
 *
 */
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
      overflowX="hidden"
      padding={5}
    >
      {loading ? (
        <Flex width="100%" height="100%" margin="auto">
          <Spinner size="xl" />
        </Flex>
      ) : (
        messages?.map((message, key) => {
          if (message.user == user.displayName && key == messages.length - 1) {
            return (
              <motion.div
                ref={messageEndRef}
                animate={{
                  scaleX: [2, 1],
                  transition: { type: "spring", duration: 0.5 },
                }}
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
              </motion.div>
            );
          } else {
            return key == messages.length - 1 ? (
              <motion.div
                ref={messageEndRef}
                animate={{
                  scaleX: [2, 1],
                  transition: { type: "spring", duration: 0.5 },
                }}
                style={{
                  display: "flex",
                  marginBottom: "10px",
                }}
              >
                <ChatBubble user={message.user} text={message.text} key={key} />
              </motion.div>
            ) : (
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
