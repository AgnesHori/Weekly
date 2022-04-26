import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'


export const Upload=({userId,categ})=> {
  const {register, handleSubmit,formState: { errors },reset} = useForm();
  const [recipeCateg,setRecipeCateg] = useState(0)
  const [successful,setSuccessful] = useState(false)
  const [msg,setMsg]= useState('')

  console.log(userId,categ)

  const onSubmit = (data) =>{
    console.log('cliens oldal',data);
    let url='http://localhost:5000/recipes/'
    sendData(url,data)
    reset()
  } 
  const sendData=async (url, fdata) =>{
    const formData=new FormData()
    formData.append('image_url',fdata.image_url[0]) // az Upload oldalon kitöltött adatok a user által
    formData.append('title',fdata.title)
    formData.append('user_id',fdata.user_id)
    formData.append('categ_occ_id',fdata.categ_occ_id)
    formData.append('body',fdata.body)
    const resp=await axios.post(url,formData) //küldjük az adatokat a formból a szerverre
    const data=await resp.data // megérkezik a válasz a serverről
    console.log(data)
    setMsg(data.message)
    resp.status===200 ? setSuccessful(true) : setSuccessful(false)
  }

  return (
    <div className="upload row justify-content-center mx-auto w-75" >
  
            <img src="https://i.ibb.co/P4gbvWT/Upload.jpg" alt="upload" className="border p-0 rounded-3" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex align-items-center">

                    <label htmlFor="file"><i className="fa-solid fa-circle-plus fa-2xl" role="button"></i></label>
                    <input type="file" className="form-control" {...register("image_url",{required:true})}/>
                    <div className="err">{errors.image_url && <span>Nincs kiválasztva kép!</span>}</div>

                    <input type="text" className="form-control m-2" placeholder="cím"
                        {...register("title",{required:true})} />
                      <div className="err">{errors.title && <span>Cím megadása kötelező!</span>}</div>

                    <input type="text" {...register("user_id")} hidden value={userId} />
                    
                    <input disabled={recipeCateg==0} type="submit" className="btn btn-dark m-2" value="Publikálás"/>
                </div>
               <div className="row">
                  <div className="col-md-6">
                      <select  className="form-select m-2" {...register("categ_occ_id")} onChange={(e)=>setRecipeCateg(e.target.value)}>
                        <option value="0">Válassz kategóriát!</option>
                        {categ.map(obj=>(<option value={obj.categ_occ_id } key={obj.categ_occ_id}>{obj.occasion}</option>))}
                      </select>
                  </div>
                <div className="col-md-6">{msg}</div>
                        </div>
                <textarea  cols="30" rows="10" className="form-control"
                  {...register("body",{required:true})} placeholder="Ide írd le a receptedet!"></textarea>
                   <div className="err">{errors.body && <span>Recept feltöltése kötelező!</span>}</div>
            </form>
    </div>
  )
}