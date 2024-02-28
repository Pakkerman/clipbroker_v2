"use client"

import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { api } from "~/trpc/react"

export function Clipboard() {
  return (
    <div className="h-full border-[0.5px] border-white-90 rounded-xl w-full flex flex-col items-center justify-center">
      <Content />
      <CreateContentWizard />
      <ShareBoardDrawer />
    </div>
  )
}

import { ScrollArea } from "~/components/ui/scroll-area"
import { Separator } from "~/components/ui/separator"

function Content() {
  const { data, isLoading } = api.content.getAll.useQuery({ boardId: 0 })
  // const { data, isLoading } = api.content.getLatest.useQuery({ boardId: "0" })

  console.log(data)

  if (isLoading) return <p>loading</p>

  return (
    <ScrollArea className="h-40 w-48 rounded-md border">
      <div className="p-4">
        {data &&
          data.map((item) => (
            <>
              <div key={item.id} className="text-sm">
                {item.text}
              </div>
              <Separator className="my-2" />
            </>
          ))}
      </div>
    </ScrollArea>
  )
}

function CreateContentWizard() {
  return (
    <div>
      <ContentForm />
    </div>
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
import { ShareBoardDrawer } from "./ShareBoardDrawer"

const formSchema = z.object({
  text: z.string().min(2, {
    message: "missing input",
  }),
})
type FormSchema = z.infer<typeof formSchema>

export function ContentForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  })
  const utils = api.useUtils()
  const { mutate: clearAll } = api.content.deleteAll.useMutation({
    onSuccess: () => {
      utils.content.getAll.invalidate()
      toast.success("board cleared!")
    },
  })
  const { mutate: create, isLoading } = api.content.create.useMutation({
    onMutate: () => {
      toast.loading("pasting", { id: "creation toast" })
    },
    onSuccess: () => {
      form.setValue("text", "")
      utils.content.getAll.invalidate()
      toast.success("pasted to board!", { id: "creation toast" })
    },
    onError: () => {},
  })

  const onSubmit: SubmitHandler<FormSchema> = ({ text }) => {
    create({ text })
  }

  const handleClear = () => {
    clearAll({ boardId: 0 })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paste to clipboard</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="type something" />
                {/* <Input placeholder="shadcn" {...field} /> */}
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 w-full ">
          <Button variant="outline" className="flex-[50%]" type="submit">
            Submit
          </Button>
          <Button
            className="flex-[50%] bg-opacity-0"
            type="button"
            onClick={handleClear}
            variant="destructive"
          >
            Clear
          </Button>
        </div>
      </form>
    </Form>
  )
}
