import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <div className="table">
        <table className="table__table">
          {
            this.props.data.labelRow || this.props.data.headerRow ?
              <thead>
                {
                  this.props.data.labelRow ?
                    <tr className="table__row table__row--labels">
                      { this.props.data.labelRow.map(label => <td>{label}</td>)}
                    </tr>
                  : null
                }
                {
                  this.props.data.headerRow ?
                    <tr className="table__row table__row--headers">
                      { this.props.data.headerRow.map(header => <th>{header}</th>)}
                    </tr>
                  : null
                }
              </thead>
            : null
          }
          {
            this.props.data.rows.map((row, i) => {
              return (
                <tr className={`table__row ${i % 2 === 0 ? 'table__row--alt' : ''}`}>
                  { row.map(d => <td>{d}</td>) }
                </tr>
              )
            })
          }
        </table>
      </div>
    )
  }
}

export default Table;
