
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Reporter extends Component {

  render() {
  	const { login, avatarUrl } = this.props.user;
    return (
      <div className="reporter box-row">
        <div className="reporter-img">
          <img src={avatarUrl} width="40" height="40" />
        </div>
        <div className="reporter-name">
          <span reporter-name-name>
            {login}
          </span>
        </div>
      </div>
    );
  }
}

Reporter.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired
};
