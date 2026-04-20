import { useState, useEffect } from 'react'
import './style.css'

function App() { 
  
  const [loggedIn,setLoggedin]=useState(false)
  const [ships, setShips]=useState([])

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
        <header class="container">
          <h1 class="text-center">Hajok</h1>
        </header>
        <main class="container">
            <div class="row">
                <div class="col-md-8">
                    <section class="p-2 m-1 bg-light border rounded">
                        <h2>Hajok listaja</h2>
                        <ul></ul>
                    </section>
                </div>
                <div  class="col-md-4">
                    <section class="p-2 m-1 bg-light border rounded">
                        <h2 class="text-center">Bejelentkezes</h2>
                        <form action="">
                            <label for="username" class="form-label">Felhasznalonev</label>
                            <input type="text" id="username" class="form-control" placeholder="Felhasznalonev"/><br/>
                            <label for="password" class="form-label">Jelszo</label>
                            <input type="password" id="password" class="form-control" placeholder="Felhasznalonev"/><br/>
                            <button type="button" class="btn btn-success mx-auto d-grid" onclick={Login(username,password)}>Bejelentkezes</button>
                        </form>
                    </section>
                    <section class="p-2 m-1 bg-light border rounded">
                        <h2 class="text-center">Hajo hozzaadasa</h2>
                        <form action="">
                            <label for="shipname" class="form-label">Hajo neve</label>
                            <input type="text" id="shipname" class="form-control" placeholder="Hajpneve"/><br/>
                            <label for="length" class="form-label">Hossza</label>
                            <input type="number" id="length" class="form-control" placeholder="Hajo hossza"/><br/>
                            <button type="button" class="btn btn-primary mx-auto d-grid" onclick={addShip()}>Mentes</button>
                        </form>
                    </section>
                </div>
            </div>
        </main>
        <footer class="text-center">
            Gózon Szabolcs 13.i
        </footer>
        <script src="script.js"></script>
    </>
  )
}

export default App
