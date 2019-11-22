import React, { Component } from 'react';

class Citations extends Component {
  render() {
    return (
      <div className="citations h-100 pad-all">
        { this.props.data.map(citation => {
          if (citation != null) {
            return (
              <p dangerouslySetInnerHTML={{ __html: citation }} />
            )
          } else {
            return null;
          }
        })}
        <p className="dismiss-text">dismiss</p>
      </div>
    )
  }
}

export default Citations;
