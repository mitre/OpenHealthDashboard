import React, { Component } from 'react';

import {
  axisPropsFromBandedScale
} from 'react-d3-axis';

import {
  LEFT,
  BOTTOM
} from './axis';

import Axis from './axis';

class Axes extends Component {
  formatText = d => {
    return d.getFullYear && typeof d.getFullYear === 'function' ? d.getFullYear() : d.toString();
  }

  shouldRenderText = (d, ticks, position) => {
    if (this.props.grid && position === LEFT && ticks.indexOf(d) % 2 !== 0) {
      return null;
    } else {
      return this.formatText(d);
    }
  }

  renderAxisFromScaleType = (scaleObj, position, margins) => {
    if (scaleObj.scale.bandwidth && typeof scaleObj.scale.bandwidth === 'function') {
      return <Axis
                {...axisPropsFromBandedScale(scaleObj.scale)}
                largeTick={scaleObj.largeTick}
                style={{orient: position}}
                center={this.props.center}
                margins={margins}
              />;
    } else {
      return <Axis
                range={scaleObj.scale.range()}
                values={scaleObj.scale.ticks(scaleObj.tickCount)}
                format={ d => this.shouldRenderText(d, scaleObj.scale.ticks(), position) }
                position={scaleObj.scale.copy()}
                style={{orient: position}}
                largeTick={scaleObj.largeTick}
                center={this.props.center}
                margins={margins}
              />;
    }
  }

  render () {
    const { scales, margins, svgDimensions } = this.props;
    const { width, height } = svgDimensions;

    return (
      <g className="axes">
        <defs>
          <linearGradient id="lineChartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#334467", stopOpacity: .62 }} />
            <stop offset="100%" style={{ stopColor: "#334467", stopOpacity: .2 }} />
          </linearGradient>
          <linearGradient id="lineChartGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#DFE8F5", stopOpacity: .2 }} />
            <stop offset="100%" style={{ stopColor: "#DFE8F5", stopOpacity: .01 }} />
          </linearGradient>
        </defs>
        {
          this.props.grid && scales.y ?
            <g className="axis__grid">
              <rect x={margins.left} y={margins.top} width={width - margins.left - margins.right} height={height - margins.top - margins.bottom} fill={ this.props.grid === 'light' ? 'url(#lineChartGradientLight)' : 'url(#lineChartGradient)'} />
              {
                scales.y.scale.ticks(scales.y.tickCount).map(t => {
                  return (
                    <rect key={t} className="axis__grid-line" x={margins.left} y={scales.y.scale(t)} width={width - margins.left - margins.right} height="2px" />
                  )
                })
              }
            </g>
          : null
        }
        {
          scales.y ?
            <g transform={`translate(${this.props.center ? width / 2 : margins.left}, 0)`} className={scales.y.showTickMarks ? '' : 'axis--no-ticks'}>
              { this.renderAxisFromScaleType(scales.y, LEFT, margins) }
            </g>
          : null
        }
        {
          scales.x ?
            <g transform={`translate(0, ${height - margins.bottom})`} className={`axis axis--bottom ${scales.x.showTickMarks ? '' : 'axis--no-ticks'} ${this.props.grid ? 'axis--time' : ''}`}>
              { this.renderAxisFromScaleType(scales.x, BOTTOM, margins) }
            </g>
          : null
        }
      </g>
    )
  }
}

export default Axes;
