import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './landing.component.css';
import logo from './assets/logo.png'
import background from './assets/landingpage.jpg'

export default function Landing() {
  return(
    <div className="bodylanding">

      <img src={background} className="bg"></img>
      <div className="topbar">
        <div className="logotext">
            <img src={logo} className="logo"></img>MIB
            </div>
      </div>
      
      <div className="bottombar">
        <a href="/login">
          <button className="loginbutton">login</button>
        </a>
        <a href="/signup">
          <button className="registerbutton">register</button>
        </a>
      </div>
      {/* This is the main page! */}
      {/* <Link to="/signup" className="btn btn-primary">Sign up</Link>
      <Link to="/login" className="btn btn-primary">Log in</Link> */}
    </div>
  )
}