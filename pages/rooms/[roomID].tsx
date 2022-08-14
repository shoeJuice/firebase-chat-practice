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
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthentication } from "../../context/AuthenticationContext";
import ChatInput from "../../modules/chat/ChatInput";
import ChatContainer from "../../modules/chat/ChatContainer";

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
    <div>
      <h1>{roomName}</h1>
      <ChatContainer roomID={roomID} />
      <ChatInput roomID={roomID} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { roomID } = context.query;
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
};

export default Room;
