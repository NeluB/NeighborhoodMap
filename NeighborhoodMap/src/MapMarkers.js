
import React, { Component } from "react";
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps";
import Errors from './Errors';

const MapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{
        lat: 37.77493,
        lng: -122.419416
      }}
    >
      {props.markers &&
        props.markers
          .filter(marker => marker.isVisible)
          .map((marker, index, arr) => {
            return (
            <Marker
            tabIndex="1"
            position={{
                lat: marker.lat,
                lng: marker.lng
             }}
            onClick={() => props.handleMarkerClick(marker)}
            title={marker.name}
            key={index}
            animation={
            marker.isOpen === true
              ? window.google.maps.Animation.BOUNCE
              : window.google.maps.Animation.DROP
              }
              >
             {marker.isOpen && (
             <InfoWindow>
             <div aria-label="Locations Information">
                <h3>{marker.name}</h3>
                <h4>{marker.address}</h4>
                </div>
                </InfoWindow>
                )}
            </Marker>
            );
          })}
    </GoogleMap>
  ))
);

export default class Map extends Component {
  render() {
    return (
      <MapComponent
        {...this.props}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXwPzzSJQD8-4QSUDO1BQF_OlVZ024ZVI"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: ` 1000px`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
