import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { count } from 'console'
import React from 'react'
interface analysisCountProps{
    count:number
    name:string
    icon:React.ReactNode
}
function AnalysisCount({count,name,icon}:analysisCountProps) {
  return (
    <Card>
        <CardHeader><CardTitle>{name}</CardTitle></CardHeader>
        <CardContent>
           <div className='flex gap-4'>
        <span>{icon}</span>
        <span>{count}</span>
           </div>
        </CardContent>
    </Card>
  )
}

export default AnalysisCount