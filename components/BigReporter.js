
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class BigReporter extends Component {

  render() {
  	const { login, avatarUrl, htmlUrl } = this.props.user;
    return (
      <div className="big-reporter box-row">
        <div className="big-reporter-img">
          <img src={avatarUrl} />
        </div>
        <div className="big-reporter-name">
          <a href={htmlUrl} className="big-reporter-url" target="_blank">
            @{login}
          </a>
        </div>
      </div>
    );
  }
}

BigReporter.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    htmlUrl: PropTypes.string.isRequired,
  }).isRequired
};
