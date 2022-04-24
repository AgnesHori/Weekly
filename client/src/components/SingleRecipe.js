import React, {useState,useEffect} from 'react'
import axios from 'axios'

export  const SingleRecipe=({recipeId})=> {
  const [recipe,setRecipe]=useState([])

  useEffect(()=>{
    fetchRecipe()
  },[])

  const fetchRecipe=async ()=>{
    try{
      const resp=await axios.get((`http://localhost:5000/recipes/${recipeId}`))
      setRecipe(resp.data[0])
    }catch(err){
      console.log(err)
    }
  }

  console.log(recipe)

  return (
    <div className='singleRecipe'>
      <div className="p-3">
<img src={recipe.image_url} alt={recipe.title} />
<h3 className="text-center m-2">
{recipe.id}
<div className="singlePostEdit text-end">
<i role="button" className="fa-solid fa-pen-to-square text-success"></i>
<i role="button" className="fa-solid fa-trash-can ms-3 text-danger"></i>
</div>
</h3>
<div className="d-flex justify-content-between mb-2 text-secondary">
<span className="singlePostAuthor">{recipe.user_name}</span>
<span className="singelPostDate">Új bejegyzés</span>
</div>
<h5 className="hozzavalo">Hozzávalók:</h5>
        <p>4-5 szál sárgarépa 1 szál petrezselyem gyökér 1/4 fej saláta</p>
        <p className="mt-1 recipeDescription">{recipe.body}</p>
</div>
    </div>
  )
}
