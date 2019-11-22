import React, { Component } from 'react';

import Stat from './stat';
import BarChart from './bar-chart';
import BarChartHorizontal from './bar-chart-horizontal';
import LineChart from './line-chart';
import List from './list';
import Table from './table';
import USMap from './map';

class SupportingIndicator extends Component {
  renderIndicatorType = (data) => {
    switch (data.type) {
      case 'stat':
        return <Stat data={data} />;
      case 'link':
        // TODO: Make links real
        return data.text;
      case 'table':
        return <Table data={data} />
      case 'list':
        return (
          <div className="list-wrapper">
            <List data={data} />
          </div>
        );
      case 'map':
        return (
          <USMap colorData={data} />
        );
      case 'chart':
        switch (data.chartType) {
          case 'bar':
            return (
              <div className="bar-chart-wrapper">
                <BarChart data={data} layout={'supporting'}/>
              </div>
            );
          case 'barHorizontal':
            return (
              <div className="bar-chart-wrapper">
                <BarChartHorizontal data={data} layout={'supporting'}/>
              </div>
            );
          case 'line':
            return (
              <div className="line-wrapper">
                <LineChart data={data} grid="light" layout={'supporting'}/>
              </div>
            );
          default:
            return null;
        }
      default:
        if (data.stat) {
          return <Stat data={data} />;
        }
        return null;
    }
  }

  render() {
    return (
      <div className= {`supporting-indicator ${this.props.data.type === 'stat' ? 'supporting-indicator__stat' : ''} `}>
        { this.renderIndicatorType(this.props.data) }
      </div>
    )
  }
}

export default SupportingIndicator;
