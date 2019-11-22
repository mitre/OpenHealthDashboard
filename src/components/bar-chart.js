import React, { Component } from 'react';
import * as d3 from 'd3';

import Text from 'react-svg-text';
// import Axes from './axes';

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.xScale = d3.scaleBand();
    this.yScale = d3.scaleLinear();
    this.container = React.createRef();

    this.state = {
      width: 975,
      height: 610
    }
  }

  componentDidMount = () => {
    this.setState({
      width: this.container.current.offsetWidth,
      height: this.container.current.offsetWidth * .5
    });
  }

  render() {
    const { data } = this.props;
    const margins = { top: 50, right: 0, bottom: 40, left: 0 };
    const svgDimensions = { width: this.state.width, height: this.state.height };

    const maxValue = d3.max(data.values.map(d => d.value));

    const xScale = this.xScale
      .paddingInner(0.2)
      .domain(data.values.map(d => d.name))
      .range([margins.left, svgDimensions.width - margins.right]);

    const yScale = this.yScale
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top]);

    const bars = (
      data.values.map(datum =>
        <rect
          className="bar-chart__bar"
          key={datum.id}
          x={xScale(datum.name)}
          y={yScale(datum.value)}
          height={svgDimensions.height - margins.bottom - yScale(datum.value)}
          width={xScale.bandwidth()}
          fill="url(#barGradient)">
        </rect>,
      )
    )

    const valueLabels = (
      data.values.map(datum =>
        <text
          className="bar-chart__bar-value"
          key={datum.id}
          x={xScale(datum.name) + (xScale.bandwidth() / 2)}
          y={yScale(datum.value) - 10}
          textAnchor="middle">
          { datum.value }
          { data.abbreviation ? data.abbreviation : '' }
        </text>,
      )
    )

    const categoryLabels = (
      data.values.map(datum =>
        {
          let _x = xScale(datum.name) + (xScale.bandwidth() / 2);
          let _y = svgDimensions.height - margins.bottom;
          return <Text
            transform={`rotate(${svgDimensions.width / data.values.length < 140 ? 30 : 0}, ${_x} , ${_y})`}
            className="bar-chart__bar-label"
            key={datum.id}
            x={_x}
            y={_y}
            textAnchor="middle"
            verticalAnchor="start"
            dy={0}
            width={140}
            >
            {datum.name}
          </Text>;
        }
      )
    )

    return (
      <div className="bar-chart" ref={this.container}>
        <p className="bar-chart__title">{data.title}</p>
        <p className="bar-chart__y-axis-title">{data.yAxisLabel}</p>
        <svg width={this.state.width} height={this.state.height}>
          <defs>
            <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#EBEBEB", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#EBEBEB", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <g>{ bars }</g>
          <g>{ valueLabels }</g>
          {/*<Axes
            scales={{ x: { scale: xScale }}}
            margins={margins}
            svgDimensions={svgDimensions}
          /> */}
          <g>{ categoryLabels }</g>
        </svg>
        <p className="bar-chart__x-axis-title">{data.xAxisLabel}</p>

      </div>
    )
  }
}

export default BarChart;
