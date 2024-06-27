import React from 'react'
import { Sidebar } from './Sidebar'
import { SingleRecipe } from './SingleRecipe'
import {useParams} from 'react-router-dom'

export const Single=({categ, setSelCateg, userId})=> {
  const {recipeId,imageId}= useParams()
  return (
    <div className='d-flex'>
     <SingleRecipe recipeId={recipeId} userId={userId} imageId={imageId}/>
     <Sidebar categ={categ} setSelCateg={setSelCateg}/>
    </div>
  )
}