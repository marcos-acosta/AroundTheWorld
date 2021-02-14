import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './bottle-list.component.css';

const Bottle = function(props) { 
  // let responses = []
  // for (let i = 0; i < props.bottle.responses.length; i++) {
  //   let response = props.bottle.responses[i]
  //   let responseText = response.text
  //   let id = response._id
  //   let authorId = response.author
  //   let location = response.location
  // }
  return (
    <div className="bottle">
        <div className="username">{props.bottle.author}</div>
          <div className="message">
            {props.bottle.prompt}
            <Link to={"bottles/write/"+props.bottle._id}>Respond</Link>
          </div>
        <div>
        <span className="destinationlabel">Destination:</span><span className="destinationtext">{props.bottle.destination}</span>
      </div>
    </div>
  )
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
    let promises = [];
    for (let i = 0; i < bottles.length; i++) {
      res.push(<Bottle bottle={bottles[i]} key={bottles[i]._id}/>);
    }
    return res
  }



  render() {
    return (
 
      <div>

        <div className="topbar"></div>    
        <div className="container">
        
        </div>
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
        <div className="container">
          { this.bottleList() }
        </div>
      </div>
    )
  }
}