import React, { Component } from 'react';
class LoginLayout extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
export default LoginLayout;