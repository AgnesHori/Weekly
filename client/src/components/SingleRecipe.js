import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useConfirm } from 'material-ui-confirm';


export const SingleRecipe=({recipeId,userId,imageId})=> {
  const navigate = useNavigate()
  const confirm=useConfirm()
  const [recipe,setRecipe] = useState({})
  const [msg,setMsg]=useState('')
  const [ingredients,setIngredients]=useState([])

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
      const resp = await axios.get(`/recipes/ingredients/${recipeId}`);
      console.log(url);
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

    }catch(err){
      console.log(err)
    }
  }
 console.log('serverről',ingredients)
  return (
    <div className="singleRecipe">
      <div className="p-3">
        {recipe.recipes_id && <img src={recipe.image_url} alt={recipe.title} />}
        <h3 className="text-center m-2">
          {recipe.title}
          <div className="singleRecipeEdit text-end">
            <i role="button" className={parseInt(userId)===parseInt(recipe.user_id) ? "fa-solid fa-pen-to-square text-success" : "d-none"}
              onClick={()=>navigate('/editRecipe/'+recipe.recipes_id)}></i>
            <i role="button" className={parseInt(userId)===parseInt(recipe.user_id) ? "fa-solid fa-trash-can ms-3 text-danger" : "d-none"}
              onClick={()=>handleDelete()}></i>
          </div>
        </h3>
        <div>{msg}</div>
        <div className="d-flex justify-content-between mb-2 text-secondary">
          <span className="singleRecipeAuthor">{recipe.user_name}</span>
          <span className="singelRecipeDate">{recipe.created_at}</span>
        </div>
        <h5 className={ingredients.length>0 ? "hozzavalo" : "d-none"}>Hozzávalók:</h5>
          {ingredients.map((obj, index)=><p key={index}><span className="ingredients">{obj.ingredient}</span> {obj.amount} {obj.measurement}</p>)}
        <p className="mt-1 recipeDescriptionSingle">{recipe.body}</p>
      </div>
    </div>
  );
};
