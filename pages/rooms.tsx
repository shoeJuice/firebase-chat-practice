import React, {useEffect} from 'react'
import {getDatabase, ref, get, child} from 'firebase/database';
import { getFirestore, collection, getDocs, onSnapshot, QuerySnapshot } from 'firebase/firestore'
import FirebaseApp from '../config/FirebaseApp'
import {useRouter} from 'next/router';

const Rooms = ({rooms} : any) => {

    const router = useRouter();

    useEffect(() => {
        const db = getFirestore(FirebaseApp);
        const roomsRef = collection(db, 'rooms');
        const snapshotListener = onSnapshot(roomsRef, (snapshot: QuerySnapshot) => {
            snapshot.docChanges().forEach(change => {
                router.replace(router.asPath)
            })
        })

    }, [])

    return (
        <div>
            {rooms.map((room: any, key: any) => {return(<div key={key}>{room}</div>)})}
        </div>
    );
}

export const getServerSideProps = async (ctx: any) => {
    const db = getFirestore(FirebaseApp);
    const roomsRef = collection(db, 'rooms');
    const querySnapshot = await getDocs(roomsRef);
    let rooms: string[] = []
    querySnapshot.forEach((doc: any) => {
        console.log(doc.id, '=>', doc.data());
        rooms.push(doc.data().title)
    });
   
 
    return {
        props: {
            message: 'Hello World from rooms',
            rooms
        },
    }
}

export default Rooms;