import { useRef, useEffect } from "react";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import FirebaseApp from "../../config/FirebaseApp";
import firebase from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  query,
  where,
  setDoc,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthentication } from "../../context/AuthenticationContext";

const Room = ({ roomID }: any) => {
  const firestore = getFirestore(FirebaseApp);
  const { user } = useAuthentication();
  const roomsRef = collection(firestore, "rooms");
  const messagesRef = collection(firestore, "rooms", roomID, "messages");
  const usersRef = collection(firestore, "rooms", roomID, "users");
  const currentUser = doc(usersRef, user.uid);
  const q = query(messagesRef, orderBy("createdAt"));
  //const userQuery = query(usersRef, where("userID", "==", user.id));
  //const currentUser = doc(firestore, "rooms", roomID, )
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, loading, error, snapshot] = useCollectionData(q);

  const handleSubmit = async () => {
    const input = inputRef.current?.value;
    await addDoc(messagesRef, {
      user: user.displayName,
      text: input,
      createdAt: serverTimestamp(),
    })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        console.log("Message has been sent.");
      });
  };

  useEffect(() => {
        setDoc(currentUser, {
        userID: user.uid,
        userName: user.displayName,
      }).finally( () => {console.log("User should be added.")});

      return () => {
        console.log("Component should unmount..");
        deleteDoc(currentUser).finally(() => {console.log("User should be removed from room.")});
      }

  }, []);

  return (
    <div>
      Get all messages for this specific room: {roomID}
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          messages?.map((message, key) => {
            return (
              <div key={key}>
                {`User: ${message.user}\nMessage: ${message.text}`}
              </div>
            );
          })
        )}
      </div>

      <input type="text" ref={inputRef} />
      <button type="submit" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { roomID } = context.query;

  return {
    props: {
      roomID,
    },
  };
};

export default Room;
