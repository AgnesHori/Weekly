import React from 'react'
import { useForm } from 'react-hook-form';

export const Login=()=> {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className='register'>
      <div className='position-absolute top-50 start-50 translate-middle'> 
      <h3 className='text-center mb-3'>Bejelentkezés</h3>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="password" {...register('email', { required: true })} className="form-control mb-1" placeholder="email" />
      {errors.email && <p className='err'>Az email cím megadása kötelező!</p>}
      <input {...register('password', { required: true })} className="form-control mb-1" placeholder="Jelszó" />
      {errors.password && <p className='err'>Hibás jelszó!</p>}
      <input type="submit" className='btn btn-success form-control rounded'/>
    </form>
    </div>
    </div>
  )
}
