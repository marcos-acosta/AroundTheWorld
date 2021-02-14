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
          <div className="newreslabel">User</div>
          {/* <div className="username">{this.state.name}</div> */}
              <div className="resmessage">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Tempus iaculis urna id volutpat lacus laoreet non. Id neque
              aliquam vestibulum morbi. Vitae ultricies leo integer malesuada nunc vel risus commodo. Sit amet luctus
              venenatis lectus magna fringilla urna.
            </div>
            
          <div>
          <span className="destinationlabel">Destination:</span><span className="destinationtext">Mars, Milky Way</span>
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