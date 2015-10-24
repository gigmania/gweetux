import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Repo extends Component {

  render() {
    const { repo } = this.props;
    //console.log(repo);
    const { name, description, subscribersCount, openIssuesCount, stargazersCount, fullName } = repo;

    return (
      <div className="repo component box-row">
        <div className="repo-img">
          <img src={repo.organization.avatarUrl} />
        </div>
        <div className="repo-sum-head">
          <div className="repo-name">
            {name}
          </div>
          <div className="repo-desc">
            {description}
          </div>
          <div className="repo-details box-row">
            <div className="repo-issue-count repo-detail">
              <span className="issue-count count">{openIssuesCount}</span> issues
            </div>
            <div className="repo-watchers-count repo-detail">
              <span className="watchers-count count">{subscribersCount}</span> watchers
            </div>
            <div className="repo-gazers-count repo-detail">
              <Link to={`/${fullName}/gazers`} data={this}>
                <span className="gazers-count count">{stargazersCount}</span> gazers
              </Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

Repo.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired
};
