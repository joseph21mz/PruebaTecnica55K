import './App.css'
import { useEffect, useState } from 'react'
import {type User } from './types.d';
import { UsersList } from './componets/UsersList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(()=>{
    fetch("https://randomuser.me/api?results=100")
     .then(res=> res.json())
     .then(res=>{
        setUsers(res.results)
     })
     .catch(err =>{
      console.error(err)
     })
  },[])

  return (
    <div className='App'>
      <h1>Prueba Tenica</h1>
      <UsersList users={users}></UsersList>
    </div>
    
      
  )
}

export default App
