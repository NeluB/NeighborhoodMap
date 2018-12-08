import React from "react";
class Errors extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1> Please try again!</h1>;
    }
    return this.props.children;
  }
}

export default Errors;
