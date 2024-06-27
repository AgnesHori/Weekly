import axios from 'axios'
import React, { useEffect } from 'react'
import {useParams,Link} from 'react-router-dom'

export const WelcomePage=({setUser})=>{
    const params=useParams()
    console.log('Cliens oldal:',params.confirmationCode)
    setUser(false)
    const url='/auth/confirm/'
    useEffect(()=>{
        verifyUser(url,params.confirmationCode)
    },[])

    const verifyUser=async (url,code)=>{
        try{
            const resp=await axios.get(url+code)
            const data=await resp.data
            console.log(data)
        }catch(err){
            console.log(err.message)
        }
    }

    return(
        <div>
            <div className="activate">
                <h3>Köszönjük, a fiókodat aktiváltad!</h3>
                <Link to={'/login'}>Kérlek itt jelentkezz be</Link>
            </div>
        </div>
    )
}