import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo.png'

export default function Navbar({userToken ,logOut}) {
  return <>
  <nav className="navbar navbar-expand-lg bg-dark  ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="home"><img src={logo}/>GameOver</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userToken?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="all">All</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="platforms" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Platforms
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="platforms/pc">Pc</Link></li>
            <li><Link className="dropdown-item" to="platforms/browser">Browser</Link></li>
           
          </ul>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="storby" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            StorBy
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to='storby/release-date' >Release-date</Link></li>
            <li><Link className="dropdown-item" to='storby/popularity' >Popularity</Link></li>
            <li><Link className="dropdown-item" to='storby/relevance' >Relevance</Link></li>
            <li><Link className="dropdown-item"  to='storby/alphabetical'>Alphabetical</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="categories" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to='categories/action' >Action</Link></li>
            <li><Link className="dropdown-item" to='categories/zompi'>Zompi</Link></li>
            <li><Link className="dropdown-item" to='categories/shooter'>Shooter</Link></li>
            <li><Link className="dropdown-item" to='categories/sport'>Sport</Link></li>
            <li><Link className="dropdown-item" to='categories/racing' >Racing</Link></li>
          </ul>
        </li>
     
      </ul>:''}
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {userToken? <li className="nav-item">
          <span className="nav-link logout" onClick={logOut}>Logout</span>
        </li>:<>
        <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>
      <li className="nav-item">
          <Link className="nav-link" to="/">Register</Link>
        </li>
        </>}
      
       
        
      </ul>
      
    </div>
  </div>
</nav>
  </>
}
