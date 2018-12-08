import React, { Component } from "react";
import List from "./List";

export default class SidebarSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }
  //Filters venues using the search input 
  // Reference from https://www.diigo.com/outliner/fkkuvb/Udacity-Neighborhood-Map-Project-(project-%237)?key=25wgqnwals
  
  handleFilterVenues = () => {
    if (this.state.query.trim() !== "") {
      const items = this.props.items.filter(item =>
        item.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      return items;
    }
    return this.props.items;
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
    const markers = this.props.items.map(item => {
      const isMatched = item.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === item.id);
      if (isMatched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({ markers });
  };

  render() {
    return (
      <div className="sideBar">
      <h1 className="heading">San Francisco Neighborhood</h1>
          <input
          role="search"
          type={"search"}
          id={"search"}
          placeholder={"Filter"}
          onChange={this.handleChange}
        />
        <List
          {...this.props}
          items={this.handleFilterVenues()}
          handleListItemClick={this.props.handleListItemClick}
        />
      </div>
    );
  }
}
