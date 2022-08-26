import Head from 'next/head';
import Header from '../components/Header';
import { IconButton } from '@mui/material';
import Image from 'next/image'
import Icon from '@mui/material/Icon';

export default function Home() {
  return (
    <div>
      <Head>
        <title>T-Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

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
            <div className="relative h-52 w-40 border cursor-pointer hover:border-blue-100">
              <Image
                src="https://links.papareact.com/pju"
                layout="fill"
              />
            </div>
            <p className="ml-1 mt-2 font-semibold text-sm text-gray-700">Blank</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="flex-grow font-semibold">My Documents</h2>
            <p className="mr-12">Date created</p>
            <Icon>folder</Icon>
          </div>
        </div>
      </section>

    </div>
  )
}
