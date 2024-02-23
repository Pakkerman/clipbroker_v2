import { unstable_noStore as noStore } from "next/cache";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="flex h-dvh flex-col items-center justify-center">
      <h1 className="text-3xl">this is clipbroker_v2</h1>
      <Clipboard />
    </main>
  );
}
