import React, { Component } from "react";
import ListItem from "./ListItem";

class List extends Component {
  render() {
    return (
      <div>
      {this.props.items &&
      this.props.items.map((item, index) => (
          <ListItem
          key={index}
          {...item}
          handleListItemClick={this.props.handleListItemClick}
      />
      ))}
      </div>
    );
  }
}

export default List;
