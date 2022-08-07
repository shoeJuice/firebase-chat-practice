import React, {useEffect} from 'react'
import {getDatabase, ref, get, child} from 'firebase/database';
import { getFirestore, collection, getDocs, onSnapshot, QuerySnapshot } from 'firebase/firestore'
import FirebaseApp from '../../config/FirebaseApp'
import {useRouter} from 'next/router';
import { useCollectionData, useCollection } from 'react-firebase-hooks/firestore';
import Link from 'next/link';

const Rooms = () => {

    const router = useRouter();
    const [values, loading, error] = useCollection(collection(getFirestore(FirebaseApp), 'rooms'));

    return (
        loading ? <div>Loading...</div> : <div>{values?.docs.map((value, key) => {
            console.log(value.id);
            return <div key={value.id}>
                <Link href={`rooms/${value.id}`}>
                    {value.data().title}
                </Link>
                </div>
        })}</div>
    );
}

export default Rooms;