import React,{useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useParams} from 'react-router-dom'

export const EditRecipe=({userId,categ})=> {
  const params=useParams()
  console.log('edit recipe:',params)
  const { register, handleSubmit, formState: { errors },reset } = useForm();
  const [recipeCateg,setrecipeCateg]=useState(0)
  const [successful,setSuccessful]=useState(false)
  const [msg,setMsg]=useState('')
  const [recipe,setRecipe]=useState({})

  useEffect(()=>{
    setrecipeCateg(recipe.categ_occ_id)
  },[recipe])

  useEffect(()=>{
    fetchRecipe()
  },[msg])

  const fetchRecipe = async () => {
    try {
        const resp = await axios.get(`/recipes/${params.recipeId}`);
        console.log('válasz:',resp.data[0])
        setRecipe(resp.data[0])
    } catch (err) {
        console.error(err);
    }
  };

  const onSubmit = (data) => {
   console.log('adatok-cliens oldalon:',data);
   const url=`/recipes/${params.recipeId}`
    sendData(url,data)
    reset()
  
}

const sendData=async (url,formdata)=>{
  const formData=new FormData()
  formData.append('title',formdata.title)
  formData.append('categ_occ_id',recipeCateg)
  formData.append('body',formdata.body)
  const resp=await axios.put(url,formData)
  const data=await resp.data
  resp.status===200 ? setSuccessful(true):setSuccessful(false)
  setMsg(data.message)
}

console.log('editrecipe',recipe)
console.log('recipecateg=',recipeCateg)
  return (
    <div className="row justify-content-center mx-auto w-75 write" >
           {recipe.image_url && <img src={recipe.image_url}  alt="" className="  border p-0 rounded-3" />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex align-items-center">
                    <input type="text" className="form-control m-2" placeholder="cím" 
                      {...register("title", {required: true})} defaultValue={recipe.title}/>
                    <div className="err">{errors.title && <span>A cím megadása kötelező!</span>}</div>
                    <input disabled={recipeCateg==0}  className="btn btn-dark" type="submit" value="Mentés"/>
                </div>
                <div className="row">
                  <div className="col-md-6">
                  <select className="form-select m-2" {...register("categ_occ_id")} onChange={(e)=>setrecipeCateg(e.target.value)} value={recipeCateg}>
                      <option value="0">Válassz kategóriát!</option>
                      {categ.map(obj=>(<option value={obj.categ_occ_id} key={obj.categ_occ_id}>{obj.occasion}</option>))}
                  </select>
                  </div>
                   <div className={successful? "col-md-6 text-success":"col-md-6 text-danger"}>{msg}</div>
                </div>        
                <textarea name="" id="body" cols="30" rows="10" className="form-control" defaultValue={recipe.body}
                  {...register("body", {required: true})} placeholder="Ide írd le a receptedet!" ></textarea>  
                   <div className="err">{errors.body && <span>Recept feltöltése kötelező!</span>}</div>
            </form>
           
    </div>
  )
}