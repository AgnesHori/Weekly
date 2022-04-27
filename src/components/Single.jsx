import React from 'react'
import { Sidebar } from './Sidebar'
import { SingleRecipe } from './SingleRecipe'
import {useParams} from 'react-router-dom'

export const Single=({categ, setSelCateg, userId})=> {
  const params = useParams()
  return (
    <div className='d-flex'>
     <SingleRecipe recipeId={params.recipeId} userId={userId}/>
     <Sidebar categ={categ} setSelCateg={setSelCateg}/>
    </div>
  )
}