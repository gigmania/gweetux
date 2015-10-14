import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Reporter from './Reporter';
import IssueListInfo from './IssueListInfo';

export default class Issue extends Component {

  render() {
    const { fullName, issue } = this.props;
    const { user } = this.props.issue;
    return (
      <ReactCSSTransitionGroup className="issue-list-trans-group box-row" transitionName="issues" transitionAppear={true} transitionAppearTimeout={750} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <div className="issue-list-module box-row">
        	<IssueListInfo issue={issue} fullName={fullName} />
          <Reporter user={user} />
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

Issue.propTypes = {
  fullName: PropTypes.string.isRequired,
  issue: PropTypes.object.isRequired
};
