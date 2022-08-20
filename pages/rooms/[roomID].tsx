import { useRef, useEffect } from "react";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import { getFirestoreDB } from "../../config/FirebaseApp";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  query,
  where,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import nookies from "nookies";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthentication } from "../../context/AuthenticationContext";
import ChatInput from "../../modules/chat/ChatInput";
import ChatContainer from "../../modules/chat/ChatContainer";
import styles from "../../styles/Chat.module.css";
import Link from "next/link";
import { Group, Button } from "@mantine/core";

const Room = ({ roomID, roomName }: any) => {
  const firestore = getFirestoreDB();
  const { user } = useAuthentication();
  const currentUser = doc(
    collection(firestore, "rooms", roomID, "users"),
    user.uid
  );

  useEffect(() => {
    setDoc(currentUser, {
      userID: user.uid,
      userName: user.displayName,
    });

    return () => {
      deleteDoc(currentUser);
    };
  }, []);

  return (
    <div className={styles.fullPage}>
      <Group>
        <Link passHref href={"/rooms"}>
          <Button color="grape">Back to Rooms</Button>
        </Link>
        <h1>{roomName}</h1>
      </Group>
      <ChatContainer roomID={roomID} />
      <ChatInput roomID={roomID} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  try {
    const token = nookies.get(ctx);
    const { roomID } = ctx.query;
    const currentRoom = doc(
      collection(getFirestoreDB(), "rooms"),
      String(roomID)
    );
    let roomName = "";
    await getDoc(currentRoom).then((doc) => {
      console.log(doc);
      roomName = doc.data()?.title;
    });

    return {
      props: {
        roomID,
        roomName,
      },
    };
  } catch (e) {
    console.error(e);
  }

  return {
    props: {} as never,
  };
};

export default Room;
