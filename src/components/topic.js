import React, { Component } from 'react';

import KeyIndicator from './key-indicator';
import SupportingIndicatorGroup from './supporting-indicator-group';
import Lenses from './lenses';
import TopicSelect from './topic-select';
import ScrollContainer from './scroll-container';
import Citations from './citations';

import { ReactComponent as IconBook } from '../images/icons/book.svg';
import { ReactComponent as ButtonShape } from '../images/round_button.svg';

class Topic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedKeyIndicator: this.props.data.keyIndicators[0],
      citations: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.keyIndicators !== this.props.data.keyIndicators) {
      this.setState({
        selectedKeyIndicator: this.props.data.keyIndicators[0]
      })
    }
  }

  handleKeyIndicatorClick = (data) => {
    this.setState({
      selectedKeyIndicator: data
    })
  }

  openTopicSelect = () => {
    this.setState({ showTopicSelect: true });
  }

  handleTopicChange = (title) => {
    this.props.onTopicChange && this.props.onTopicChange(title, this.props.position);
    this.setState({ showTopicSelect: false });
  }

  // only show citations on right hand side. show them all there.
  showCitations = () => {
    this.setState({ citations: true });
  }
  hideCitations = () => {
    this.setState({ citations: false });
  }


  render() {
    const keyCitations = this.props.data.keyIndicators.map(d => d.citations).flat();
    const supportingCitations = this.props.data.supportingIndicators.map(d => d.citations).flat();
    const allCitations = [...new Set(keyCitations.concat(supportingCitations))];

    const illustrationPath = this.props.data.illustration? process.env.PUBLIC_URL + "/illustrations/" + this.props.data.illustration : null;

    return (
      <div className="topic-container h-100">
        <div className={`topic pad-all h-100 ${this.state.citations === true ? 'blur' : ''} ${this.state.showTopicSelect ? 'blur' : ''}`}>
          <div className={`topic__top-border ${this.props.alternateColoring ? 'alternate' : ''}`}>
            <div className="container">
              <div className="row">
                <div className={`col-6 border--right`}>
                  <div className="pad-top pad-right">
                    <h2 className="topic__title">{ this.props.data.title }</h2>
                    { illustrationPath ? <img className="topic__illustration" src={illustrationPath} alt={`illustration representing ${this.props.data.title}`} /> : null }
                    <div className="topic__choose-topic">
                      <button className="button button--outline" onClick={this.openTopicSelect}><div>Choose Topic</div><ButtonShape/></button>
                    </div>
                    <div className="topic__key-indicator-holder">
                      {
                        this.props.data.keyIndicators.slice(0, 2).map(indicatorData => {
                          return <KeyIndicator
                                    key={indicatorData.id}
                                    data={indicatorData}
                                    selected={indicatorData.title === this.state.selectedKeyIndicator.title}
                                    onClick={ this.handleKeyIndicatorClick }
                                  />;
                        })
                      }
                      <div className="key-indicator-lenses">
                        <Lenses name={this.props.data.title + this.state.selectedKeyIndicator.title} data={this.state.selectedKeyIndicator.lensData} selectedKeyIndicator={this.state.selectedKeyIndicator.title}/>
                      </div>
                    </div>
                    <div className="topic__citations-button">
                      <button className="button button--transparent" onClick={() => this.showCitations()}><IconBook className="icon" /></button>
                    </div>
                  </div>
                </div>
                <div className={`col-6`}>
                  <ScrollContainer for={this.props.data.title}>
                    <div className={`scroll-container__content ${this.props.alternateColoring ? 'alternate' : ''}`}>
                      {
                        this.props.data.keyIndicators.length > 2 ?
                          this.props.data.keyIndicators.slice(2, this.props.data.keyIndicators.length).map(indicator => {
                            return (
                              <SupportingIndicatorGroup key={indicator.id} data={{ title: indicator.title, indicators: [ indicator, indicator.lensData.filter(d => d.type !== 'map')].flat() }}></SupportingIndicatorGroup>
                            )
                          })
                        : null
                      }
                      {
                        this.props.data.supportingIndicators.map((indicatorGroup,index) => {
                          let last= (index===this.props.data.supportingIndicators.length-1);

                          if (indicatorGroup.hide === true){
                            return null;
                          }
                          else{
                            return <SupportingIndicatorGroup key={indicatorGroup.id} lastOne={last} data={indicatorGroup}></SupportingIndicatorGroup>;
                          }
                        })
                      }
                    </div>
                  </ScrollContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          this.state.citations ?
            <div className="container topic__citations-container h-100" onClick={() => this.hideCitations()}>
              <div className="row h-100">
                <div className="col-12">
                {
                    <Citations data={ allCitations} />
                }
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
            />
          : null
        }
      </div>
    )
  }
}

export default Topic;
