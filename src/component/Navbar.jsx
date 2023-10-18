import React,{useState} from 'react'
import logoimg from '../assests/image/logo.png'
import sinhala from './language/Sinhalaln';
import eng from './language/English';
import '../assests/stylsheet/cssfile.css'

const Navbar = ({ language, onLanguageToggle }) => {

  const content = language === "eng" ? eng : sinhala;
  return (
    <div>
   <nav className="navbar navbar-light navbar-expand-md" style={{background: '#000000' }}>
  <div className="container-fluid">
      <img src={logoimg} alt="" />
    <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1" style={{background: 'rgba(255, 255, 255, 0.9)'}}>
      <span className="visually-hidden">Toggle navigation</span>
      <span className="navbar-toggler-icon"  />
    </button>
    <div className="collapse navbar-collapse justify-content-between" id="navcol-1" style={{background: '#000000'}}>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link btns active" href='/' style={{color: 'rgba(255, 255, 255, 0.9)'}}>{content.home}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" style={{color: 'rgba(255, 255, 255, 0.9)'}} href="#">{content.about}</a>
          </li>
        <li className="nav-item">
          <a className="nav-link d-flex" style={{color: 'rgba(255, 255, 255, 0.9)'}} href="/login">{content.login}</a>
        </li>
        <li className="nav-item" />
        <li className="nav-item" />
      </ul>
      <ul className="navbar-nav d-flex float-start">
        <li className="nav-item" />
        <button className="nav-item" style={{border:'none',background:'transparent'}}>
          <a 
          className={`nav-link ${language === 'eng' ? 'active' : ''}`}
          style={{color: 'rgba(255, 255, 255, 0.9)'}} 
          onClick={()=>onLanguageToggle()}>
            {content.english}
            </a>
          </button>
        <button className="nav-item" style={{border:'none',background:'transparent'}}>
          <a 
          className={`nav-link ${language === 'sinhala' ? 'active' : ''}`}
          style={{color: 'rgba(255, 255, 255, 0.9)'}} 
          onClick={() => onLanguageToggle()}>
            {content.sinhala}
            </a>
          </button>
      </ul>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar
