import React, { Component } from 'react';
import * as d3 from 'd3';
import Text from 'react-svg-text';

//import Axes from './axes';

class BarChartHorizontal extends Component {
  constructor(props) {
    super(props);

    this.xScale = d3.scaleLinear();
    this.yScale = d3.scaleBand();
    this.container = React.createRef();

    this.state = {
      width: 975,
      height: 610
    }
  }

  componentDidMount = () => {
    this.setState({
      width: this.container.current.offsetWidth,
      height: this.container.current.offsetWidth * .6
    });
  }

  render() {
    const { data } = this.props;
    const bigMargin = 320;
    const littleMargin = 220;
    const leftMargin = this.props.layout==='lens' ? bigMargin : littleMargin

    const margins = { top: 20, right: 100, bottom: 20, left: leftMargin };
    const middlePadding = 10;

    let barThickness = 30;
    if (data.values.length < 5) barThickness = 40;
    const yPadding = 26;
    var getYValue = function(index) {
        return margins.top + index * (barThickness + yPadding);
    }
    const totalHeight = getYValue(data.values.length - 1) + barThickness + margins.bottom;
    const svgDimensions = { width: this.state.width, height: totalHeight}

    const maxValue = d3.max(data.values.map(d => d.value));

    const xScale = this.xScale
      .domain([0, maxValue])
      .range([0, svgDimensions.width - margins.right - margins.left])
      .nice();

    /*const yScale = this.yScale
      .paddingInner(0.3)
      .domain(data.values.map(d => d.name))
      .range([margins.top, svgDimensions.height - margins.bottom]);
      */

    const bars = (
      data.values.map((datum,index) =>
        <rect
          key={datum.id}
          className="bar-chart__bar"
          x={margins.left}
          y={getYValue(index)}
          height={barThickness}
          width={xScale(datum.value)}
          fill="url(#barGradientHorizontal)">
        </rect>
      )
    )

    const valuePadding = 15;
    const valueOffset = 3;
    const valueLabels = (
      data.values.map((datum,index) =>
        <Text
          key={datum.id}
          className="bar-chart__bar-value"
          x={xScale(datum.value) + margins.left + valuePadding}
          y={getYValue(index) + barThickness / 2. - valueOffset}
          dy={0}
          textAnchor="start"
          verticalAnchor = "middle">
          { datum.value }
          {/* data.abbreviation ? data.abbreviation : '' */}
        </Text>
      )
    )

    const chartTextToRemConversion = 10./7.0;
    const catOffset = 2;
    const categoryLabels = (
      data.values.map( (datum,index) =>
      <Text
        key={datum.id}
        className="bar-chart__bar-label"
        x={margins.left - middlePadding}
        y={getYValue(index) + barThickness / 2.}
        dy={0}
        width={margins.left * chartTextToRemConversion - catOffset}
        textAnchor = "end"
        verticalAnchor = "middle">
        { datum.name }
      </Text>

      )
    )

    return (
      <div className="bar-chart bar-chart--horizontal" ref={this.container}>
        <p className="bar-chart__title">{this.props.data.title}</p>
        <span className="bar-chart__y-axis-title">{this.props.data.yAxisLabel}</span>
        <span className="bar-chart__x-axis-title">{this.props.data.xAxisLabel}</span>
        <svg width={svgDimensions.width} height={svgDimensions.height}>
          <defs>
            <linearGradient id="barGradientHorizontal" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#EBEBEB", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#EBEBEB", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <g>{ bars }</g>
          <g>{ valueLabels }</g>
          <g>{ categoryLabels }</g>
          {/*<Axes
            scales={{y: { scale: yScale }}}
            margins={margins}
            svgDimensions={svgDimensions}
          />*/}
        </svg>
      </div>
    )
  }
}

export default BarChartHorizontal;
