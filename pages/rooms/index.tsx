import React, { useState } from "react";

import { collection } from "firebase/firestore";

import { getFirestoreDB } from "../../config/FirebaseApp";
import nookies from "nookies";
import {
  GetServerSidePropsContext,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";

import { useCollection } from "react-firebase-hooks/firestore";

import { useChakra, Heading, Spinner, Flex, Box } from "@chakra-ui/react";

import { MainLayout } from "../../modules/layout/MainLayout";
import initAdminApp from "../../modules/auth/InitAdminApp";
import ChatContainer from "../../modules/chat/ChatContainer";
import ChatInput from "../../modules/chat/ChatInput";
import Sidebar from "../../modules/chat/Sidebar";

const Rooms = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const firestore = getFirestoreDB();
  const [roomID, setRoomID] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [values, loading, error] = useCollection(
    collection(firestore, "rooms")
  );
  const { theme, colorMode } = useChakra();


  if (props.uid) {
    return (
      props.uid &&
      (loading ? (
        <MainLayout>
          <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
            <Spinner />
          </Flex>
        </MainLayout>
      ) : (
        <MainLayout>
          <Flex height="100%" width="100%" flexGrow={1}>
            <Sidebar
              roomID={roomID}
              roomIDHandle={setRoomID}
              roomNameHandle={setRoomName}
            />
            <Box
              width="100%"
              height="100%"
              backgroundColor={
                colorMode == "dark"
                  ? theme.colors.whiteAlpha[50]
                  : theme.colors.whiteAlpha[50]
              }
            >
              {roomID != "" && (
                <Flex
                  height="100%"
                  width="100%"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Heading
                    backgroundColor={
                      colorMode == "dark"
                        ? theme.colors.purple[300]
                        : theme.colors.purple[500]
                    }
                    color={
                      colorMode == "dark"
                        ? theme.colors.whiteAlpha[800]
                        : theme.colors.whiteAlpha[900]
                    }
                    padding={3}
                    size="lg"
                  >
                    {roomName}
                  </Heading>
                  <ChatContainer roomID={roomID} />
                  <ChatInput roomID={roomID} />
                </Flex>
              )}
            </Box>
          </Flex>
        </MainLayout>
      ))
    );
  } else if (props.error) {
    return <div>{props.error}</div>;
  }
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { adminAuth } = initAdminApp();

  try {
    const cookies = nookies.get(ctx);
    const token = await adminAuth.verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: {
        uid,
        email,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
};

export default Rooms;
