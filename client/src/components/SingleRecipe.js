import React, {useState,useEffect} from 'react'
import axios from 'axios'
<<<<<<< HEAD
import {useNavigate} from 'react-router-dom'
import { useConfirm } from 'material-ui-confirm';
//import {useConfirm} from 'material-ui-confirm'

export const SingleRecipe=({recipeId,userId,imageId})=> {
  const navigate = useNavigate()
  const confirm=useConfirm()
  const [recipe,setRecipe] = useState({})
  const [ingredients, setIngredients] = useState([])
  const [msg,setMsg]=useState('')

  useEffect(()=> {
    fetchRecipe()
    fetchIngredients()
  },[recipeId])

  console.log('singlepost:',recipeId,'userId:',userId)

  const url=`/recipes/${recipeId}`

  const fetchRecipe = async () => {
    try {
      const resp = await axios.get(url);
      console.warn(resp);
      setRecipe(resp.data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchIngredients = async () => {
    try {
      const resp = await axios.get(url);
      console.warn(resp);
      setIngredients(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  //console.warn(recipe);
  //console.log(ingredients);

  const handleDelete=()=>{
    confirm({description:`Biztosan ki szeretnéd törölni a ${recipe.title} című receptet?`})
      .then(()=>{deleteRecipe()})
      .catch(()=>{console.log('Felugró ablak hiba!')})
  }
  
  const deleteRecipe=async ()=>{
    console.log('delete')
    try{
      const resp=await axios.delete(`/recipes/${recipeId}/${imageId}`)
      setRecipe({})
      setIngredients([])
      setMsg('Sikeres törlés!')

=======

export  const SingleRecipe=({recipeId})=> {
  const [recipe,setRecipe]=useState([])

  useEffect(()=>{
    fetchRecipe()
  },[])

  const fetchRecipe=async ()=>{
    try{
      const resp=await axios.get((`http://localhost:5000/recipes/${recipeId}`))
      setRecipe(resp.data[0])
>>>>>>> ee2e32a4afc341dcecdaa90c19fb8ebb1723f5da
    }catch(err){
      console.log(err)
    }
  }

<<<<<<< HEAD

  return (
    <div className="singleRecipe">
      <div className="p-3">
        {recipe.recipes_id && <img src={recipe.image_url} alt={recipe.title} />}
        <h3 className="text-center m-2">
          {recipe.title}
          <div className="singleRecipeEdit text-end">
            <i role="button" className={userId==recipe.user_id ? "fa-solid fa-pen-to-square text-success" : "d-none"}
              onClick={()=>navigate('/editRecipe/'+recipe.recipes_id)}></i>
            <i role="button" className={userId==recipe.user_id? "fa-solid fa-trash-can ms-3 text-danger" : "d-none"}
              onClick={()=>handleDelete()}></i>
          </div>
        </h3>
        <div>{msg}</div>
        <div className="d-flex justify-content-between mb-2 text-secondary">
          <span className="singleRecipeAuthor">{recipe.user_name}</span>
          <span className="singelRecipeDate">{recipe.created_at}</span>
        </div>
        <h5 className={ingredients.length>0 ? "hozzavalo" : "d-none"}>Hozzávalók:</h5>
          {ingredients.map((obj, index)=>
              <p key={index}><span className="ingredients">{obj.ingredient}</span> {obj.amount} {obj.measurement}</p>
          )}
        <p className="mt-1 recipeDescriptionSingle">{recipe.body}</p>
      </div>
    </div>
  );
};
=======
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
>>>>>>> ee2e32a4afc341dcecdaa90c19fb8ebb1723f5da
