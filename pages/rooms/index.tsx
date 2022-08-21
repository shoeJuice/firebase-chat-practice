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
} from "@chakra-ui/react";
import { getFirebaseAuth } from "../../config/FirebaseApp";
import { CustomModal } from "../../modules/widgets/CustomModal";
import { MainLayout } from "../../modules/layout/MainLayout";
import initAdminApp from "../../modules/auth/InitAdminApp";

const Rooms = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const firestore = getFirestoreDB();
  const [opened, setOpened] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>("");
  const [roomDescription, setRoomDescription] = useState<string>("");
  const [values, loading, error] = useCollection(
    collection(firestore, "rooms")
  );
  const { theme, colorMode, toggleColorMode, setColorMode } = useChakra();

  if (props.uid) {
    return (
      props.uid &&
      (loading ? (
        <MainLayout>
          <Spinner />
        </MainLayout>
      ) : (
        <MainLayout>
          <Heading mb={2}>Rooms</Heading>
          <CustomModal />
          {values?.docs.map((value, key) => {
            return (
              <div key={value.id}>
                <Tooltip label={value.data().description} placement="bottom">
                  <Button
                    variant="unstyled"
                    my={10}
                    onClick={() => router.push(`rooms/${value.id}`)}
                  >
                    {value.data().title}
                  </Button>
                </Tooltip>
              </div>
            );
          })}
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
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return {
      props: {},
    };
  }
};

export default Rooms;
