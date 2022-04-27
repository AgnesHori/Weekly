import React from 'react'
import { Sidebar } from './Sidebar'
import { SingleRecipe } from './SingleRecipe'
import {useParams} from 'react-router-dom'

<<<<<<< HEAD
export const Single=({categ, setSelCateg, userId})=> {
  const {recipeId,imageId}= useParams()
  return (
    <div className='d-flex'>
     <SingleRecipe recipeId={recipeId} userId={userId} imageId={imageId}/>
     <Sidebar categ={categ} setSelCateg={setSelCateg}/>
=======
export const Single=()=> {
  const params = useParams()
  return (
    <div className='d-flex'>
     <SingleRecipe recipeId={params.recipeId} />
     <Sidebar />
>>>>>>> ee2e32a4afc341dcecdaa90c19fb8ebb1723f5da
    </div>
  )
}