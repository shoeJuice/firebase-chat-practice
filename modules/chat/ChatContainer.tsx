import React from "react";

import { Box, Text, Flex, Spinner, theme, } from "@chakra-ui/react";
import { collection, query, orderBy, Timestamp } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getFirestoreDB } from "../../config/FirebaseApp";

import { useAuthentication } from "../../context/AuthenticationContext";

type ChatInfo = {
  user: {
    displayName: string,
    photoURL: string,
    email: string,
    uid: string,
  },
  text: string,
  isUser: boolean,
  ref: any,
  time: Timestamp
}

const ChatBubble = ({ user, text, isUser, ref, time }: ChatInfo) => {
  console.log(
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "medium",
    }).format(time.toDate())
  );
  let currentTime = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "medium",
  }).format(time.toDate());
  return (
    <Box
      px={10}
      py={5}
      borderRadius={10}
      boxShadow="lg"
      sx={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        textAlign: isUser ? "right" : "left",
        backgroundColor: isUser
          ? theme.colors.purple[600]
          : theme.colors.gray[400],
        color: theme.colors.whiteAlpha[900],
      }}
    >
      <Flex gap={2} flexDirection="column" justifyContent="flex-start">
        {
          <Box>
            <Text fontWeight="500">
              {user.displayName}
            </Text>
            <Text fontWeight="100">{currentTime}</Text>
          </Box>
        }
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
        user && messages?.map((message, key) => {
          if (message.user.uid == user.uid) {
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
                  time={message.createdAt}
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
                <ChatBubble user={message.user} isUser={false} ref={messageEndRef} time={message.createdAt} text={message.text} key={key} />
              </div>
            );
          }
        })
      )}
    </Box>
  );
};

export default ChatContainer;
