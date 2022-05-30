import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useConfirm } from 'material-ui-confirm'

export const Admin=({admin,userId})=> {
  const [users,setUsers]=useState([])
  const confirm=useConfirm()
  const [msg,setMsg]=useState('')


  useEffect(()=>{
    fetchUsers()
  },[msg])

  const fetchUsers=async ()=>{
    try{
      const resp = await axios.get('/admin')
      setUsers(resp.data)
    }catch(err){
      console.log(err)
    }
  }

  console.log(admin)
  console.log(users)

  const handleDelete=(user_id)=>{
    confirm({description:`Biztosan ki szeretnéd törölni a ${user_id} számú felhasználót?`})
      .then(()=>{deleteUser(user_id)})
      .catch(()=>{console.log('Felugró ablak hiba!')})
  }

  const deleteUser=async (user_id)=>{
    console.log('user_id',user_id)
    try{
      const resp=await axios.delete(`/admin/${user_id}`)
      console.log(resp.data)
      setMsg(resp.data.message)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='admin'>
      <div className='container text-center bg-white'>
      <div className='container text-center p-4'>
        <h3>Felhasználók</h3>
        </div>
        <table className='table'>
            <tbody>
            <tr>
              <td>index</td>
              <td>userid</td>
              <td>name</td>
              <td>mail</td>
              <td>role</td>
              <td>status</td>
              <td></td>
            </tr>
          {users.map((obj, index) => <tr><td>{index + 1}</td><td>{obj.user_id}</td><td>{obj.user_name}</td>
              <td>{obj.email}</td><td>{obj.role}</td><td>{obj.status}</td><td><button className="btn button fa-solid fa-trash-can ms-3 text-danger" onClick={()=>handleDelete(obj.user_id)}></button></td></tr>)}
            </tbody>
          </table>
      </div>
      <div className='container text-center'>{msg}</div>
    </div>
  )
}
