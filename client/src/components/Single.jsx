import React from 'react'
import { Sidebar } from './Sidebar'
import { SingleRecipe } from './SingleRecipe'
import {useParams} from 'react-router-dom'

export const Single=()=> {
  const params = useParams()
  return (
    <div className='d-flex'>
     <SingleRecipe recipeId={params.recipeId} />
     <Sidebar />
    </div>
  )
}