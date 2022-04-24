import React,{useEffect, useState} from 'react'
import { Header } from './Header'
import { Recipes } from "./Recipes"
import { Sidebar} from './Sidebar'
import axios from 'axios'

export const Home=()=> {
  const [recipes,setRecipes]=useState([])
  useEffect(()=>{
    fetchRecipes()
  },[])

  const fetchRecipes=async ()=>{
    try{
      const resp=await axios.get(('http://localhost:5000/recipes'))
      setRecipes(resp.data)
    }catch(err){
      console.log(err)
    }
  }

  console.log(recipes)

  return (
    <>
     <Header />
     <div className="row">
       <Recipes recipes={recipes}/>
       <Sidebar />
     </div>
    </>
  )
}
