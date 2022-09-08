import Head from 'next/head';
import Header from '../components/Header';
import Image from 'next/image'
import { getSession, useSession } from 'next-auth/client'
import Login from '../components/Login';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from 'react';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import DocumentRow from '../components/DocumentRow';

export default function Home() {

  const [session] = useSession();
  if (!session)
    return <Login />

  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [snapshot] = useCollectionOnce(
    db.
      collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .orderBy('timestamp', 'desc')
  );

  const toggleModal = () => setShowModal(!showModal)

  const createDocument = () => {
    if (!input) {
      return;
    }

    db.collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .add({
        fileName: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

    setInput("");
    toggleModal();
  }

  const modal = (
    <Dialog size="sm" open={showModal} handler={toggleModal}>
      <DialogBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Doc Name"
          onKeyDown={(e) => e.key === 'Enter' && createDocument()}
        />
      </DialogBody>
      <DialogFooter className="flex justify-evenly items-center">
        <Button
          variant="text"
          color="red"
          onClick={toggleModal}
          size="sm"
        >
          <span>Cancel</span>
        </Button>
        <Button
          color="blue"
          onClick={() => createDocument()} size="sm"
        >
          <span>Create</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )

  return (
    <div>
      <Head>
        <title>T-Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {modal}

      <section className="bg-gray-50 px-10 pb-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center  justify-between py-6">
            <h2 className="md:text-lg text-gray-800">Start a new document</h2>
          </div>
          <div>
            <div onClick={() => setShowModal(true)} className="relative h-32 w-24 md:h-52 md:w-40 border cursor-pointer hover:shadow">
              <Image
                src="/plus.webp"
                layout="fill"
              />
            </div>
            <p className="ml-1 mt-2 font-semibold text-sm text-gray-700">Blank</p>

          </div>
        </div>
      </section>

      <section className="bg-white px-10">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="flex-grow font-semibold">My Documents</h2>
            <p>Date created</p>
          </div>
          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
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