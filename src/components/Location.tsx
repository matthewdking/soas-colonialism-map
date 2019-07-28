import * as React from "react";
import { fetchLocationById } from "./../services/database";
import { PointOfInterest } from "./Map";

class Location extends React.Component {
  state = {
    location: {}
  };

  componentDidMount = () => {
    console.log(this.props);
    if (this.props.location.data) {
      this.setState({ location: this.props.location.data });
    } else {
      fetchLocationById(this.props.match.params.id).then(location => {
        this.setState({ location });
      });
    }
  };

  render() {
    return (
      <>
        <h2>{this.state.location.title}</h2>
        <p>{this.state.location.text}</p>
      </>
    );
  }
}

export default Location;
