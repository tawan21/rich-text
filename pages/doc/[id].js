import React from 'react'
import Login from '../../components/Login';
import { useSession } from 'next-auth/client';
import { Icon } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';

function Doc() {
    const [session] = useSession();
    if (!session)
        return <Login />

    const router = useRouter();
    const { id } = router.query;
    const [snapshot, loadingSnapshot] = useDocumentOnce(
        db.
            collection('userDocs')
            .doc(session.user.email)
            .collection('docs')
            .doc(id)
    );

    return (
        <div>
            <header className="flex justify-between items-center p-3 pb-1">
                <span onClick={() => router.push('/')} className="cursor-pointer">
                    <Icon className="text-blue-600 text-3xl md:text-5xl">description</Icon>
                </span>
                <div className="flex-grow px-2">
                    <h2>{snapshot?.data()?.fileName}</h2>
                </div>
            </header>
        </div>
    )
}

export default Doc