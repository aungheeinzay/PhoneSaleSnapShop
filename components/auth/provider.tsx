'use client'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

function Provider() {
  return (
    <div className="w-full grid gap-4">
        <Button className="w-full " variant={'outline'}
        onClick={()=>signIn('google',{
            callbackUrl:'/'
        })}
        >login with google <FcGoogle/></Button>
        <Button className="w-full" variant={'outline'}
        onClick={()=>signIn('github',{
          callbackUrl:'/'
        })}>login with github <FaGithub/></Button>
    </div>
  )
}

export default Provider