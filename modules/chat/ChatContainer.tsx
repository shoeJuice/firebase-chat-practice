import React from 'react'

import { Stack, Paper, Group } from '@mantine/core';
import { collection, getFirestore, query, doc, getDoc, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import FirebaseApp from '../../config/FirebaseApp';

import { useAuthentication } from '../../context/AuthenticationContext';


const ChatBubble = ({user, text, isUser} : any) => {
  return (
    <Paper px={15} py={10} mx={10} sx={{
        alignSelf: isUser ? "flex-start" : "flex-end",
        textAlign: isUser ? "left" : "right",
        backgroundColor: isUser ? "#D0EBFF" : "#CED4DA"
      } 
    }>
      <Group>
        <Stack spacing={1}>
          {isUser ? null : <span>{user}</span>}
          <p>{text}</p>
        </Stack>
      </Group>
    </Paper>
    );
}


const ChatContainer = ({roomID} : any) => {

  const { user } = useAuthentication();

  const messagesRef = collection(getFirestore(FirebaseApp), "rooms", roomID, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt"));

  const [messages, loading, error] = useCollectionData(messagesQuery);


  return (
    <Stack sx={{
      overflowY: "scroll",
      height: "600px"
    }}>
      {loading ? (
          <div>Loading...</div>
        ) : (
          messages?.map((message, key) => {
            if(message.user == user.displayName){
              return <ChatBubble user={message.user} text={message.text} isUser={true} key={key} />
            }
            else{
            return (
              <ChatBubble user={message.user} text={message.text} key={key} />
            );
            }
          })
        )}
    </Stack>
  )
}

export default ChatContainer