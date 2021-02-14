import React, { Component } from 'react';
import axios from 'axios';

import './log-in.component.css';

export default class LogIn extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    

    this.state = {
      email: '',
      password: '',
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    console.log(user);

    axios.post('http://localhost:5000/api/users/login/', user)
      .then(res => {
        console.log(res.data)
        window.location = '/bottles';
      }).catch(err => console.log(err));

    this.setState({
      email: '',
      password: '',
    })
  }

  render() {
    return(
      <div className="createcontainer">
      <form onSubmit={this.onSubmit}>
          <div className="row">
              <div className="welcome">
                <p className="p">Welcome back</p>
              </div>
              <div className="createyouraccount">
                <h1 className="loginh1">Login to your account</h1>
              </div>
              <p className="p">Email</p>
              <input type="email" value={this.state.email} onChange={this.onChangeEmail} required></input>

              <p className="p">Password</p>
              <input type="password" value={this.state.password} onChange={this.onChangePassword} required></input>

              <input className="input" type="submit" value="Login now"></input>

              <div className="bottom-container">
                  <span className="psw">Don't have an account?</span> <a href="/signup">Join free today</a>
              </div>
          </div>
      </form>
  </div>




      // <div>
      //   <h3>Log in</h3>
      //   <form onSubmit={this.onSubmit}>
      //     <div className="form-group">
      //       <input type="email"
      //         required
      //         className="form-control"
      //         value={this.state.email}
      //         onChange={this.onChangeEmail}/>
      //       <input type="password"
      //         required
      //         className="form-control"
      //         value={this.state.password}
      //         onChange={this.onChangePassword}/>
      //     </div>
      //     <div className="form-group">
      //       <input type="submit" value="Log in"/>
      //     </div>
      //   </form>
      // </div>
    )
  }
}