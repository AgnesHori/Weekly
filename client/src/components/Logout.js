import React, { useEffect } from 'react'
import {Home} from './Home'

<<<<<<< HEAD
export const Logout=({setUser,categ,setUserName,setUserId,recipes,setRecipes})=> {
  
  useEffect(()=>{
     setUser(false)
     setUserName('')
     setUserId(0)
     localStorage.removeItem('user')
     localStorage.removeItem('userName')
     localStorage.removeItem('userId')
=======
export const Logout=({setUser})=> {
  useEffect(()=>{
     setUser(false)
>>>>>>> ee2e32a4afc341dcecdaa90c19fb8ebb1723f5da
  },[])
 
  return (
    <>
<<<<<<< HEAD
    <Home categ={categ} recipes={recipes} setRecipes={setRecipes}/>
=======
    <Home/>
>>>>>>> ee2e32a4afc341dcecdaa90c19fb8ebb1723f5da
    </>
  )
}
