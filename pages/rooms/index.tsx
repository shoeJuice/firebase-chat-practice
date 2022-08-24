import React, { useEffect, useState, forwardRef } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import * as admin from "firebase-admin";
import { getFirestoreDB, firebaseAdminConfig } from "../../config/FirebaseApp";
import nookies from "nookies";
import {
  GetServerSidePropsContext,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";
import Link from "next/link";
import {
  Button,
  Input,
  Tooltip,
  Container,
  Text,
  useChakra,
  Modal,
  HStack,
  Heading,
  Spinner,
  Flex,
  Box,
  Grid,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { getFirebaseAuth } from "../../config/FirebaseApp";
import { CustomModal } from "../../modules/widgets/CustomModal";
import { MainLayout } from "../../modules/layout/MainLayout";
import initAdminApp from "../../modules/auth/InitAdminApp";
import ChatContainer from "../../modules/chat/ChatContainer";
import ChatInput from "../../modules/chat/ChatInput";
import Sidebar from "../../modules/chat/Sidebar";

const Rooms = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const firestore = getFirestoreDB();
  const [roomID, setRoomID] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [values, loading, error] = useCollection(
    collection(firestore, "rooms")
  );
  const { theme, colorMode, toggleColorMode, setColorMode } = useChakra();

  useEffect(() => {
    console.log("Room ID Changed: ", roomID);
  }, [roomID]);

  if (props.uid) {
    return (
      props.uid &&
      (loading ? (
        <MainLayout>
          <Spinner />
        </MainLayout>
      ) : (
        <MainLayout>
          <Flex height="100%" width="100%" flexGrow={1}>
            <Sidebar roomID={roomID} roomIDHandle={setRoomID} roomNameHandle={setRoomName} />
            <Box
              width="100%"
              height="100%"
              backgroundColor={colorMode == "dark" ? theme.colors.whiteAlpha[50] : theme.colors.purple[50]}
            >
              {roomID != "" && (
                <Flex
                  height="100%"
                  width="100%"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Heading
                    backgroundColor={colorMode == "dark" ? theme.colors.whiteAlpha[500] : theme.colors.purple[100]}
                    color={colorMode == "dark" ? theme.colors.whiteAlpha[800] : theme.colors.purple[800]}
                    padding={3}
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
  const { adminApp, adminAuth } = initAdminApp();

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
