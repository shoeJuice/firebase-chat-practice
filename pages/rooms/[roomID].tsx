import { useRef, useEffect } from "react";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import FirebaseApp from "../../config/FirebaseApp";
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
  const firestore = getFirestore(FirebaseApp);
  const { user } = useAuthentication();
  const messagesRef = collection(firestore, "rooms", roomID, "messages");
  const currentUser = doc(
    collection(firestore, "rooms", roomID, "users"),
    user.uid
  );
  const currentRoom = doc(collection(firestore, "rooms"), roomID);
  const messagesQuery = query(messagesRef, orderBy("createdAt"));
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, loading, error, snapshot] = useCollectionData(messagesQuery);

  const handleSubmit = async () => {
    let input = inputRef.current?.value;
    if(input == ""){
      return
    }
    await addDoc(messagesRef, {
      user: user.displayName,
      text: input,
      createdAt: serverTimestamp(),
    }).catch((error) => {
      console.error(error.message);
    });
    if (inputRef.current) inputRef.current.value = "";
  };
  console.log(currentRoom);
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
    collection(getFirestore(FirebaseApp), "rooms"),
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
