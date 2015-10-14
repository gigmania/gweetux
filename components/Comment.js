
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


export default class Comment extends Component {

  render() {
    const { body, user } = this.props.comment;
    return (
      <div className="comment-module box-row">
        <div className="comment-module-primary box-row">
          <div className="comment-body">
            {body}
          </div>
          <div className="comment-user-avatar">
            <img src={user.avatarUrl} />
          </div>
        </div>
        <div className="comment-user-name">
          <a href={user.htmlUrl} className="commenter-url" target="_blank">
            @{user.login}
          </a>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    updatedAt: PropTypes.string,
  }).isRequired
};
