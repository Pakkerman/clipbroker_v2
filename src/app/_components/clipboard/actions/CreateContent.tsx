"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "~/components/ui/button"

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
import { api } from "~/trpc/react"

const formSchema = z.object({
  text: z.string().min(2, {
    message: "missing input",
  }),
})
type FormSchema = z.infer<typeof formSchema>

export function CreateContentWizard() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  })
  const { invalidate } = api.useUtils().content
  const { mutate: clearAll } = api.content.deleteAll.useMutation({
    onSuccess: () => {
      void invalidate()
      toast.success("board cleared!")
    },
  })
  const { mutate: create, isLoading } = api.content.create.useMutation({
    onMutate: () => {
      toast.loading("pasting", { id: "creation toast" })
    },
    onSuccess: () => {
      form.setValue("text", "")
      void invalidate()
      toast.success("pasted to board!", { id: "creation toast" })
    },
    // onError: () => { },
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
