import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Group {
  id: string
  name: string
}

export default function GroupList() {
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await fetch('/api/groups')
      const data = await res.json()
      setGroups(data)
    }

    fetchGroups()
  }, [])

  return (
    <div className="bg-gray-100 p-4 w-64">
      <h2 className="text-xl font-bold mb-4">Groups</h2>
      <ul className="space-y-2">
        {groups.map((group) => (
          <li key={group.id}>
            <Link href={`/groups/${group.id}`} className="text-blue-500 hover:underline">
              {group.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

