import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Repo extends Component {

  render() {
    const { repo } = this.props;
    const { name, description } = repo;

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
