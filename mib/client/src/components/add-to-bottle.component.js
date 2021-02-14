import React, { Component } from 'react';
import axios from 'axios'

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
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        this.setState({
          location: position.coords.latitude
        });
      });
    } else {
      console.log("User disabled location access.")
    }
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
    return(
      <div>
        <h3>Update bottle</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Author: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.author}
              onChange={this.onChangeAuthor}/>
            <label>Message: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.text}
              onChange={this.onChangeText}/>
            <label>Location: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.location}
              onChange={this.onChangeLocation}/>
          </div>
          <div className="form-group">
            <input type="submit" value="Add to bottle" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}