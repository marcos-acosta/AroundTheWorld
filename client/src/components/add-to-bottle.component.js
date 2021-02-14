import React, { Component } from 'react';
import axios from 'axios'

import './add-to-bottle.component.css'

export default class AddToBottle extends Component {
  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    this.state = {
      text: '',
      author: '',
      location: '',
      promptAuthor: '',
      prompt: '',
      destination: ''
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      // this.setState({
      //   location: position.coords.latitude
      // });
    });
    console.log(this.props.match.params.id)
    axios.get('http://localhost:5000/api/bottles/' + this.props.match.params.id)
    .then(response => {
      this.setState({prompt: response.data.prompt})
      this.setState({promptAuthor: response.data.author})
      this.setState({destination: response.data.destination})
    })
    .catch(err => {
      console.log(err);
    })
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const message = {
      text: this.state.text,
      location: this.state.location,
      author: this.state.author,
    }
    console.log(message);
    console.log(this.props.match.params.id)
    let id = this.props.match.params.id

    axios.post('http://localhost:5000/api/bottles/write/' + id, message)
      .then(res => {
        console.log(res.data)
        window.location = '/bottles';
      }).catch(err => console.log(err));


    this.setState({
      text: '',
      author: '',
      location: '',
    })
  }

  render() {
    // const {name, prompt} = this.props.location;
    return(
      <div>
    <h1 className="resh1">Your Response</h1>

    <div className="bottleprompt">
          <div className="newreslabel">{this.state.promptAuthor} asks:</div>
          {/* <div className="username"></div> */}
              <div className="resmessage">
              {this.state.prompt}
            </div>
            
          <div>
          <span className="destinationlabel">Destination:</span><span className="destinationtext">{this.state.destination}</span>
        </div>
      </div>

    <div className="resbottle">
              <form>
                <div className="newreslabel">User</div>
                <div className="responsecontainer">
                  <textarea rows="14" placeholder="Your text here..." required value={this.state.text} onChange={this.onChangeText}></textarea>
                </div>
                <input className="ressubmitbtn" type="submit" value="SUBMIT"></input>
              </form>
          </div>
      </div>
    )
  }
}