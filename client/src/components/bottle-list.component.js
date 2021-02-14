import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Bottle = function(props) { 
  let responses = []
  for (let i = 0; i < props.bottle.responses.length; i++) {
    let response = props.bottle.responses[i]
    let responseText = response.text
    let id = response._id
    let authorId = response.author
    let location = response.location
    responses.push(
      <div className="card" key={id} id={id}>
        "{responseText}" by {authorId} from {location}
      </div>
    );
  }
  return (
    <div className="mb-3">
      <div className="card">
        {props.bottle.prompt}
        <br/>
        Responses:
        {responses}
        <Link to={"bottles/write/"+props.bottle._id}>edit</Link>
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
    for (let i = 0; i < bottles.length; i++) {
      res.push(<Bottle bottle={bottles[i]} key={bottles[i]._id}/>);
      // var numberOwners = users.filter(user => {
      //   return user.number === i;
      // });
      // if (numberOwners === undefined || numberOwners.length === 0) {
      //   res.push(<NoUser number={i}/>)
      // } else {
      //   let numberOwner = numberOwners[0];
      //   res.push(<User user={numberOwner} deleteUser={this.deleteUser} key={numberOwner._id}/>)
      // }
    }
    return res
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1> <b>Bottles</b> </h1>
        </div>
        <br/>
        <div className="container">
          { this.bottleList() }
        </div>
      </div>
    )
  }
}