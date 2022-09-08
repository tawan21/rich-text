import React from 'react'
import Login from '../../components/Login';
import { useSession } from 'next-auth/client';
import { Icon } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { getSession, signOut } from 'next-auth/client'
import TextEditor from '../../components/TextEditor';

export default function Doc() {
    const [session] = useSession();

    const router = useRouter();
    const { id } = router.query;
    const [snapshot, loadingSnapshot] = useDocumentOnce(
        db.
            collection('userDocs')
            .doc(session?.user?.email)
            .collection('docs')
            .doc(id)
    );

    if (!loadingSnapshot && !snapshot?.data()?.fileName) {
        router.replace('/');
    }

    if (!session)
        return <Login />

    return (
        <div>
            <header className="flex justify-between items-center p-3">
                <span onClick={() => router.push('/')} className="cursor-pointer">
                    <Icon className="text-blue-600 text-3xl md:text-4xl">description</Icon>
                </span>
                <div className="flex-grow px-2">
                    <h1 className="text-xl text-gray-700 md:text-2xl font-bold">{snapshot?.data()?.fileName}</h1>
                </div>
                <img
                    onClick={signOut}
                    loading="lazy"
                    className="cursor-pointer h-10 w-10 rounded-full"
                    src={session?.user?.image}
                    alt="avatar"
                />
            </header>
            <TextEditor />
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: {
            session
        }
    }
}