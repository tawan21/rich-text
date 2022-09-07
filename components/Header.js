import React from 'react'
import Icon from '@mui/material/Icon';
import { useSession, signOut } from 'next-auth/client'

function Header() {
    const [session] = useSession();

    return (
        <header className="sticky top-0 z-50 flex items-center p-3 shadow-md bg-white justify-between">
            <div className="flex justify-center items-center">
                <Icon className="text-blue-600 hidden text-5xl md:inline-flex">description</Icon>
                <h1 className="ml-2 text-gray-700 text-2xl font-bold">T-Docs</h1>
            </div>
            <div className="flex justify-center items-center">
                <h1 className="hidden md:inline-flex text-gray-600 mr-2">{session.user.email}</h1>
                <img
                    onClick={signOut}
                    loading="lazy"
                    className="cursor-pointer h-10 w-10 rounded-full"
                    src={session?.user?.image}
                    alt="avatar"
                />
            </div>
        </header>
    )
}

export default Header