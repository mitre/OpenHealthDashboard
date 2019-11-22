import React, { Component } from 'react';

import { ReactComponent as ButtonShape } from '../images/story_button.svg';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h2 className="header__story-title">{ this.props.story.title }</h2>
        <p className="header__story-tag">{ this.props.story.tagline }</p>
        <button className="button button--outline" onClick={this.props.onChooseStory}><div>Choose Story</div><ButtonShape/></button>
      </div>
    )
  }
}

export default Header;
