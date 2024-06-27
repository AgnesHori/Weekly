import React,{useEffect, useState} from 'react'
import { Header } from './Header'
import { Recipes } from './Recipes'
import { Sidebar} from './Sidebar'
import axios from 'axios'

export const Myrecipes=({categ,userId})=> {
  const [recipes,setRecipes]=useState([])
  const [selCateg, setSelCateg]=useState(0)

  useEffect(()=>{
    fetchRecipes()
  },[selCateg])

  console.log('userid',userId)

  const fetchRecipes=async ()=>{

    let url=''
      if(selCateg === 0)
        url=`/recipes/user/${userId}`
      else
        url=`/recipes/user/${userId}/categ/` + selCateg
    try {
      const resp=await axios.get(url)
      setRecipes(resp.data)
      console.log(url)
    } catch(err){
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
