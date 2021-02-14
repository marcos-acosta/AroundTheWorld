import React, { Component } from 'react';
import axios from 'axios'

import './create-user.component.css';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
      password2: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password:this.state.password2
    }
    console.log(user);

    axios.post('http://localhost:5000/api/users/register/', user)
      .then(res => {
        console.log(res.data)
        window.location = '/bottles';
      }).catch(err => console.log(err));


    this.setState({
      name: '',
      email: '',
      password: '',
      password2: '',
    })
  }

  render() {
    return(
      <div className="bodysignup">
      <div className="createcontainer">
      <form onSubmit={this.onSubmit}>
          <div className="row">
              <div className="welcome">
                <p className="p">Welcome</p>
              </div>
              <div className="createyouraccount">
                <h1 className="h1">Create your account</h1>
              </div>
              

              <p className="p">First and Last Name</p>
              <input className="input" type="text" value={this.state.name} onChange={this.onChangeName} required></input>

              <p className="p">Email</p>
              <input type="email" value={this.state.email} onChange={this.onChangeEmail} required></input>

              <p className="p">Password</p>
              <input type="password" value={this.state.password} onChange={this.onChangePassword} required></input>

              <input className="input" type="submit" value="Register now"></input>

              <div className="bottom-container">
                  <span className="psw">Already have an account?</span> <a href="/login">Login here</a>
              </div>
          </div>
      </form>
  </div>
  </div>


      /* <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}/>
            <input type="email"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}/>
            <input type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}/>
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary"/>
          </div>
        </form>
      </div> */
    )
  }
}