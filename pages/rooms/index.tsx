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
import FirebaseApp from "../../config/FirebaseApp";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";
import Link from "next/link";
import { Button, Modal, Group, TextInput, Tooltip, UnstyledButton } from "@mantine/core";


const Rooms = () => {
  const router = useRouter();
  const [opened, setOpened] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>("");
  const [roomDescription, setRoomDescription] = useState<string>("");
  const [values, loading, error] = useCollection(
    collection(getFirestore(FirebaseApp), "rooms")
  );

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>Rooms</h1>
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
            let newDoc = await addDoc(
              collection(getFirestore(FirebaseApp), "rooms"),
              { title: roomName, description: roomDescription }
            );
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
              <UnstyledButton mb={20} onClick={() => router.push(`rooms/${value.id}`)}>{value.data().title}</UnstyledButton>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};

export default Rooms;
