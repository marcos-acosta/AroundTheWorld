import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './bottle-list.component.css';

class Bottle extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // text:'',
      // author:'',
      // destination:'',

      name: ''
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/users/' + this.props.bottle.author)
      .then(response => {
        this.setState({name: response.data.name})
      })
      .catch(err => {
        console.log(err);
      })
  }

  // onChangeText(e) {
  //   this.setState({
  //     text: e.target.value
  //   });
  // }

  // onChangeDestination(e) {
  //   this.setState({
  //     destination: e.target.value
  //   });
  // }

  // onSubmit(e) {
  //   e.preventDefault();
  //   const message = {
  //     text: this.state.text,
  //     destination: this.state.destination,
  //     author: this.state.author,
  //   }
  //   console.log(message);
  //   console.log(this.props.match.params.id)
  //   let id = this.props.match.params.id

  //   axios.post('http://localhost:5000/api/bottles/write/' + id, message)
  //     .then(res => {
  //       console.log(res.data)
  //       window.location = '/bottles';
  //     }).catch(err => console.log(err));


  //   this.setState({
  //     text: '',
  //     author: '',
  //     destination: '',
  //   })
  // }

  render(){
    return (
      <div>

      <div className="availablebottle">
      {/* <a href={"bottles/write/"+this.props.bottle._id}> */}
        <Link to={{
          pathname:"bottles/write/"+this.props.bottle._id,
          name: this.state.name,
          prompt: this.props.bottle.prompt,
        }}>
          <div className="username">{this.state.name}</div>
              <div className="message">
              {this.props.bottle.prompt}
            </div>
            
          <div>
          <span className="destinationlabel">Destination:</span><span className="destinationtext">{this.props.bottle.destination}</span>
        </div>
        {/* </a> */}
        </Link>
      </div>

      </div>
    )
  }
};

export default class BottleList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bottles: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/bottles/')
      .then(response => {
        this.setState({bottles: response.data})
      })
      .catch(err => {
        console.log(err);
      })
  }

  bottleList() {
    let bottles = this.state.bottles;
    let res = [];
    for (let i = 0; i < bottles.length; i++) {
      res.push(<Bottle bottle={bottles[i]} key={bottles[i]._id}/>);
    }
    return res
  }



  render() {
    return (
 
      <div>

          
        <div className="sidenav">
          <a href="#home" className="homebtn">Home</a>
          <a href="#profile" className="profilebtn">Profile</a>
        </div> 
        <div className="newbottle">
              <form>
                <div className="newpostlabel">New post:</div>
                <div className="container">
                  <textarea rows="4" placeholder="Your text here..." required></textarea>
                </div>
                <span className="destinationlabel">Destination:</span>
                <input className="destinationinput" type="text" name="Destination" placeholder="e.g. Mars" required></input>
                <input className="submitbtn" type="submit" value="SUBMIT"></input>
              </form>
          </div>
        <br/>

          { this.bottleList() }

      </div>
    )
  }
}