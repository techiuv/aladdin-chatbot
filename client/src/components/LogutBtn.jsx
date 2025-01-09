import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';

const LogutBtn = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        navigate('/auth/login')


    }




    return (
        <Button button={"Logout"} handleEvent={handleLogout} />
    )
}

export default LogutBtn