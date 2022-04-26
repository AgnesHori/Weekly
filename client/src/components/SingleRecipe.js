import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useConfirm } from 'material-ui-confirm';
//import {useConfirm} from 'material-ui-confirm'

export const SingleRecipe=({recipeId,userId})=> {
  const navigate = useNavigate()
  const confirm=useConfirm()
  const [recipe,setRecipe] = useState({})
  const [ingredients, setIngredients] = useState([])
  const [msg,setMsg]=useState('')

  useEffect(()=> {
    fetchRecipe()
    fetchIngredients()
  },[])

  console.log('singlepost:',recipeId,'userId:',userId)

  const url=`http://localhost:5000/recipes/${recipeId}`

  const fetchRecipe = async () => {
    try {
      const resp = await axios.get(url);
      setRecipe(resp.data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchIngredients = async () => {
    try {
      const resp = await axios.get(url);
      setIngredients(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  console.warn(recipe);
  console.log(ingredients);

  const handleDelete=()=>{
    confirm({description:`Biztosan ki szeretnéd törölni a ${recipe.title} című receptet?`})
      .then(()=>{deleteRecipe()})
      .catch(()=>{console.log('Felugró ablak hiba!')})
  }
  
  const deleteRecipe=async ()=>{
    console.log('delete')
    try{
      const resp=await axios.delete(url)
      setRecipe({})
      setIngredients([])
      setMsg('Sikeres törlés!')

    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className="singleRecipe">
      <div className="p-3">
        {recipe.recipes_id && <img src={require('../../../server/public/images/'+recipe.image_url)} alt={recipe.title} />}
        <h3 className="text-center m-2">
          {recipe.title}
          <div className="singlePostEdit text-end">
            <i role="button" className={userId==recipe.user_id ? "fa-solid fa-pen-to-square text-success" : "d-none"}
              onClick={()=>navigate('/editRecipe/'+recipe.recipes_id)}></i>
            <i role="button" className={userId==recipe.user_id? "fa-solid fa-trash-can ms-3 text-danger" : "d-none"}
              onClick={()=>handleDelete()}></i>
          </div>
        </h3>
        <div>{msg}</div>
        <div className="d-flex justify-content-between mb-2 text-secondary">
          <span className="singlePostAuthor">{recipe.user_name}</span>
          <span className="singelPostDate">{recipe.created_at}</span>
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
