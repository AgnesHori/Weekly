import React from 'react'


export const Write=()=> {
  return (
    <div className="row justify-content-center mx-auto w-75 write" >
  
            <img src="https://i.ibb.co/nBM1RSB/header01.jpg" alt="kaja" className="border p-0 rounded-3" />
            <form >
                <div className="d-flex align-items-center">
                    <label for="file"><i class="fa-solid fa-circle-plus fa-2xl " role="button"></i></label>
                    <input type="file" name="" id="file" className="form-control d-none" />
                    <input type="text" name="" id="title" className="form-control m-2" placeholder="cím" />
                    <button className="btn btn-primary m-2">Publikálás</button>
                </div>
                
                <textarea name="" id="" cols="30" rows="10" className="form-control">Írd le a receptet...</textarea>
                
            </form>
 
    </div>
  )
}