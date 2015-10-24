import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Gazer extends Component {

  componentWillMount() {
    let min = 50;
    let max = 100;
    let size = String(Math.floor(Math.random() * (max - min + 1)) + min);
    this.setState({
      size: size
    });
  }

  render() {
    const { gazer } = this.props;
    const { size } = this.state;
    console.log(size);
    return (
      <ReactCSSTransitionGroup className="gazer-list-trans-group box-row" transitionName="gazers" transitionAppear={true} transitionAppearTimeout={750} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <div className="gazer-list-module box-row">
          <div className="gazer-img">
            <a href={gazer.htmlUrl} className="gazer-img" target="_blank">
              <img src={gazer.avatarUrl} />
            </a>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

Gazer.propTypes = {
  gazer: PropTypes.object.isRequired
};
