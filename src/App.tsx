import './App.css'
import { useEffect, useState } from 'react'
import {type User } from './types.d';
import { UsersList } from './componets/UsersList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountrey] = useState(false)


  const toggleColors =()=>{
    setShowColors(!showColors)
  }
  

  const toggleSortByCountry=()=>{
    setSortByCountrey(prevState =>!prevState)
  }
  
  const handleDelete =(email : string) =>{
    const filteredUsers = users.filter((user) =>user.email !== email)
    setUsers(filteredUsers);

  }


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

  const sortedUsers = sortByCountry 
  ? users.toSorted((a,b)=>{
    return a.location.country.localeCompare(b.location.country)
  })
  :users

  return (
    <div className='App'>
      <h1>Prueba Tenica</h1>
      <header>
          <button onClick={toggleColors}>
              Colorear Files
          </button>
          <button onClick={toggleSortByCountry}>
             {sortByCountry ? "No ordernar por País" : "Ordenar por País"}
          </button>
      </header>
      <main>
        <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers}></UsersList>
      </main>
     
    </div>
    
      
  )
}

export default App
