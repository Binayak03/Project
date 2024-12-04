import { useSession } from 'next-auth/react'
import Header from '../components/Header'
import GroupList from '../components/GroupList'

export default function Dashboard() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <GroupList />
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name}!</h1>
          <p>Select a group to start chatting.</p>
        </main>
      </div>
    </div>
  )
}

