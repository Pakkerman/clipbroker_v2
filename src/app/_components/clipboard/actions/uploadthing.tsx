"use client"

import { toast } from "sonner"
import { api } from "~/trpc/react"
import { UploadButton } from "~/utils/uploadthing"

export function Uploadthing() {
  const { mutate, isLoading } = api.file.create.useMutation({
    onSuccess: () => {
      toast.success("Upload Completed", { id: "upload toast" })
    },
  })

  return (
    <UploadButton
      endpoint="imageUploader"
      onUploadBegin={(filename) =>
        toast.loading(`Uploading: ${filename}`, { id: "upload toast" })
      }
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("uploadres", res)
        for (const item of res) {
          const { key, name, size, url } = item
          mutate({ key, name, size, url })
        }
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        toast.error(`Something went wrong! ${error}`, { id: "upload toast" })
      }}
    />
  )
}
