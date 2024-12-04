import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const groups = await prisma.group.findMany({
    include: { users: { select: { id: true, name: true } } },
  })

  return NextResponse.json(groups)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, userIds } = await req.json()

  const group = await prisma.group.create({
    data: {
      name,
      users: { connect: userIds.map((id: string) => ({ id })) },
    },
  })

  return NextResponse.json(group)
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { groupId } = await req.json()

  await prisma.group.delete({ where: { id: groupId } })

  return NextResponse.json({ message: 'Group deleted successfully' })
}

