"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
type tagFilterProps={
    tags:string[]
}
const TagFilter = ({tags}:tagFilterProps) => {
    const router = useRouter()
    const searchParams=useSearchParams()
    const tagParam = searchParams.get("tag")

    const handleTagClick = (tag:string)=>{
        if(tagParam===tag){
            router.push("/")
        }else{
            router.push(`?tag=${tag}`)
        }
  
    }
    return (
        <div className='flex gap-2 w-full overflow-x-scroll'>
            {
                tags.map((tag,i )=>(
                    <Button className='cursor-pointer' variant={tag===tagParam ? "default" : "outline"} key={i}
                    onClick={()=>handleTagClick(tag)}>{tag}</Button>
                ))
            }
        </div>
    );
}

export default TagFilter;
