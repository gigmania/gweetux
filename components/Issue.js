
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Reporter from './Reporter';
import IssueListInfo from './IssueListInfo';

export default class Issue extends Component {

  render() {
    const { fullName, issue } = this.props;
    const { user } = this.props.issue;
    return (
      <div className="issue-list-module box-row">
      	<IssueListInfo issue={issue} fullName={fullName} />
        <Reporter user={user} />
      </div>
    );
  }
}

Issue.propTypes = {
  fullName: PropTypes.string.isRequired,
  issue: PropTypes.object.isRequired
};
