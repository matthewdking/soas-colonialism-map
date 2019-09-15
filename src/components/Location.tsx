import * as React from "react";
import { RouteProps } from "react-router";
import { fetchLocationById } from "./../services/database";
import { PointOfInterest, Museo500Div } from "./Map";

class Location extends React.Component<
  RouteProps,
  { location?: PointOfInterest }
> {
  constructor(props: RouteProps) {
    super(props);
    this.state = {};
  }

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
      <Museo500Div>
        <h2>{this.state.location ? this.state.location.title : ""}</h2>
        <p>{this.state.location ? this.state.location.text : ""}</p>
      </Museo500Div>
    );
  }
}

export default Location;
