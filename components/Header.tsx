import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          TeamSync
        </Link>
        <nav>
          {session ? (
            <>
              <Link href="/dashboard" className="mr-4">
                Dashboard
              </Link>
              <button onClick={() => signOut()} className="bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-blue-500 px-4 py-2 rounded">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

