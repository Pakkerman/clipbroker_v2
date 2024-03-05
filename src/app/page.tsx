import { Clipboard } from "./_components/clipboard/Clipboard"

export default async function Home() {
  return (
    <main className="flex h-[100dvh] flex-col items-center justify-center py-4">
      <h1 className="text-3xl">
        Clipbroker{" "}
        <span className="text-sm text-orange-300 opacity-60">v2</span>
      </h1>
      <Clipboard />
    </main>
  )
}
