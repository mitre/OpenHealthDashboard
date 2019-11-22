import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button className={`button ${this.props.className || ''} ${this.props.selected ? 'selected' : ''}`}
              onClick={this.props.onClick}>
              {this.props.children}
      </button>
    )
  }
}

export default Button;
