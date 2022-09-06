import React from 'react'
import { IconButton } from '@mui/material'
import { Icon } from '@mui/material'
import { useRouter } from 'next/dist/client/router'

function DocumentRow({ id, fileName, date }) {
    const router = useRouter();

    return (
        <div onClick={() => router.push(`/doc/${id}`)} className="flex items-center justify-between px-1 py-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer">
            <Icon className="text-blue-600 text-3xl">article</Icon>
            <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
            <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>
            <IconButton>
                <Icon>more_vert</Icon>
            </IconButton>
        </div>
    )
}

export default DocumentRow