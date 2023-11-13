import React from 'react'
import logo from '../myBechdelTest-men.png'
import './Header.css'


function Header() {
  return (
    <header className="App-header">
    <img className='App-logo' src={logo} alt='logo'/>
    <h1>My Bechdel List</h1>
    </header>
  )
}

export default Header