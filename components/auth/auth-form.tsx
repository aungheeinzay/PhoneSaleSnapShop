import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { fromTheme } from "tailwind-merge"
import Provider from "./provider"
import { cn } from "@/lib/utils"
import { IoSettingsOutline } from "react-icons/io5"

type authFormProps={
    children:React.ReactNode
    formTitle:string
    formDescription:string
    actionLabel?:string
    actionHref:string
    showProvider:boolean,
    width?:string
}

function AuthForm({children,formTitle,formDescription,actionLabel,actionHref,showProvider,width}:authFormProps) {
  return (
    <div className={cn("w-4/12 mx-auto ", width && width )}>
        <Card>
  <CardHeader>
    <CardTitle className="flex gap-2 items-center text-2xl">{formTitle} {formTitle==="Setting" && <IoSettingsOutline size={30}/>}</CardTitle>
    <CardDescription>{formDescription}</CardDescription>
    <CardAction ><Link className="underline" href={actionHref}>{actionLabel}</Link></CardAction>
  </CardHeader>
  <CardContent>
    {children}
  </CardContent>
  <CardFooter>
    {showProvider && <Provider/>}
  </CardFooter>
</Card>
    </div>
  )
}

export default AuthForm