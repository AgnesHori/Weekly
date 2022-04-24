import React, { useEffect } from 'react'
import {Home} from './Home'

export const Logout=({setUser})=> {
  useEffect(()=>{
     setUser(false)
  },[])
 
  return (
    <>
    <Home/>
    </>
  )
}
