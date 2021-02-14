import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

export default function Landing() {
  return(
    <div>
      This is the main page!
      <Link to="/signup" className="btn btn-primary">Sign up</Link>
      <Link to="/login" className="btn btn-primary">Log in</Link>
    </div>
  )
}