import React,{useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { validateImage } from "image-validator";
import FileDrop from './FileDrop'




export const Upload=({userId,categ})=> {
  const {register, handleSubmit,formState: { errors },reset}=useForm();
  const [recipeCateg,setRecipeCateg]=useState(0)
  const [successful,setSuccessFul]=useState(false)
  const [msg,setMsg]=useState('')
  const [selFile,setSelFile]=useState({})

  const [allIngredients,setAllIngredients]=useState([])
  const [amount,setAmount]=useState('')
  const [inglist,setInglist]=useState([])
  const [ing,setIng]=useState('')
  const [ingName,setIngName]=useState('')

  console.log(userId,categ)
  
  useEffect(()=>{
    fetchAllIngredients()
  },[])


  const fetchAllIngredients = async () => {
    try {
      const resp = await axios.get('/ingredients');
      console.log(typeof(resp.data))
      setAllIngredients(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  console.log('Összes hozzávaló',allIngredients)

  const onSubmit = (data) =>{
    if(selFile.length>0)
        verify(data,selFile[0])
  } 

  const verify=async (data,file)=>{
    console.log('verify:',file)
    const isValidImage = await validateImage(file);
    isValidImage && sendData('/recipes',data)            //amikor megvan a válasz csak akkor menjen a kérés a serverre
  }
  
  const sendData=async (url, fdata) =>{
    const formData=new FormData()
    formData.append('image_url',selFile[0])                // az Upload oldalon kitöltött adatok a user által
    formData.append('title',fdata.title)
    formData.append('user_id',fdata.user_id)
    formData.append('categ_occ_id',fdata.categ_occ_id)
    formData.append('body',fdata.body)
    formData.append('inglist',JSON.stringify(inglist))

    try {
      const resp=await axios.post(url,formData)                       //küldjük az adatokat a formból a szerverre
      const data=await resp.data                                      // megérkezik a válasz a serverről
      console.log(data)
      setMsg(data.message)
      resp.status===200 ? setSuccessFul(true):setSuccessFul(false)
    }catch(e){
      setSuccessFul(false)
      setMsg(`Fájlfeltöltési hiba: ${e.message}`)
    }
  }

  const handleChange=(id)=>{
    let arr=allIngredients.filter(obj=>obj.ingr_id==id)
    setIngName(arr[0].ingredient + ' ' + arr[0].measurement)
    setIng(id)
  }

  const addIng=()=>{
    let obj={}
    obj.ing=ing
    obj.amount=amount
    obj.name=ingName
    setInglist([...inglist,obj])
  }

  const handleDeleteIng=(id)=>{
    let newArr=inglist.filter(obj=>obj.ing!=id)
    setInglist(newArr)
  }




  console.log(inglist)
  console.log('selFile=',selFile)
  console.log('A fájl mérete:',selFile.length>0 ? selFile[0].sizeReadable : 0)


  return (
    <div className="row justify-content-center mx-auto w-75 upload" >
  
            <img src="https://i.ibb.co/P4gbvWT/Upload.jpg" alt="upload" className="header-img border p-0 rounded-3" />

            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-column align-items-center m-3">
                  <h5>Új recept feltöltése</h5>
                  </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="files">
                          <FileDrop setSelFile={setSelFile} setMsg={setMsg}/>
                    </div>
                    <input type="text" className="form-control m-2 recipeTitle" placeholder="Cím" {...register("title",{required:true})} />
                     <div className="err">{errors.title && <span>Cím megadása kötelező!</span>}</div>

                    <input type="text"  {...register("user_id")} hidden value={userId} />
                    
                    <input disabled={recipeCateg===0 } type="submit" className="btn btn-dark m-2" value="Publikálás" />
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
                <div className="ingredientsList col-md-6">
                    <select  className="form-select m-2" onChange={(e)=>handleChange(e.target.value)}>
                        <option value="0">Válassz hozzávalót!</option>
                        {allIngredients.map(obj=>(<option value={obj.ingr_id} key={obj.ingr_id}>{obj.ingredient} ({obj.measurement})</option>))}
                    </select>
                    <input className="form-control m-2" type="text" name="amount" placeholder="Mennyiség" onChange={(e)=>setAmount(e.target.value)} value={amount}/>
                    <i role="button" className="fa-solid fa-square-plus text-dark fa-xl" onClick={()=>addIng()} disabled={!ing}></i>
                </div>
                <div className='d-flex w-100'>
                  <ul>
                    {inglist.map(obj=>
                      <li key={obj.ing}>{obj.name}: {obj.amount}<i id={obj.ing} className="fa-solid fa-trash-can ms-3 text-danger" onClick={(e)=>handleDeleteIng(e.target.id)}></i></li>
                      )}
                  </ul>
                </div>
                <textarea  cols="30" rows="10" className="form-control"
                  {...register("body",{required:true})} placeholder="Ide írd le a receptedet!"></textarea>
                   <div className="err">{errors.body && <span>Recept feltöltése kötelező!</span>}</div>
            </form>
    </div>
  )
}
