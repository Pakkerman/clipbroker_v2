"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react"

import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { api } from "~/trpc/react"

import { ScrollArea } from "~/components/ui/scroll-area"
import { Separator } from "~/components/ui/separator"

type ContentProps = { view: "text" | "file" }
export function Content(props: ContentProps) {
  const [animationParent] = useAutoAnimate()
  const { view } = props
  const { data: contentData, isLoading: contentIsLoading } =
    api.content.getAll.useQuery({
      boardId: 0,
    })
  const { data: filesData, isLoading: fileIsLoading } =
    api.file.getAll.useQuery({ boardId: 0 })
  // const { data, isLoading } = api.content.getLatest.useQuery({ boardId: "0" })

  if (contentIsLoading || fileIsLoading) return <p>loading</p>

  return (
    <ScrollArea className="h-[400px] w-[80vw] max-w-[375px] border rounded-md ">
      {view === "text" && (
        <ul ref={animationParent} className="p-4 ">
          {contentData?.map((item) => (
            <li key={item.id} className="text-sm">
              <div className=" flex w-full justify-between items-center ">
                {item.text}
                <DeleteContentButton text={item.text} id={item.id} />
              </div>
              <Separator className="my-2" />
            </li>
          ))}
        </ul>
      )}
      {view === "file" && (
        <ul ref={animationParent} className="p-4 ">
          {filesData?.map((item) => (
            <li key={item.id} className="text-sm ">
              <div className="flex h-12 justify-between items-center w-full border-2 border-red-400">
                <p className="truncate flex-[80%]">{item.name}</p>
                <Badge className="flex-[20%]">PNG</Badge>
                <div className="flex">
                  <Button>download</Button>
                  <Button>delete</Button>
                </div>
              </div>
              <Separator className="my-2" />
            </li>
          ))}
        </ul>
      )}
    </ScrollArea>
  )
}

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Textarea } from "~/components/ui/textarea"
import { ShareBoardDrawer } from "../../ShareBoardDrawer"
import { Menu } from "../../Menu"
import { useState } from "react"
import { UploadButton } from "~/utils/uploadthing"
import { Uploadthing } from "../../uploadthing"
import { Badge } from "~/components/ui/badge"
import { DeleteContentButton } from "../buttons/DeleteContentButton"

const formSchema = z.object({
  text: z.string().min(2, {
    message: "missing input",
  }),
})
type FormSchema = z.infer<typeof formSchema>
