import React from 'react'
import Icon from '@mui/material/Icon';
import { IconButton } from '@mui/material';
import { useSession, signOut } from 'next-auth/client'

function Header() {
    const [session] = useSession();

    return (
        <header className="sticky top-0 z-50 flex items-center p-3 shadow-md bg-white">
            <div className="flex justify-center">
                <IconButton
                    className="md:inline-flex border-0"
                >
                    <Icon>menu</Icon>
                </IconButton>
                <Icon className="text-blue-600 text-3xl md:text-5xl">description</Icon>
            </div>
            <h1 className="ml-2 text-gray-700 text-2xl">Docs</h1>
            <div className="mx-2 md:mx-20 flex flex-grow items-center p-3 bg-gray-200 text-gray-600 rounded focus-within:shadow focus-within:text-gray-700">
                <Icon className="text-gray-600">search</Icon>
                <input type="text" placeholder="Search" className="flex-grow px-5 bg-transparent text-base outline-none" />
            </div>
            <div className="flex justify-center">
                <IconButton
                    className="hidden md:inline-flex border-0"
                >
                    <Icon>apps</Icon>
                </IconButton>
                <img
                    onClick={signOut}
                    loading="lazy"
                    className="cursor-pointer h-10 w-10 rounded-full"
                    src={session?.user?.image}
                    alt=""
                />
            </div>
        </header>
    )
}

export default Header