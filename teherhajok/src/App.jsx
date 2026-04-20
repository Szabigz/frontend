import { useState, useEffect } from 'react'
import './style.css'

function App() { 

  const [loggedIn,setLoggedin]=useState(false)
  const [ships, setShips]=useState([])

  useEffect(()=>{
    getShip()
  },[1000])
  async function Login(username,password){
    const response=await fetch('http://localhost:3000/login',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    if(!response.ok){
      return alert('Sikertelen bejelentkezes')
    }
    const result=await response.json()
    sessionStorage.setItem('token',result.token)
    setLoggedin(true)
    getMyShip()
    alert('Sikeres bejelentkezes')
  }
  async function LogOut(){
    sessionStorage.clear()
    setLoggedin(false)
  }

  async function addShip(name,length){
    const response=await fetch('http://localhost:3000/ships',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        "authorization":"Bearer "+sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        name,
        length
      })
    })
    if(!response.ok){
      return alert('Sikertelen letrehozas')
    }
    alert('Sikeres letrehozas')
  }

  async function getShip(){
    const response=await fetch('http://localhost:3000/ships')
    if(!response.ok){
      return alert('Sikertelen betoltes')
    }
    const result=await response.json()
    setShips(result)
    
  }

  async function getMyShip(){
    const response=await fetch('http://localhost:3000/myships',{
      headers:{
        "authorization":"Bearer "+sessionStorage.getItem('token')
      }
    })
    if(!response.ok){
      return alert('Sikertelen betoltes')
    }
    const result=await response.json()
    setShips(result)
  }

  async function DeleteMyShip(id){
    const response=await fetch('http://localhost:3000/ships/'+id,{
      method:'DELETE',
      headers:{
        "authorization":"Bearer "+sessionStorage.getItem('token')
      }
    })
    if(!response.ok){
      return alert('Sikertelen torles')
    }
  }
  return (
    <>
        <header className="container">
          <h1 className="text-center">Hajok</h1>
        </header>
        <main className="container">
            <div className="row">
                <div className="col-md-8">
                    <section className="p-2 m-1 bg-light border rounded">
                        <h2>Hajok listaja</h2>
                        <ul>
                          {ships.map(ship=>{
                            <li key={ship.id}>{ship.name} {loggedIn? <button onClick={()=>DeleteMyShip(ship.id)} className='btn btn-danger'>Torles</button> :""}</li>
                          })}
                        </ul>
                    </section>
                </div>
                <div  className="col-md-4">
                  {loggedIn? 
                    <button type="button" className="btn btn-danger mx-auto d-grid" onClick={LogOut}>Kijelentkezes</button>
                  : 
                  <section className="p-2 m-1 bg-light border rounded">
                    <h2 className="text-center">Bejelentkezes</h2>
                      <form action="">
                          <label htmlFor="usernameID" className="form-label">Felhasznalonev</label>
                          <input type="text" id="usernameID" className="form-control" placeholder="Felhasznalonev"/><br/>
                          <label htmlFor="passwordID" className="form-label">Jelszo</label>
                          <input type="password" id="passwordID" className="form-control" placeholder="Felhasznalonev"/><br/>
                          <button type="button" className="btn btn-success mx-auto d-grid" onClick={()=>Login(usernameID.value,passwordID.value)}>Bejelentkezes</button>
                      </form>
                  </section>

                  }
                    
                    {loggedIn ? 
                      <section className="p-2 m-1 bg-light border rounded">
                        <h2 className="text-center">Hajo hozzaadasa</h2>
                        <form action="">
                            <label htmlFor="shipname" className="form-label">Hajo neve</label>
                            <input type="text" id="shipname" className="form-control" placeholder="Hajpneve"/><br/>
                            <label htmlFor="shiplength" className="form-label">Hossza</label>
                            <input type="number" id="shiplength" className="form-control" placeholder="Hajo hossza"/><br/>
                            <button type="button" className="btn btn-primary mx-auto d-grid" onclick={()=>addShip(shipname.value,shiplength.value)}>letrehozas</button>
                        </form>
                      </section>  
                    : ""}
                    
                </div>
            </div>
        </main>
        <footer className="text-center">
            Gózon Szabolcs 13.i
        </footer>
        <script src="script.js"></script>
    </>
  )
}

export default App
