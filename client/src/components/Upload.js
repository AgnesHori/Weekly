import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { validateImage } from "image-validator";
import FileDrop from './FileDrop'



export const Upload=({userId,categ})=> {
  const {register, handleSubmit,formState: { errors },reset} = useForm();
  const [recipeCateg,setRecipeCateg]=useState(0)
  const [successful,setSuccessFul]=useState(false)
  const [msg,setMsg] =useState('')
  const [selFile,setSelFile] = useState({})

  console.log(userId,categ)
  
  const onSubmit = (data) =>{
    if(selFile.length>0)
        verify(data,selFile[0])
  } 

  const verify=async (data,file)=>{
    console.log('verify:',file)
    const isValidImage = await validateImage(file);
    isValidImage && sendData('/recipes',data) //amikor megvan a válasz csak akkor menjen a kérés a serverre
  }
  
  const sendData=async (url, fdata) =>{
    const formData=new FormData()
    formData.append('image_url',selFile[0]) // az Upload oldalon kitöltött adatok a user által
    formData.append('title',fdata.title)
    formData.append('user_id',fdata.user_id)
    formData.append('categ_occ_id',fdata.categ_occ_id)
    formData.append('body',fdata.body)
    try {
      const resp=await axios.post(url,formData) //küldjük az adatokat a formból a szerverre
      const data=await resp.data // megérkezik a válasz a serverről
      console.log(data)
      setMsg(data.message)
      resp.status===200 ? setSuccessFul(true):setSuccessFul(false)
    }catch(e){
      setSuccessFul(false)
      setMsg(`Fájlfeltöltési hiba: ${e.message}`)
    }
  }
console.log('selFile=',selFile)
console.log('A fájl mérete:',selFile.length>0 ? selFile[0].sizeReadable : 0)

  return (
    <div className="row justify-content-center mx-auto w-75 upload" >
  
            <img src="https://i.ibb.co/P4gbvWT/Upload.jpg" alt="upload" className="header-img border p-0 rounded-3" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex align-items-center justify-content-between">

                    <div className="files">
                          <FileDrop setSelFile={setSelFile} setMsg={setMsg}/>
                    </div>

                    <input type="text" className="form-control m-2 recipeTitle" placeholder="Cím"
                        {...register("title",{required:true})} />
                     <div className="err">{errors.title && <span>Cím megadása kötelező!</span>}</div>

                    <input type="text"  {...register("user_id")} hidden value={userId} />
                    
                    <input disabled={recipeCateg==0 } type="submit" className="btn btn-dark m-2" value="Publikálás" />
                </div>
                <div className="row">
                  <div className="col-md-6">
                      <select  className="form-select m-2" {...register("categ_occ_id")} onChange={(e)=>setRecipeCateg(e.target.value)}>
                        <option value="0">Válassz kategóriát!</option>
                        {categ.map(obj=>(<option value={obj.categ_occ_id} key={obj.categ_occ_id}>{obj.occasion}</option>))}
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
