import './App.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import {type User } from './types.d';
import { UsersList } from './componets/UsersList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountrey] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>(([]))

  const toggleColors =()=>{
    setShowColors(!showColors)
  }
  

  const toggleSortByCountry=()=>{
    setSortByCountrey(prevState =>!prevState)
  }
  const handleReset=()=>{
    setUsers(originalUsers.current)
  }
  
  const handleDelete =(email : string) =>{
    const filteredUsers = users.filter((user) =>user.email !== email)
    setUsers(filteredUsers);
   // originalUsers.current = filteredUsers

  }


  useEffect(()=>{
    fetch("https://randomuser.me/api?results=100")
     .then(res=> res.json())
     .then(res=>{
        setUsers(res.results)
        originalUsers.current = res.results;
     })
     .catch(err =>{
      console.error(err)
     })
  },[])


 
  const filterdUsers = useMemo(()=>{
    console.log("calculate sortedUsers")
    return filterCountry !== null && filterCountry.length > 0
  ? users.filter(user =>{
    return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  })
  : users
  }, [users, filterCountry])
  
 

  const sortedUsers = useMemo(()=>{
    return sortByCountry 
    ? filterdUsers.toSorted(
      (a,b)=> a.location.country.localeCompare(b.location.country)
    )
    :filterdUsers
  },[filterdUsers,sortByCountry]
  )


  return (
    <div className='App'>
      <h1>Prueba Ténica</h1>
      <header>
          <button onClick={toggleColors}>
              Colorear Files
          </button>
          <button onClick={toggleSortByCountry}>
             {sortByCountry ? "No ordernar por País" : "Ordenar por País"}
          </button>
          <button onClick={handleReset}>
            Resetear el Estado
          </button>

          <input placeholder='Filtra por país' onChange={(e)=>
          setFilterCountry(e.target.value)} />
      </header>
      <main>
        <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers}></UsersList>
      </main>
     
    </div>
    
      
  )
}

export default App
