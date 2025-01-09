import React from 'react'
import axios from 'axios'
import Button from './ui/Button'

const DeleteChatsBtn = () => {

  const deleteChats = () => {

    const response = axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/delete-chats`)
  }
  return (
    <Button
      button={"Delete Chats"}
      handleEvent={deleteChats}
    />
  )
}

export default DeleteChatsBtn