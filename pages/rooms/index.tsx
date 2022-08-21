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
  Modal,
  Group,
  TextInput,
  Tooltip,
  UnstyledButton,
  Container,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { getFirebaseAuth } from "../../config/FirebaseApp";

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
  const theme = useMantineTheme();

  if (props.uid) {
    return (
      props.uid &&
      (loading ? (
        <div>Loading...</div>
      ) : (
        <Container>
          <Title mb={2} order={2}>
            Rooms
          </Title>
          <Button
            mb={40}
            onClick={() => {
              setOpened(true);
            }}
          >
            Create Room
          </Button>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Create a new room"
          >
            <Group mb={10}>
              <TextInput
                label="Room name"
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
              />
              <TextInput
                label="Room description"
                onChange={(e) => {
                  setRoomDescription(e.target.value);
                }}
              />
            </Group>
            <Button
              onClick={async () => {
                let newDoc = await addDoc(collection(firestore, "rooms"), {
                  title: roomName,
                  description: roomDescription,
                });
                console.log(
                  `Room ${roomName} gets created. Description: ${roomDescription}`
                );
                router.push(`/rooms/${newDoc.id}`);
                setOpened(false);
              }}
            >
              Create
            </Button>
          </Modal>
          {values?.docs.map((value, key) => {
            return (
              <div key={value.id}>
                <Tooltip label={value.data().description} withArrow>
                  <UnstyledButton
                    mb={20}
                    onClick={() => router.push(`rooms/${value.id}`)}
                  >
                    {value.data().title}
                  </UnstyledButton>
                </Tooltip>
              </div>
            );
          })}
        </Container>
      ))
    );
  } else if (props.error) {
    return <div>{props.error}</div>;
  }
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let adminAuth = null;
  let adminApp = null;
  if (admin.apps.length == 0) {
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(firebaseAdminConfig),
    });
    adminAuth = admin.auth(adminApp);
  } else {
    adminAuth = admin.auth();
  }

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
