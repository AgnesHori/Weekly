import React,{useEffect, useState} from 'react'
import { Header } from './Header'
import { Recipes } from './Recipes'
import { Sidebar} from './Sidebar'
import axios from 'axios'
import { Slider } from './Slider'

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
  console.log("home.js->recipes", recipes)
  return (
    <>
     <Header />
     <div className="row">     
        <div className="col-12">
          <div className="slider-container">
            <Slider recipes={recipes}/>
          </div> 
          <div className="col-12">
            <Sidebar categ={categ} setSelCateg={setSelCateg}/>   
            <Recipes recipes={recipes} selCateg={selCateg}/>
          </div>          
        </div>
     </div>
    </>
  )
}
