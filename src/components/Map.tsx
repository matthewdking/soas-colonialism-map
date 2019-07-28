import * as React from "react";
import * as Leaflet from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LeafShadow from "../assets/leaf-shadow.png";
import TopHat from "../assets/top-hat.png";
import { fetchAllLocations } from "./../services/database";

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const generateIcon = (iconUrl: string, shadowUrl: string) =>
  Leaflet.icon({
    iconUrl,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
    // shadowUrl,
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
  });

const startPosition: Leaflet.LatLngExpression = [51.505, -0.09];

export interface PointOfInterest {
  title: string;
  text?: string;
  latitude?: string;
  longitude?: string;
  image?: string;
  createdTime: string;
  id: string;
}

export interface AirTableRecord {
  id: string;
  fields: PointOfInterest[];
  createdTime: string;
}

class ColonialismMap extends React.Component {
  state = {
    pointsOfInterest: new Array<PointOfInterest>()
  };

  componentDidMount = () => {
    fetchAllLocations().then(pointsOfInterest => {
      this.setState({ pointsOfInterest });
    });
  };

  makeMarkers = (pois: PointOfInterest[]): any => {
    return pois.map(poi => {
      const position: Leaflet.LatLngExpression = [
        Number(poi.latitude),
        Number(poi.longitude)
      ];

      return (
        <Marker
          position={position}
          key={poi.id}
          icon={generateIcon(TopHat, LeafShadow)}
        >
          <Popup>
            {poi.title}
            <br />
            {poi.text.substring(0, 200)}...
            <Link
              to={{ pathname: `/location/${poi.id}`, data: poi }}
              state={{ name: "Phil" }}
            >
              read more
            </Link>
            {poi.image && (
              <img src={poi.image} alt={poi.title} style={{ width: "100%" }} />
            )}
          </Popup>
        </Marker>
      );
    });
  };

  render() {
    return (
      <StyledDiv>
        <Map
          center={startPosition}
          zoom={10}
          preferCanvas={true}
          style={{ height: "500px" }}
        >
          <TileLayer
            id="mapbox.streets"
            url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=" // TODO: mapbox access token
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.makeMarkers(this.state.pointsOfInterest)}
        </Map>
      </StyledDiv>
    );
  }
}

export default ColonialismMap;
