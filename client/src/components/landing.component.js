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

      <br/>
      <div className="about">
          <h1>About us</h1>
          <p>Message in a Bottle (MIB) is the brain child of 4 sophomores in college created during a hackathon, Treehacks
              2021. Our vision was to create a place where people anywhere around the world can foster a connection with
              each
              other. Users create a prompt and choose a destination. Then other users along the route can respond and send
              the
              message further on it’s journey.</p>
          <p>We believed that if strangers could see each other’s messages and responses, they could better empathize with
              each other. This came in a time of global crisis due to COVID where international and community tensions
              were
              higher than ever before. Crime against minorities, especially towards Asian Americans, increased
              drastically.
              While bigotry and ignorance are hard to defeat, we hope that people who use this platform take a step in the
              right direction. </p>
          <br/>
      </div>

      {/* This is the main page! */}
      {/* <Link to="/signup" className="btn btn-primary">Sign up</Link>
      <Link to="/login" className="btn btn-primary">Log in</Link> */}
    </div>
  )
}