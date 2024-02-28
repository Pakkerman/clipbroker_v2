"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { Button, buttonVariants } from "~/components/ui/button"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "~/components/ui/menubar"

type MenuProps = {
  view: "text" | "file"
  setView: Dispatch<SetStateAction<"text" | "file">>
}
export function Menu(props: MenuProps) {
  const { view, setView } = props

  return (
    <div className="flex w-[80vw] max-w-[500px] p-4 gap-2 justify-center">
      <Button
        className="flex-[50%]"
        variant={view === "text" ? "default" : "outline"}
        onClick={() => setView("text")}
      >
        Text
      </Button>
      <Button
        className="flex-[50%]"
        variant={view === "file" ? "default" : "outline"}
        onClick={() => setView("file")}
      >
        File
      </Button>
    </div>
  )
}
