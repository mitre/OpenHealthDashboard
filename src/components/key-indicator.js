import React, { Component } from 'react';

import Stat from './stat';
import Button from './button';
import { ReactComponent as IconGraph } from '../images/icons/graph.svg';
import { ReactComponent as IconMap } from '../images/icons/map.svg';
import { ReactComponent as IconNumbers } from '../images/icons/numbers.svg';

class KeyIndicator extends Component {

  static defaultProps = {
    displayTitle: true
  }

  render() {
    const selectedColor = this.props.selected === 'color' || this.props.selected === 'both';
    const selectedCircle = this.props.selected === 'circle' || this.props.selected === 'both';

    return (
      <div className="key-indicator">
        <div className={`key-indicator__indicator ${this.props.selected ? 'selected' : ''} ${this.props.mapButtons ? 'key-indicator__indicator--map-buttons' : ''}`}
             onClick={() => this.props.mapButtons ? null : this.props.onClick(this.props.data)}>
        <div className={`key-indicator__indicator__bar ${this.props.selected ? 'selected' : ''}`}/>
        {
            this.props.mapButtons ?
              <div className="key-indicator__buttons key-indicator__buttons--fixed button-group">
                <Button selected={selectedColor}
                        onClick={() => this.props.onClick(this.props.data, 'color')}
                        className="button--center">
                  <IconMap className={`icon ${selectedColor ? 'icon--blue' : ''}`} />
                </Button>
                <Button selected={selectedCircle}
                        onClick={() => this.props.onClick(this.props.data, 'circle')}
                        className="button--center">
                  <IconNumbers className={`icon ${selectedCircle ? 'icon--blue' : ''}`} />
                </Button>
              </div>
          : null
        }
        {
          !this.props.mapButtons ?
            <div className="key-indicator__buttons key-indicator__buttons--fixed button-group">
              <Button selected={this.props.selected}
                      onClick={() => this.props.onClick(this.props.data)}
                      className="button--center">
                <IconGraph className={`icon ${this.props.selected ? 'icon--blue' : ''}`} />
              </Button>
            </div>
          : null
        }
        <div>
          {
            this.props.displayTitle ?
              <p className="key-indicator__title">{ this.props.data.title }</p>
            : null
          }
          <Stat data={this.props.data} />
        </div>
        </div>
        {
          this.props.children ?
            <div className="key-indicator__supporting-data">
              { this.props.children}
            </div>
          : null
        }
      </div>
    )
  }
}

export default KeyIndicator;
