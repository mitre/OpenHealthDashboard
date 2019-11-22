import React, { Component } from 'react';

import BarChart from './bar-chart';
import BarChartHorizontal from './bar-chart-horizontal';
import BarChartDiverging from './bar-chart-diverging';
import LineChart from './line-chart';
import USMap from './map';
import { ReactComponent as IconTime } from '../images/icons/time.svg';
import { ReactComponent as IconState } from '../images/icons/state.svg';
import { ReactComponent as IconDemographics } from '../images/icons/demographics.svg';
import { ReactComponent as IconGlobal } from '../images/icons/global.svg';

const lensOptions = {
  time: {
    title: 'Time',
    icon: <IconTime className="icon" />
  },
  state: {
    title: 'State',
    icon: <IconState className="icon" />
  },
  demogr: {
    title: 'Demogr',
    icon: <IconDemographics className="icon" />
  },
  global: {
    title: 'Global',
    icon: <IconGlobal className="icon" />
  }
};

class Lenses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLens: props.data[0].lensType,
      selectedLensData: props.data[0]
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedKeyIndicator !== this.props.selectedKeyIndicator) {
      const selectedLens = this.props.data[0].lensType;

      this.updateLens(selectedLens);
    }
  }

  updateLens = (selectedLens) => {
    const selectedLensData = this.props.data.find(lens => lens.lensType === selectedLens);

    this.setState({
      selectedLens,
      selectedLensData
    })
  }

  onLensChange = (e) => {
    const selectedLens = e.currentTarget.value;

    this.updateLens(selectedLens);
  }

  renderIcon = (type) => {

  }

  renderLensData = (data) => {
    let layout = this.props.layout ? this.props.layout : 'lens';
    switch (data.type) {
      case 'chart':
        switch (data.chartType) {
          case 'bar':
            return (
              <div className="bar-chart-wrapper">
                <BarChart data={data} layout={layout}/>
              </div>
            );
          case 'barHorizontal':
            return (
              <div className="bar-chart-wrapper">
                <BarChartHorizontal data={data} layout={layout}/>
              </div>
            );
          case 'barDiverging':
            return (
              <div className="bar-chart-wrapper">
                <BarChartDiverging data={data} layout={layout} />
              </div>
            );
          case 'line':
            return (
              <LineChart data={data} layout={layout} />
            )
          default:
            return null;
        }
      case 'map':
        return (
          <USMap colorData={data} clickable={false} layout={layout}/>
        )
      default:
        return null;
    }
  }

  renderLensOptions = () => {
    return (
      <ul className="lenses__options">
        {this.props.data.map(lens => {
          return (
            <li key={lens.id}>
              <label className={this.state.selectedLens === lens.lensType ? 'selected' : ''}>
                <input
                  type="radio"
                  value={lens.lensType}
                  checked={ this.state.selectedLens === lens.lensType }
                  onChange={ this.onLensChange }
                />
                <span>{lensOptions[lens.lensType] ? lensOptions[lens.lensType].title : lens.lensType}</span>
                { lensOptions[lens.lensType] ? lensOptions[lens.lensType].icon : null }
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <div className="lenses text--chart">
        <div className="lenses__bar"/>
        <div className={`lenses__container ${this.props.bottom ? 'lenses--bottom' : ''}`}>
            { !this.props.bottom ? this.renderLensOptions() : null }
            <div className="lenses__data">
              { this.renderLensData(this.state.selectedLensData) }
            </div>
          { this.props.bottom ? this.renderLensOptions() : null }
        </div>
        <div className="lenses__bar"/>
      </div>
    )
  }
}

export default Lenses;
