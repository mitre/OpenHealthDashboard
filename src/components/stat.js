import React, { Component } from 'react';

class Stat extends Component {
  render() {
    return (
      <div className="stat">
        <div className="stat__value margin--none">
            <div className="prefix">
              { this.props.data.prefix ? this.props.data.prefix : ` ` }
            </div>
            <div className="number">
              { this.props.data.stat }
            </div>
            <div className="suffix">
              { this.props.data.abbreviation ? this.props.data.abbreviation : ' '  }
            </div>
        </div>
        <div className="stat__description">
          <p className="text--gray--light margin--none">
            { this.props.data.description }
          </p>
        </div>
      </div>
    )
  }
}

export default Stat;
