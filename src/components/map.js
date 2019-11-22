import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import us from 'us-atlas/states-10m.json';
import stateData from '../data/states.json';

import ring1 from '../images/ring_01.png';
import ring2 from '../images/ring_02.png';
import ring3 from '../images/ring_03.png';
import ring4 from '../images/ring_04.png';
import ring5 from '../images/ring_05.png';
import ring6 from '../images/ring_06.png';
import ring7 from '../images/ring_07.png';
import oceanBacking from '../images/ocean_backing.png';

const colorLowBad = '#FFF9C6';
const colorLowGood = '#F9FAF9';
const colorHighBad = '#B43000';
const colorHighGood = '#496F52';

const states = topojson.feature(us, us.objects.states);
const margins = { top: 0, bottom: 0, left: 0, right: 25 };

class USMap extends Component {
  static defaultProps = {
    clickable: true
  }

  constructor(props) {
    super(props);

    this.state = {
      width: 975,
      height: 610,
      selectedState: null
    }

    this.container = React.createRef();
    const projection = d3.geoAlbersUsa().scale(1).fitWidth(this.state.width, states);
    this.path = d3.geoPath().projection(projection);
  }

  componentDidMount() {
    const width = this.container.current.offsetWidth;
    const height = width * .6;
    const projection = d3.geoAlbersUsa().fitWidth(width - margins.right - margins.left, states);
    this.path = d3.geoPath().projection(projection);

    this.setState({
      width,
      height
    });
  }

  handleStateClick = (state, e = null) => {
    if (this.props.clickable) {
      if (e) {
        e.stopPropagation();
      }

      this.setState({ selectedState: state });
    }
  }

  renderStates = (mappedColorValues, color) => {
    return (
      <g className="map__states-container">
        {states.features.map(f => {
          const obj = mappedColorValues.get(f.properties.name);
          if (obj && f.properties.name !== "District of Columbia") {
            return (
              <g key={f.properties.name} onClick={(e) => this.handleStateClick(f.properties.name, e)}>
                <path
                  fill={ obj.value ? color(obj.value) : "#FFFFFF00" }
                  d={this.path(f)}>
                </path>
              </g>
            )
          } else {
            return null;
          }
        })}
      </g>
    )
  }

  renderCircles = (mappedCircleValues, circleScale) => {
    return (
      <g className="map__circles-container">
        {topojson.feature(us, us.objects.states).features.map(f => {
          const obj = mappedCircleValues.get(f.properties.name);
          if (obj && obj.value && f.properties.name !== "District of Columbia") {
            const centroid = this.path.centroid(f);
            let offset = [0, 0];
            switch (f.properties.name) {
              case 'Massachusetts':
                offset = [110, -30]
                break;
              case 'Rhode Island':
                offset = [100, 25]
                break;
              case 'Connecticut':
                offset = [85, 65]
                break;
              case 'New Hampshire':
                offset = [-50, -150]
                break;
              case 'Vermont':
                offset = [-100, -80]
                break;
              case 'New Jersey':
                offset = [90, 40]
                break;
              case 'Delaware':
                offset = [85, 45]
                break;
              case 'Maryland':
                offset = [125, 115]
                break;
              case 'Louisiana':
                offset = [-10, 5]
                break;
              case 'Florida':
                offset = [15, 0]
                break;
              case 'Idaho':
                offset = [0, 15]
                break;
              case 'California':
                offset = [-10, 0]
                break;
              default:
                offset = [0, 0]
                break;
            }
            const position = [centroid[0] + offset[0], centroid[1] + offset[1]];
            return (
              <g key={f.properties.name} transform={`translate(${position[0]}, ${position[1]})`} className="map-topic__circle">
                <line
                  x1={-offset[0]}
                  y1={-offset[1]}
                  x2="0"
                  y2="0"
                  strokeWidth="3"
                  stroke="#fff"
                />
                {offset[0] !== 0 || offset[1] !== 0 ? <image xlinkHref={oceanBacking} width="150" height="150" x="-75px" y="-85px"/>: ''}
                <image xlinkHref={circleScale(obj.value)} width="150" height="150" x="-75px" y="-85px" />
                <text textAnchor="middle">{ this.props.circleData.valueType }{ obj.value.toFixed(1) }</text>
              </g>
            )
          } else {
            return null;
          }
        })}
      </g>
    )
  }

  renderSelectedState = (mappedColorValues, mappedCircleValues, color, stateName) => {
    const state = topojson.feature(us, us.objects.states).features.find(s => s.properties.name === stateName);
    let obj, obj2;
    if (mappedColorValues) {
      obj = mappedColorValues.get(stateName);
    }

    if (mappedCircleValues) {
      obj2 = mappedCircleValues.get(stateName);
    }

    const bounds = this.path.bounds(state);
    const origStateWidth = bounds[1][0] - bounds[0][0];
    const origStateHeight = bounds[1][1] - bounds[0][1];
    const center = [bounds[0][0] + (origStateWidth / 2), bounds[0][1] + (origStateHeight / 2)];

    const stateWidth = origStateWidth * 1.2 + 50;
    const stateHeight = origStateHeight * 1.2 + 50;
    const shadowBuffer = 50;

    const projection = d3.geoAlbersUsa().fitSize([stateWidth - shadowBuffer, stateHeight - shadowBuffer], state);
    const path = d3.geoPath().projection(projection);

    const statePosX = center[0] - (stateWidth / 2);
    const statePosY = center[1] - (stateHeight / 2);
    const thisStateData = stateData.find( ({ state }) => state.toLowerCase() === stateName.toLowerCase()).data;

    const detailTop = statePosY < this.state.height / 4;
    let detailBoxStyle;
    if (detailTop) {
      detailBoxStyle = { top: `calc(50% - ${shadowBuffer/2}px - 30px)`, right: '60%' }
    } else {
      detailBoxStyle = { bottom: `calc(50% - ${shadowBuffer/2}px - 30px)`, right: '60%' }
    }

    return (
      <div style={{ position: "absolute", left: statePosX, top: statePosY }}>
        <svg width={stateWidth} height={stateHeight}>
          <path
            style={{ filter: 'url(#mapShadow)', transform: `translate(${shadowBuffer/2}px, ${shadowBuffer/2}px)` }}
            onClick={() => this.handleStateClick(null)}
            stroke="#fff"
            strokeWidth="1px"
            fill={ obj.value ? color(obj.value) : "#FFFFFF00" }
            d={path(state)}>
          </path>
        </svg>
        <div className={`map__selected-state-details ${detailTop ? 'map__selected-state-details--bottom' : ''}`} style={detailBoxStyle} onClick={() => this.handleStateClick(null)}>
          <p className="map__selected-state-details__title">{ stateName }</p>
          <div className="map__selected-state-details__details text-size--small">
            <div className="f-50">
              population <span className="text-size--regular"><span className="text-face--medium">{thisStateData.pop}</span>M</span>
            </div>
            <div className="f-50">
              non-white <span className="text-size--regular"><span className="text-face--medium">{thisStateData.non_white}</span>%</span>
            </div>
            <div className="f-50">
              median age <span className="text-size--regular"><span className="text-face--medium">{thisStateData.median_age}</span></span>
            </div>
            <div className="f-50">
              seniors <span className="text-size--regular"><span className="text-face--medium">21</span>%</span>
            </div>
            <div className="f-100">
              median income <span className="text-size--regular">$<span className="text-face--medium">{thisStateData.median_income}</span>k</span> ({thisStateData.income_rank}/50 states)
            </div>
            <div className="f-100">
              poverty rate <span className="text-face--medium"><span className="text-face--medium">{thisStateData.poverty_rate}</span>%</span> ({thisStateData.poverty_rank}/50 states)
            </div>
          </div>
          {
            obj && obj.value ?
              <div className="f-100">
                <p>
                  {obj.prefix}<span className="text-face--medium">{obj.value}</span>{obj.suffix} { this.props.colorData.scaleLabel }
                </p>
              </div>
            : null
          }
          {
            obj2 && obj2.value ?
              <div className="f-100">
                <p>
                  {obj2.prefix}<span className="text-face--medium">{obj2.value}</span>{obj.suffix} { this.props.circleData.scaleLabel }
                </p>
              </div>
            : null
          }
          <div className="map__selected-state-details__dismiss">
            <span className="text--gold text-face--medium">dismiss</span>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { width, height } = this.state;

    let extent,
        color,
        minCircleValue,
        maxCircleValue,
        midCircleValue,
        circleScale,
        mappedColorValues,
        mappedCircleValues,
        colorLow,
        colorHigh;

    if (this.props.colorData) {
      colorLow = this.props.colorData.type === 'good' ? colorLowGood : colorLowBad;
      colorHigh = this.props.colorData.type === 'good' ? colorHighGood : colorHighBad;
      extent = d3.extent(this.props.colorData.values, d => d.value);
      color = d3.scaleLinear()
        .domain([extent[0], extent[1]])
        // .interpolate(d3.interpolateHcl)
        .range([d3.rgb(colorLow), d3.rgb(colorHigh)]);

      mappedColorValues = new Map(this.props.colorData.values.map(state => {
        return [state.state, { value: state.value }];
      }));
    }

    if (this.props.circleData) {
      minCircleValue = d3.min(this.props.circleData.values, d => d.value).toFixed(1);
      maxCircleValue = d3.max(this.props.circleData.values, d => d.value).toFixed(1);
      midCircleValue = ((parseFloat(minCircleValue) + parseFloat(maxCircleValue)) / 2).toFixed(1);
      const circleExtent = d3.extent(this.props.circleData.values, d => d.value);
      circleScale = d3.scaleQuantile()
        .domain([circleExtent[0], circleExtent[1]])
        .range([ring1, ring2, ring3, ring4, ring5, ring6, ring7]);

      mappedCircleValues = new Map(this.props.circleData.values.map(state => {
        return [state.state, { value: state.value }];
      }));
    }

    return (
      <div className="map h-100" ref={this.container}>
        <svg className="map__map" width={width} height={height} style={{ overflow: 'visible', opacity: this.state.selectedState ? '0.5' : '1' }} onClick={() => this.state.selectedState ? this.handleStateClick(null) : null }>
          <defs>
            <filter id="mapShadow" width="200%" height="200%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="8" dy="8" stdDeviation="8" floodColor="#000" floodOpacity="0.5" />
            </filter>
          </defs>
          <g>
            { mappedColorValues ? this.renderStates(mappedColorValues, color) : null }
            <path
              fill="none"
              stroke="white"
              strokeLinejoin="round"
              d={this.path(topojson.feature(us, us.objects.states, (a, b) => a !== b))}>
            </path>
            { mappedCircleValues ? this.renderCircles(mappedCircleValues, circleScale) : null }
          </g>
        </svg>
        <div className="map__key">
          {
            this.props.colorData ?
              <div className="map__key-section map__key--color">
                <div className="map__key-display">
                  <p>{ this.props.colorData.valueType }{ extent[0] }</p>
                  <div className="map__key-bar" style={{ background: `linear-gradient(90deg, ${colorLowBad} 0%, ${colorHighBad} 100%)` }}></div>
                  <p>{ this.props.colorData.valueType }{ extent[1] }</p>
                </div>
                <p>{ this.props.colorData.scaleLabel }</p>
              </div>
            : null
          }
          {
            this.props.circleData ?
              <div className="map__key-section">
                <div className="map__key-display">
                  <div className="map__key-circle">
                    <img src={ring1} alt="lowest value ring" />
                    <p>{ this.props.circleData.valueType }{ minCircleValue }</p>
                  </div>
                  <div className="map__key-line"></div>
                  <div className="map__key-circle">
                    <img src={ring4} alt="middle value ring" />
                    <p>{ this.props.circleData.valueType }{ midCircleValue }</p>
                  </div>
                  <div className="map__key-line"></div>
                  <div className="map__key-circle">
                    <img src={ring7} alt="highest value ring" />
                    <p>{ this.props.circleData.valueType }{ maxCircleValue }</p>
                  </div>
                </div>
                <p>{ this.props.circleData.scaleLabel }</p>
              </div>
            : null
          }
        </div>
        { this.state.selectedState ? this.renderSelectedState(mappedColorValues, mappedCircleValues, color, this.state.selectedState) : null }
      </div>
    )
  }
}

export default USMap;
