import React, { Component } from 'react';

import USMap from './map';
import KeyIndicator from './key-indicator';
import Lenses from './lenses';
import Citations from './citations';
import TopicSelect from './topic-select';
import { ReactComponent as IconBook } from '../images/icons/book.svg';
import { ReactComponent as ButtonShape } from '../images/round_button.svg';


class MapTopic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndicator: {
        'color': {
          title: this.props.data.keyIndicators[0].title,
          data: this.props.data.keyIndicators[0].lensData.find(d => d.type === "map")
        },
        'circle': {
          title: this.props.data.keyIndicators[1].title,
          data: this.props.data.keyIndicators[1].lensData.find(d => d.type === "map")
        }
      },
      topic: this.props.data.title,
      lensData: this.getLensData(),
      citations: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.keyIndicators !== this.props.data.keyIndicators) {
      this.setState({
        selectedIndicator: {
          'color': {
            title: this.props.data.keyIndicators[0].title,
            data: this.props.data.keyIndicators[0].lensData.find(d => d.type === "map")
          },
          'circle': {
            title: this.props.data.keyIndicators[1].title,
            data: this.props.data.keyIndicators[1].lensData.find(d => d.type === "map")
          }
        },
        topic: this.props.data.title,
        lensData: this.getLensData()
      });
    }
  }

  getLensData = () => {
    const lenses = [];

    this.props.data.keyIndicators.forEach(d => {
      const lensData = d.lensData.filter(ld => ld.type !== "map");

      if (lensData.length) {
        lenses.push(lensData);
      }
    });

    return lenses.slice(0, 3);
  }


  showCitations = () => {
    this.setState({ citations: true });
  }

  hideCitations = () => {
    this.setState({ citations: false });
  }

  openTopicSelect = () => {
    this.setState({ showTopicSelect: true });
  }

  handleTopicChange = (title) => {
    this.props.onTopicChange && this.props.onTopicChange(title, this.props.position);
    this.setState({ showTopicSelect: false });
  }

  handleKeyIndicatorClick = (data, type) => {
    const alreadySelected = this.state.selectedIndicator[type] && this.state.selectedIndicator[type].title === data.title;
    let newData;

    if (alreadySelected) {
      newData = null
    } else {
      newData = {
        title: data.title,
        data: data.lensData.find(d => d.type === "map")
      }
    }

    this.setState({
      selectedIndicator: Object.assign(this.state.selectedIndicator, { [type]: newData })
    })
  }

  isSelected(title) {
    if (
        this.state.selectedIndicator['color']
        && this.state.selectedIndicator['circle']
        && title === this.state.selectedIndicator['color'].title
        && title === this.state.selectedIndicator['circle'].title) {
      return 'both';
    } else if (this.state.selectedIndicator['color'] && title === this.state.selectedIndicator['color'].title) {
      return 'color';
    } else if (this.state.selectedIndicator['circle'] && title === this.state.selectedIndicator['circle'].title) {
      return 'circle';
    } else {
      return null;
    }
  }

  renderLongitudeLines = () => {
    let styles = {
      fill:'none',
      stroke:'white',
      strokeOpacity:'0.1'
    }
    return <div className="map-topic__long-lines">
          <svg height="100%" width="100%" viewBox="0 0 4000 2000">
              <ellipse cx="2000" cy="1000" rx="2000" ry="1000" style={styles} />
              <ellipse cx="2000" cy="1000" rx="1650" ry="1000" style={styles} />
              <ellipse cx="2000" cy="1000" rx="1300" ry="1000" style={styles} />
              <ellipse cx="2000" cy="1000" rx="950" ry="1000" style={styles} />
              <ellipse cx="2000" cy="1000" rx="600" ry="1000" style={styles} />
              <ellipse cx="2000" cy="1000" rx="250" ry="1000" style={styles} />
          </svg>
    </div>
  }

  renderSupportingData = (type) => {
    if (this.state.selectedIndicator[type] && this.state.selectedIndicator[type].lensData) {
      return <Lenses data={this.state.selectedIndicator[type].lensData} selectedKeyIndicator={this.state.selectedIndicator[type].title} bottom={true} />;
    }
  }

  render() {
    const keyCitations = this.props.data.keyIndicators.map(d => d.citations).flat();
    const illustrationPath = process.env.PUBLIC_URL + "/illustrations/" + this.props.data.illustration;

    return (
      <div className="map-topic">
        {this.renderLongitudeLines()}
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-3 map-topic__position-container">
              <h2 className="map-topic__title">{ this.props.data.title }</h2>
              <img className="map-topic__illustration" src={illustrationPath} alt={`illustration representing ${this.props.data.title}`}/>
              <div className="map-topic__choose-topic">
                <button className="button button--outline" onClick={this.openTopicSelect}><div>Choose Topic</div><ButtonShape/></button>
              </div>
              <div className="map-topic__indicators map-topic__indicators--color">
                <p className="map-topic__indicators__label">Map data</p>
                {
                  this.props.data.keyIndicators.map(indicatorData => {
                    return (
                      <KeyIndicator
                          key={indicatorData.id}
                          data={indicatorData}
                          displayTitle={true}
                          mapButtons={true}
                          selected={ this.isSelected(indicatorData.title) }
                          onClick={ this.handleKeyIndicatorClick }>
                      </KeyIndicator>
                     )
                  })
                }
                <div className="map-topic__indicators__bar"/>
              </div>
              <div className="topic__citations-button">
                <button className="button button--transparent" onClick={() => this.showCitations()}><IconBook className="icon" /></button>
              </div>
            </div>
            <div className="col-7">
              <div className= "map-topic__map h-100">
                <USMap
                  colorData={this.state.selectedIndicator['color'] ? this.state.selectedIndicator['color'].data : null}
                  circleData={this.state.selectedIndicator['circle'] ? this.state.selectedIndicator['circle'].data : null}
                />
              </div>
            </div>
            <div className="col-2">
              <div className="map-topic__lenses">
                { this.state.lensData.map(d => <Lenses key={d[0].id} data={d} selectedKeyIndicator={this.state.topic} layout='map' bottom={false}/> )}
              </div>
            </div>
          </div>
        </div>
        {
          this.state.citations ?
            <div className="map-topic__citations-container back" onClick={() => this.hideCitations()}>
              <div className="row h-100">
                <div className="col-12">
                  <Citations data={ keyCitations } />
                </div>
              </div>
            </div>
          : null
        }
        {
          this.state.showTopicSelect ?
            <TopicSelect
              topics={this.props.allTopics}
              currentTopic={this.props.data.title}
              onTopicChange={this.handleTopicChange}
              bigWheel={true}
            />
          : null
        }
      </div>
    )
  }
}

export default MapTopic;
