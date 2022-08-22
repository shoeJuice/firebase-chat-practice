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

import Link from "next/link";
import { VStack, Button } from "@chakra-ui/react";
import initAdminApp from "../../modules/auth/InitAdminApp";

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
    <>
      <VStack>
        
        <h1>{roomName}</h1>
      </VStack>
      <ChatContainer roomID={roomID} />
      <ChatInput roomID={roomID} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { adminApp, adminAuth } = initAdminApp();

  try {
    const cookies = nookies.get(ctx);
    const token = await adminAuth.verifyIdToken(cookies.token);
    const { uid, email } = token;
    const { roomID } = ctx.query;
    const currentRoom = doc(
      collection(getFirestoreDB(), "rooms"),
      String(roomID)
    );
    let roomName = "";
    await getDoc(currentRoom).then((doc) => {
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
    ctx.res.writeHead(302, { location: "/" });

    return {
      props: {} as never,
    };
  }
};

export default Room;

/*

<Link passHref href={"/rooms"}>
          <Button color="grape">Back to Rooms</Button>
        </Link>

*/