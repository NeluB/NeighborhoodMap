
import React, { Component } from "react";
import "./App.css";
import Map from "./MapMarkers";
import SidebarSearch from "./SidebarSearch";
import Errors from "./Errors";
import { slide as Menu } from "react-burger-menu";


var foursquare = require("react-foursquare")({
  clientID: "WRL4ONZFQPXH4IFUDUESMOBXHERSJZK5ZWTIHYLDJ1GP0W0D",
  clientSecret: "3REKRT0QFQFCEVAEVBIEEST02EHV3VZEATIA1RCWBSM5VTAH",
  
});
var params = {
  ll: "37.77493,-122.419416",
  query: "italian"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      markers: [],
      zoom: 13,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  // Info is from Foursquare API

  componentDidMount() {
    foursquare.venues
      .getVenues(params)
      .then(res => {
        const markers = res.response.venues.map(venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            title: venue.name,
            isOpen: false,
            isVisible: true,
            id: venue.id,
            name: venue.name,
            address: venue.location.address
          };
        });
        this.setState({ items: res.response.venues, markers });
      })
      .catch(error => {
        window.alert("Error FourSquare data " + error.message);
        console.log(error);
      });
  }
  
  // Closes open markers

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    const item = this.state.items.find(item => item.id === marker.id);
    item.animation = 1;
    marker.animation = 1;
    foursquare.venues.getVenues(params).then(res => {
      const newVenue = Object.assign(item, res.response.venue);
      this.setState({ items: Object.assign(this.state.items, newVenue) });
    });
  };

  //Shows marker after a click

  handleListItemClick = item => {
    const marker = this.state.markers.find(marker => marker.id === item.id);
    this.handleMarkerClick(marker);
    console.log(marker);
  };

  render() {
    return (
      <div className="App" role="main">
        <Errors>
          <Menu width={"300"}>
            <SidebarSearch
              {...this.state}
              handleListItemClick={this.handleListItemClick}
            />
          </Menu>

  <Map
    aria-label="Map"
    {...this.state}
    handleMarkerClick={this.handleMarkerClick}
  />
  </Errors>
  </div>
    );
  }
}

export default App;
