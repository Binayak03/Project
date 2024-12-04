import Header from './components/Header'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to TeamSync</h1>
        <p className="text-xl">Collaborate with your team in real-time!</p>
      </main>
    </div>
  )
}

