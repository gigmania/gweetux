import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Gazer extends Component {

  render() {
    const { gazer } = this.props;
    return (
      <ReactCSSTransitionGroup className="gazer-list-trans-group box-row" transitionName="gazers" transitionAppear={true} transitionAppearTimeout={750} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <div className="gazer-list-module box-row">
          <h2> {gazer.login} </h2>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

Gazer.propTypes = {
  gazer: PropTypes.object.isRequired
};
