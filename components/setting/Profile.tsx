'use client'

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Session } from "next-auth"
import { LiaUserEditSolid } from "react-icons/lia"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UseMediaQuery from "@/hook/useMediaQuery"
import { Button } from "../ui/button"
import ProfileForm from "./ProfileForm"
import { useState } from "react"
import UploadAvator from "./uploadAvator"

interface ProfileProps {
  session: Session
}

function Profile({ session }: ProfileProps) {
  const ismobile = UseMediaQuery("(max-width:768px)")
  const [isOpen, setIsOpen] = useState(false)
  const { name = "", email = "", image } = session.user ?? {}

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        {ismobile ? (
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger className="absolute right-10" asChild>
              <LiaUserEditSolid size={23} />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Change username</DrawerTitle>
              </DrawerHeader>
              <ProfileForm
                username={name!}
                email={email!}
                setIsOpen={setIsOpen}
              />
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild className="cursor-pointer">
              <CardAction>
                <LiaUserEditSolid size={23} />
              </CardAction>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
              </DialogHeader>
              <ProfileForm
                username={name!}
                email={email!}
                setIsOpen={setIsOpen}
              />
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-3 py-2 px-1 gap-3 sm:gap-1">
          <UploadAvator image={image} name={name!} email={email!} />
          <div className="col-span-2 w-full h-full py-5 px-2">
            <p className="text-lg font-bold text-gray-500 md:text-md">{email}</p>
            <p className="text-md font-medium text-gray-400 md:text-sm">{name}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Profile
