"use client"

import { api } from "~/trpc/react"
import { Button } from "~/components/ui/button"
import { toast } from "sonner"

type DeleteContentButton = any
export function DeleteContentButton({ id, text }: DeleteContentButton) {
  const { invalidate } = api.useUtils().content
  const { mutate, isLoading } = api.content.deleteById.useMutation({
    onMutate: () => {
      toast.loading(`deleting`, { id: "delete-content-toast" })
    },
    onSuccess: () => {
      invalidate()
      toast.success(`deleted ${text}`, { id: "delete-content-toast" })
    },
  })

  return (
    <Button size="icon" onClick={() => mutate({ id })}>
      T
    </Button>
  )
}
