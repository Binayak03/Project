import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Header from '../../components/Header'
import GroupList from '../../components/GroupList'
import ChatWindow from '../../components/ChatWindow'

export default function GroupChat() {
  const router = useRouter()
  const { id } = router.query
  const { data: session } = useSession()

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <GroupList />
        <main className="flex-1">
          <ChatWindow groupId={id as string} />
        </main>
      </div>
    </div>
  )
}

