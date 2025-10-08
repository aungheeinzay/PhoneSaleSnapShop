"use client"

import { VariantsWithImagesTags } from '@/types/inferType'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '../ui/card'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type ImageSliderProps = {
  variant: VariantsWithImagesTags[]
}

function ImageSlider({ variant }: ImageSliderProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState([0])
  const searchParams = useSearchParams()
  const type = searchParams.get("productType")

  // Flatten and filter images by product type
  const images = variant
    .filter(v => v.productType === type)
    .flatMap(v => v.variantImages)
    .filter(img => !!img.image_url)

  useEffect(() => {
    if (!api) return
    api.on("slidesInView",(e)=>{
        setActiveIndex(e.slidesInView())
    })
  }, [api])

  return (
    <div className='flex  gap-6'>
     <div className='flex flex-col gap-2'>
            {
                images.map((img,i)=>(
                    <div key={i} className={cn('w-[50px] h-[50px] overflow-hidden cursor-pointer border-2 rounded-xl transition-all duration-75',
                        i===activeIndex[0] && 'border-primary opacity-50'
                    )}
                    onClick={()=>{
                        api?.scrollTo(i)
                    }}>
                         <Image src={img.image_url} alt='image' width={50} height={50} className='object-contain'/>
                    </div>
                ))
            }
          </div>
    <Card>
      <CardContent className="flex justify-center">
        
        <Carousel setApi={setApi} opts={{ loop: true }} className="">
          <CarouselContent className=" rounded-2xl border w-[230px] h-[230px] sm:w-[300px] sm:h-[300px]">
            {images.map((img, i) => (
              <CarouselItem key={i}>
                <Image src={img.image_url} alt='image' width={1300} height={1300}/>
              </CarouselItem>
            ))}
          </CarouselContent>
        
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
         
      </CardContent>
    </Card>
    </div>
  )
}

export default ImageSlider
