import React, { useEffect } from 'react'
import {Home} from './Home'

export const Logout=({setUser,categ,setUserName,setUserId,recipes,setRecipes,setAdmin})=> {
  
  useEffect(()=>{
     setUser(false)
     setUserName('')
     setUserId(0)
     setAdmin(false)
     localStorage.removeItem('user')
     localStorage.removeItem('userName')
     localStorage.removeItem('userId')
     localStorage.removeItem('admin')

  },[])
 
  return (
    <>
    <Home categ={categ} recipes={recipes} setRecipes={setRecipes}/>
    </>
  )
}
