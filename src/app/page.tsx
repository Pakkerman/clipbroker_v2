import { unstable_noStore as noStore } from "next/cache"

import { api } from "~/trpc/server"

import { Clipboard } from "./_components/clipboard"

export default async function Home() {
  noStore()
  const hello = await api.post.hello.query({ text: "from tRPC" })

  return (
    <main className="flex h-dvh flex-col items-center justify-center py-4">
      <h1 className="text-3xl">
        Clipbroker{" "}
        <span className="text-sm text-orange-300 opacity-60">v2</span>
      </h1>
      <Clipboard />
    </main>
  )
}
