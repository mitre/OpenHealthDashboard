import React, { Component } from 'react';

import { ReactComponent as IconChevrons } from '../images/icons/chevrons.svg';
import { ReactComponent as Wheels } from '../images/wheels.svg';
import { ReactComponent as Line} from '../images/topic_line.svg';
import { ReactComponent as BigWheels } from '../images/big-wheels.svg';
import { ReactComponent as BigLine } from '../images/big-zigzag.svg';

class TopicSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: this.props.topics.map(t => t.title).indexOf(this.props.currentTopic)
    }

    this.container = React.createRef();
  }

  incrementTopic = (direction) => {
    const nextIndex = direction === 'up' ? this.state.currentIndex + 1 : this.state.currentIndex - 1;

    if (nextIndex === this.props.topics.length) {
      this.setState({ currentIndex: 0 });
    } else if (nextIndex < 0) {
      this.setState({ currentIndex: this.props.topics.length -1 });
    } else {
      this.moveToTopic(nextIndex);
    }
  }

  moveToTopic = (i) => {
    this.setState({ currentIndex: i });
  }

  pickTopic = (title) => {
    this.props.onTopicChange && this.props.onTopicChange(title);
  }

  translateOption = (i) => {
    const width = 1920;
    const height = 1920;
    const radius = 2575;
    // const numElements = this.props.topics.length;
    const step = (2 * Math.PI) / 80;
    const angle = step * (this.state.currentIndex - i);

    const x = Math.round(width/2 + radius * Math.cos(angle));
    const y = Math.round(height/2 + radius * Math.sin(angle));

    return `translate(${x}px, ${y}px)`;
  }

  render() {
    const focusedTopic = this.props.topics[this.state.currentIndex];
    const originalTopic = this.props.currentTopic;
    return (
      <div className="topic-select" ref={this.container}>
        {
          this.props.bigWheel ?
            <BigWheels className="topic-select__wheel topic-select__wheel--big" />
          : <Wheels className="topic-select__wheel" />
        }
        <div className="topic-select__content">
          <div className={`topic-select__dismiss ${this.props.bigWheel ? 'topic-select__dismiss--big' : ''}`} onClick={() => this.pickTopic(originalTopic)}/>
          <button className="button button--blue button--large button--center topic-select__button-up" onClick={() => this.incrementTopic('up')}><IconChevrons className="icon rotate--180"/></button>
          {
            this.props.bigWheel ?
              <BigLine className="topic-select__zigline topic-select__zigline--big" />
            : <Line className="topic-select__zigline" />
          }
          <ul className="topic-select__options" style={{ transform: "translate(-3300px, -50px)" }}>
            {
              this.props.topics.map((topic, i) => {
                return (
                  <li key={topic.id} className={`topic-select__option ${i===this.state.currentIndex ? `selected` : ''} `}  style={{ transform: this.translateOption(i) }} onClick={() => this.moveToTopic(i)}>
                    <span className="text--uppercase">{ topic.title }</span>
                  </li>
                );
              })
            }
          </ul>
          <button className="button button--blue button--large button--center topic-select__button-down" onClick={() => this.incrementTopic('down')}><IconChevrons className="icon"/></button>
          <div className={`topic-select__description ${this.props.bigWheel ? 'topic-select__description--big' : ''}`}>
            <p>{ focusedTopic.description }</p>
            <div className="text--center">
              {
                focusedTopic.title === this.props.currentTopic ?
                  <button className="button button--inverse button--large text--uppercase" onClick={() => this.pickTopic(originalTopic)}>Back</button>
                  : <button className="button button--blue button--large text--uppercase" onClick={() => this.pickTopic(focusedTopic.title)}>Open</button>
              }
            </div>
          </div>
            <div className="topic-select__dismiss-text">Return to {this.props.currentTopic}</div>
        </div>
      </div>
    )
  }
}

export default TopicSelect;
