// IMPORT
import { useState } from "react";
import { Authentication, Farm, Loading } from "../components";

// EXPORT
export default function Main({ clickSoundPlay, height, width }) {
   const [progress, setProgress] = useState(0.5)
   const [isLogin, setLogin] = useState(false)
   let i = 1
   const addProgress = () => {
      setProgress(i)
      if(i < 11) {
         setTimeout(() => {
            i++
            console.log(i)
            addProgress()
         }, 100);
      }
   }
   const loginTrial = () => {
      clickSoundPlay("click")
      setLogin(true)
      setTimeout(() => { addProgress() }, 1000)
      setTimeout(() => { clickSoundPlay("bg") }, 2000)
   }
   return(
      isLogin === false ?
      <Authentication clickSoundPlay={ clickSoundPlay } height={ height } login={ loginTrial } width={ width }/>
      :
      progress < 11 ?
      <Loading percent={ progress * 10 }/>
      :
      <Farm clickSoundPlay={ clickSoundPlay } height={ height } width={ width }/>
   )
}