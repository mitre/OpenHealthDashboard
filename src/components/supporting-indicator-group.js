import React, { Component } from 'react';

import SupportingIndicator from './supporting-indicator';

class SupportingIndicatorGroup extends Component {
  render() {
    let lastType = '';
    return (
      <div className={`supporting-indicator-group pad-all ${this.props.lastOne ? 'last-one' : ''}`}>
        <h3 className="supporting-indicator-group__title margin--none">{ this.props.data.title }</h3>
        {
          this.props.data.indicators.map((indicatorData,index) => {
            let thisType = indicatorData.type;
            let result = <SupportingIndicator key={indicatorData.id} data={indicatorData} />;
            if (lastType === 'stat' && thisType !== 'stat') {
              result = <div key={indicatorData.id}><div className="supporting-indicator__divider"/><SupportingIndicator data={indicatorData} /></div>
            }
            lastType = thisType;
            return result;
          })
        }
      </div>
    )
  }
}

export default SupportingIndicatorGroup;
