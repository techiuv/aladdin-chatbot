import React, { useState } from 'react'
import axios from 'axios'

const ChatHistory = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getHistory = async () => {
        setLoading(true)
        try {
            response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/chats`)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>

        </div>
    )
}

export default ChatHistory