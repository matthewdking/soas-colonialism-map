import * as React from "react";
import { RouteProps } from "react-router";
import { fetchLocationById } from "./../services/database";
import { PointOfInterest } from "./Map";

class Location extends React.Component<RouteProps> {
  state = {
    location: {}
  };

  componentDidMount = () => {
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
