import React, { Component } from 'react';

class List extends Component {
  render() {
    return (
      <div className="list">
        <div className="list__empty"> </div>
        <div className="list__content">
          <span className="list__label">
            { this.props.data.label }
          </span>
          <span className="list__values">
            { this.props.data.list.map((d, i) => i === this.props.data.list.length - 1 ? d : `${d}, `) }
          </span>
        </div>
      </div>
    )
  }
}

export default List;
