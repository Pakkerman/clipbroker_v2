"use client"

import { useState } from "react"
import { Content } from "./content/Content"
import { Menu } from "../Menu"
import { ShareBoardDrawer } from "../ShareBoardDrawer"
import { CreateContentWizard } from "./actions/CreateContent"
import { Uploadthing } from "../uploadthing"

export function Clipboard() {
  const [view, setView] = useState<"text" | "file">("text")

  return (
    <div className="h-full border-[0.5px] border-white-90 rounded-xl w-full flex flex-col items-center justify-center">
      <Content view={view} />
      <Menu view={view} setView={setView} />
      {view === "text" && <CreateContentWizard />}
      {view === "file" && <Uploadthing />}
      <ShareBoardDrawer />
    </div>
  )
}
