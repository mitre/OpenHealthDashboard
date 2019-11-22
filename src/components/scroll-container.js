import React, { Component } from 'react';
import { ScrollTo, ScrollArea } from "react-scroll-to";
import { ReactComponent as IconChevrons } from '../images/icons/chevrons.svg';

class ScrollContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrolled: false,
      needsScroll: false
    }

    this.container = React.createRef();
    this.scrollArea = React.createRef();
  }

  componentDidMount() {
    // TODO: This is a dumb solution, come back to it when we can.
    // Not really sure why this doesn't get the right height without setTimeout.
    // The content should be rendered already?
    setTimeout(this.needsScroll, 50);
  }

  componentDidUpdate(prevProps) {
    if (this.props.for !== prevProps.for) {
      this.setState({ scrolled: false, needsScroll: false }, () => {
        this.needsScroll();
      });
      this.scroll({ ref: this.container, y: 0, smooth: true });
    }
  }

  toggleScroll = (scrollTo) => {
    if (this.state.scrolled) {
      this.scroll({ ref: this.container, y: 0, smooth: true });
    } else {
      this.scroll({ ref: this.container, y: this.container.current.scrollHeight, smooth: true });
    }

    this.setState({ scrolled: !this.state.scrolled });
  }

  needsScroll = () => {
    let needsScroll = false;

    if (this.container.current && this.scrollArea.current) {
      needsScroll = this.scrollArea.current.clientHeight > this.container.current.clientHeight;
    }

    if (this.state.needsScroll !== needsScroll) {
      this.setState({ needsScroll });
    }
  }

  render() {
    const needsScroll = this.state.needsScroll;

    return (
      <div className={ `scroll-container ${ this.state.needsScroll ? 'scroll-container--needs-scroll' : ''} ${ this.state.scrolled ? 'scroll-container--scrolled' : ''}` } ref={this.container}>
        <ScrollTo>
          {({ scrollTo }) => {
            this.scroll = scrollTo;

            return (
              <ScrollArea>
                {
                  needsScroll ?
                    <button className="button button--yellow button--large button--center scroll-container__up" onClick={() => this.toggleScroll(scrollTo)}><IconChevrons className="icon icon--blue rotate--180" /></button>
                  : null
                }
                <div ref={this.scrollArea}>
                  { this.props.children }
                </div>
                {
                  needsScroll ?
                    <button className="button button--yellow button--large button--center scroll-container__down" onClick={() => this.toggleScroll(scrollTo)}><IconChevrons className="icon icon--blue" /></button>
                  : null
                }
              </ScrollArea>
            )
          }}

        </ScrollTo>
      </div>
    )
  }
}

export default ScrollContainer;
