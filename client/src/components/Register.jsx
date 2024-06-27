import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';


export const Register=()=> {
const [successful,setSuccessful]=useState(false)
const [msg,setMsg]=useState('')
const [validUsername,setValidUsername]=useState(true)
const [validEmail,setValidEmail]=useState(true)

useEffect (()=>{
  setMsg('')
    if(!validUsername)
      setMsg('A felhasználónév már foglalt!')
      if(!validEmail)
      setMsg(msg+' / Az email cím már foglalt!')
},[validUsername,validEmail])

  const {
    register,
    handleSubmit,
    formState: { errors },
      } = useForm();
  const onSubmit = (data) =>{
    console.log(data)
    const url='/auth/register'
    sendData(url,data)
  }

  const sendData=async(url,formdata)=>{
    const resp=await axios.post(url,formdata,{headers:{'Content-Type': 'application/json'}})
    const data=await resp.data
    resp.status===200 ? setSuccessful(true) : setSuccessful(false)
    setMsg(data.message)
  }

  const checkUsername=(e)=>{
    if(e.target.value.length>0){
      const url='/auth/checkUsername'
      sendUsername(url,{"user_name":e.target.value})
    }
  }
  const sendUsername=async (url,obj)=>{
    const resp=await axios.post(url,obj)
    const data=await resp.data[0]
    data.nr==1 ? setValidUsername(false):setValidUsername(true)
  }

  const checkEmail=(e)=>{
    if(e.target.value.length>0){
      const url='/auth/checkEmail'
      sendEmail(url,{"email": e.target.value})
    }
  }
  const sendEmail=async (url,obj)=>{
    const resp=await axios.post(url,obj)
    const data=await resp.data[0]
    data.nr==1 ? setValidEmail(false):setValidEmail(true)
  }

  return (
      <div className="register">
        <div className="position-absolute top-50 start-50 translate-middle">
          <h3 className="text-center">Regisztráció</h3>
         <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('user_name',{ required: true })} 
              className={validUsername ? "form-control mb-1" : "form-control mb-1 border border-danger"}
              placeholder="Felhasználónév"
              onBlur={(e)=>checkUsername(e)}/>
              {errors.userName && <p className="err">Felhasználónév megadása kötelező!</p>}
          <input {...register('email', { required: true })} className="form-control mb-1" placeholder="Email cím"
              onBlur={(e)=>checkEmail(e)}/>
              {errors.email && <p className="err">Email cím megadása kötelelező!</p>}
          <input type="password" {...register('password', { required: true })} className="form-control mb-1" placeholder="Jelszó"  />
          {errors.password && <p className="err">Jelszó megadása kötelelező!!</p>}
          <input type="submit" 
            className={validUsername&&validEmail? "btn btn-dark form-control rounded":"btn btn-danger form-control rounded" }
            disabled={!validUsername || !validEmail}/>
      </form>
      <div>{msg}</div>
    </div>
      </div>
    )
}
