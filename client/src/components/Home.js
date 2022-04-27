import React,{useEffect, useState} from 'react'
import { Header } from './Header'
import { Recipes } from './Recipes'
import { Sidebar} from './Sidebar'
import axios from 'axios'

export const Home=({categ,recipes,setRecipes})=> {
  
  const [selCateg, setSelCateg]=useState(0)

  useEffect(()=>{
    fetchRecipes()
  },[selCateg])


  const fetchRecipes=async ()=>{
    let url=''
      if(selCateg === 0)
        url='/recipes'
      else
        url='/recipes/categ/' + selCateg

    try{
      const resp=await axios.get(url)
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
       <Recipes recipes={recipes} selCateg={selCateg}/>
       <Sidebar categ={categ} setSelCateg={setSelCateg}/>
     </div>
    </>
  )
}
