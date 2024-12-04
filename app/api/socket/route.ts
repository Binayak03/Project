import { Server } from 'socket.io'
import { NextApiRequest } from 'next'
import { NextApiResponseServerIO } from '@/types/next'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
      socket.on('join-group', (groupId) => {
        socket.join(groupId)
      })

      socket.on('leave-group', (groupId) => {
        socket.leave(groupId)
      })

      socket.on('send-message', async ({ groupId, content, token }) => {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
          const userId = decoded.userId

          const message = await prisma.message.create({
            data: {
              content,
              userId,
              groupId,
            },
            include: { user: { select: { id: true, name: true } } },
          })

          io.to(groupId).emit('new-message', message)
        } catch (error) {
          console.error('Error sending message:', error)
        }
      })
    })
  }
  res.end()
}

