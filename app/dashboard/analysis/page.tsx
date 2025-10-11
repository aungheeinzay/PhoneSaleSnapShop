import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { analysis, weaklyAnalysis } from '@/server/actions/analysis'
import React from 'react'
import AnalysisCount from './AnalysisCount'
import { BookOpenCheck, ClockFading, Package, Users } from 'lucide-react'
import AnalysisChart from './AnalysisChart'

async function Analysis() {
    const counts = await analysis()
    const analysisWeak = await weaklyAnalysis()
    
  return (
   <section className='w-10/12 mx-auto grid gap-2'>
     <Card>
        <CardHeader>
            <CardTitle>Analysis the data of our shop</CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
            <AnalysisCount count={counts.allProducts} name={"products"} icon={<Package/>}/>
            <AnalysisCount count={counts.customers} name={"customer"} icon={<Users/>}/>
             <AnalysisCount count={counts.pendingOrders} name={"pending order"} icon={<ClockFading/>}/>
            <AnalysisCount count={counts.completedOrders} name={"completed order"} icon={<BookOpenCheck/>}/>
        </CardContent>
    </Card>
    <Card>
        <CardHeader>
            <CardTitle>Here is the order Chart for week</CardTitle>
        </CardHeader>
        <CardContent>
         <AnalysisChart data={analysisWeak!}/>
        </CardContent>
    </Card>
   </section>
  )
}

export default Analysis