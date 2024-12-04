import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import io from 'socket.io-client'

interface Message {
  id: string
  content: string
  createdAt: string
  user: {
    id: string
    name: string
  }
}

interface ChatWindowProps {
  groupId: string
}

export default function ChatWindow({ groupId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const { data: session } = useSession()
  const socketRef = useRef<any>()

  useEffect(() => {
    socketRef.current = io()

    socketRef.current.emit('join-group', groupId)

    socketRef.current.on('new-message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      socketRef.current.emit('leave-group', groupId)
      socketRef.current.disconnect()
    }
  }, [groupId])

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/chat/${groupId}`)
      const data = await res.json()
      setMessages(data)
    }

    fetchMessages()
  }, [groupId])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && session) {
      socketRef.current.emit('send-message', {
        groupId,
        content: newMessage,
        token: session.user.token,
      })
      setNewMessage('')
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start">
            <div className="bg-gray-200 rounded-lg p-2">
              <p className="font-bold">{message.user.name}</p>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-4 border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Type a message..."
        />
      </form>
    </div>
  )
}

