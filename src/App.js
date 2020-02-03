import React, { Component } from 'react';

import Topic from './components/topic';
import MapTopic from './components/map-topic';
import Header from './components/header';
import StorySelect from './components/story-select';

import { ReactComponent as Squares } from './images/squares.svg';

import maternalAndInfantMortalityData from './data/build/maternal-and-infant-mortality.json';
import mentalHealth from './data/build/mental-health.json';
import efficiencyAndCost from './data/build/efficiency-and-cost.json';
import opioidEpidemic from './data/build/opioid-epidemic.json';
import nutritionAndObesity from './data/build/nutrition-and-obesity.json';
import substanceUseDisorder from './data/build/substance-use-disorder.json';

const topics = [
  maternalAndInfantMortalityData,
  mentalHealth,
  efficiencyAndCost,
  opioidEpidemic,
  nutritionAndObesity,
  substanceUseDisorder
]

const stories = [
  {
    id: "2",
    title: "Future Story",
    tagline: "Contribute with your data story!",
    description: "For Dashboard v1, we present the summary story The State of Health, USA. Contribute with your data story!",
    topics: [maternalAndInfantMortalityData, mentalHealth, substanceUseDisorder, opioidEpidemic, efficiencyAndCost],
  },
  {
    id: "stateOfHealthUSA",
    title: "The State of U.S. Health",
    tagline: "How are we doing as a nation? What are the biggest problems?",
    description: "How are we doing as a nation? What are the biggest problems?",
    topics: [maternalAndInfantMortalityData, mentalHealth, substanceUseDisorder, opioidEpidemic, efficiencyAndCost],
  },
  {
    id: "3",
    title: "Another Future Story",
    tagline: "Contribute with your data story!",
    description: "For Dashboard v1, we present the summary story The State of Health, USA. Contribute with your data story!",
    topics: [maternalAndInfantMortalityData, mentalHealth, substanceUseDisorder, opioidEpidemic, efficiencyAndCost],
  }
]

const mappedTopics = new Map(topics.map(topic => {
  return [topic.title, topic];
}));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      story: stories[1],
      showStorySelect: false
    }
  }

  handleTopicChange = (title, index) => {
    const story = JSON.parse(JSON.stringify(this.state.story));
    story.topics[index] = mappedTopics.get(title);

    this.setState({ story });
  }

  toggleStorySelect = () => {
    this.setState({ showStorySelect: !this.state.showStorySelect });
  }

  handleStorySelect = (story) => {
    if (story === undefined) {
      this.toggleStorySelect();
    } else {
      this.setState({
        story,
        showStorySelect: false
      })
    }
  }

  renderTopics = (indices) => {
    return indices.map(index => {
      return (
        <div className="col-2" key={this.state.story.topics[index].id}>
          <Topic
            position={index}
            alternateColoring={index === 0 || index === 4 ? true : false}
            data={this.state.story.topics[index]}
            allTopics={topics}
            onTopicChange={this.handleTopicChange}
          />
        </div>
      )
    })
  }

  render() {
    return (
      <div className="app">
        <div className={`container ${this.state.showStorySelect ? 'blur' : ''}`}>
          <div className="row screen-height">
            { this.renderTopics([0, 1]) }
            <div className="col-4">
              <div className="center-container background--gradient-light">
                <Header story={this.state.story} onChooseStory={this.toggleStorySelect} />
                <MapTopic
                  position={2}
                  data={this.state.story.topics[2]}
                  allTopics={topics}
                  onTopicChange={this.handleTopicChange}
                />
              </div>
            </div>
            { this.renderTopics([3, 4]) }
          </div>
        </div>
        {
          this.state.showStorySelect ?
            <div className="story-select-container">
              <div className="container">
                <div className="row screen-height">
                  <div className="col-4"></div>
                  <div className="col-4">
                    <Squares className="story-select-container__squares" />
                    <StorySelect
                      stories={stories}
                      selectedStory={this.state.story}
                      onStorySelect={this.handleStorySelect}
                    />
                  </div>
                  <div className="col-4"></div>
                </div>
              </div>
            </div>
          : null
        }
      </div>
    )
  }
}

export default App;
