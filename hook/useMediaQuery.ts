import { useState,useEffect } from "react";

export default function UseMediaQuery(query:string){
    const[match,setMatch] = useState(false)
    useEffect(()=>{
        const mediaQuery = window.matchMedia(query);
        const windowChangeHandler = ()=>setMatch(mediaQuery.matches)
        setMatch(mediaQuery.matches)
        mediaQuery.addEventListener('change',windowChangeHandler)
        return ()=> mediaQuery.removeEventListener('change',windowChangeHandler)
    },[query])
    return match;
}


