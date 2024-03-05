"use client"

import * as React from "react"

import { Button } from "~/app/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/app/ui/drawer"

export function ShareBoardDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Share</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Copy this line or scan the QRCode</DrawerTitle>
          <DrawerDescription>Some description</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
