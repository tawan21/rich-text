import React from 'react'
import { Button } from '@material-tailwind/react'
import { Icon } from '@mui/material'
import { signIn } from 'next-auth/client'

function Login() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <Icon className="text-blue-600 text-9xl">description</Icon>
            <Button
                variant="outlined"
                size="sm"
                color="green"
                onClick={signIn}
            >
                Login
            </Button>
        </div>
    )
}

export default Login