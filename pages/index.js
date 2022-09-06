import Head from 'next/head';
import Header from '../components/Header';
import { IconButton } from '@mui/material';
import Image from 'next/image'
import Icon from '@mui/material/Icon';
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

export default function Home() {

  const [session] = useSession();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");

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
          placeholder="Enter document name"
          onKeyDown={(e) => e.key === 'Enter' && createDocument()}
        />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={toggleModal}
          className="mr-1"
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

  if (!session)
    return <Login />

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
            <h2 className="text-lg text-gray-800">Start a new document</h2>
            <IconButton
              className="border-0"
            >
              <Icon>more_vert</Icon>
            </IconButton>
          </div>
          <div>
            <div onClick={() => setShowModal(true)} className="relative h-52 w-40 border cursor-pointer hover:border-blue-100">
              <Image
                src="https://links.papareact.com/pju"
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
            <h2 className="flex-grow font-medium">My Documents</h2>
            <p className="mr-12">Date created</p>
            <Icon>folder</Icon>
          </div>
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