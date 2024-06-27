import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';


export const Login=({setUser,setUserName,setUserId,setAdmin})=> {
  const {register, handleSubmit,formState: { errors },} = useForm();
  const [successful,setSuccessful]=useState(false)
  const [msg,setMsg]=useState('')

  useEffect(()=>{
    successful? setUser(true) : setUser(false)
  },[successful])


  const onSubmit = (data) =>{
    console.log(data);
    let url='/auth/login'
    sendData(url,data)
  } 

  const sendData=async (url,formdata)=>{
    try{
      const resp=await axios.post(url,formdata,{headers:{'Content-Type':'application/json'}})
      const data=await resp.data
      console.log(data)
      setSuccessful(true)
      setUserName(data.username)
      setUserId(data.userId)
      console.log('Role?',data.role)
      if (data.role=='admin')
        setAdmin(true)
      else
        setAdmin(false)
      console.log('login',data.username)
    }catch(err){
        console.log(err.message)
        console.log(err.response.status)
        console.log(err.response.data.message)
        if(err.response.status==401){
          setSuccessful(false)
          setUserName('')
          setMsg(err.response.data.message)
        }else
          setMsg(err.message)
    }
  }

  return (
    <div className="register">
      <div className="position-absolute top-50 start-50 translate-middle">
        <h3 className="text-center">Bejelentkezés</h3>
       <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email', { required: true })} className="form-control mb-1" placeholder="email"/>
        {errors.email && <p className="err">Az email cím megadása kötelelező!</p>}
        <input type="password" {...register('password', { required: true })} className="form-control mb-1"  />
        {errors.password && <p className="err">Hibás jelszó!</p>}
        <input type="submit" className="btn btn-dark form-control rounded"/>
    </form>
    <div>{msg}</div>
  </div>
    </div>
  )
}
