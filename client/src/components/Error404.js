import React, { Component } from 'react';

class Error404 extends Component {
  state = {}
  render() {
    return (
      <div className="text-center mt-5">
        <div className="h2"><strong>ERROR 404</strong> | NOT FOUND</div>
        <br />
        <h6>The page you requested does not exist.</h6>
      </div>
      );
  }
}

export default Error404;