import React, {useEffect, useState} from 'react';
import {connect, useSelector} from "react-redux";
import {Portlet, PortletBody, PortletHeader} from "../partials/content/Portlet";
import ChatUsers from "../Components/chat/ChatUsers";
import Conversation from "../Components/chat/Conversation";
import * as chat from '../store/ducks/chat.duck'
const ChatPage = ({addChats, addRoom, addReceiver, addNewReceiver}) => {
  const { chat, user, socket } = useSelector(
    ({ chat, auth: { user } }) => ({
      chat,
      user,
      socket: chat.socket
    })
  );
  useEffect(() => {
    if (socket) {
      if (chat.room) {
        joinRoom(chat.room)
      }
      getChats(false)
      // socket.on('room-created', (data) => {
      //   if (data.users.filter(u => u._id === user._id).length > 0){
      //     console.log('room-created', data)
      //     addRoom(data._id)
      //     joinRoom(data._id)
      //     getChats(false)
      //   }
      // })
    }
  },[socket, chat.receiver])
  const joinRoom = (roomId) => {
    socket.emit('join-room', {roomId})
    // getChats()
  }
  const getRoom = (receiverId, senderId, newR, callback) => {
    socket.emit('get-room', {receiverId, senderId}, (result) => {
      console.log('get-room-result', result)
      if (newR) {
        console.log('new new new')
        addReceiver(receiverId)
      }
      addRoom(result.roomId)
      joinRoom(result.roomId)
      getChats(newR)
      if (callback) {
        callback(result.roomId)
      }
    })
  }
  const getChats = (newR) => {
    socket.emit('get-chats', {userId: user._id}, (result) => {
      console.log('chats', result)
      if ((result.length === 0 && user.role === '2') || chat.newReceiver) {
        if (!newR && !chat.newReceiver) {
          console.log('new remove')
          addReceiver(null)
        }
      }
      if (result.length > 0) {
        if (!chat.newReceiver) {
          if (!chat.room) {
            addRoom(result[0]._id)
            addReceiver(result[0].users.filter(u => u._id !== user._id)[0]._id)
          }

        } else {

          result.map(rs => {
           const exists = rs.users.filter(u => u._id === chat.newReceiver).length > 0
            if (exists) {
              addRoom(rs._id)
              addReceiver(chat.newReceiver)
              addNewReceiver(null)
            }
          })

        }
        joinRoom(result.map(r => r._id))
      }
      addChats(result)
    })
  }
  return (
    <div className='d-flex justify-content-center'>
      <Portlet className='chat-container'>
        <PortletHeader
          title='Chat'
        />
        <PortletBody className='h-100'>
          <div className="row h-100">
            <div className="col-sm-4 col-2 chat-left-side">
              <ChatUsers />
            </div>
            <div className="col-sm-8 col-10">
              <Conversation socket={socket} getRoom={getRoom}/>
            </div>
          </div>
        </PortletBody>
      </Portlet>
    </div>

  );
};

export default connect(null, chat.actions)(ChatPage);