
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Label from './Label';
import List from './List';

export default class IssueListInfo extends Component {

  componentWillMount() {
    var labels =  this.props.issue.labels;

    //trims the body text to a clean 140 characters
    if (this.props.issue.body) {
      var trimBody = this.props.issue.body;
      for (var i = 139; i >= 0; i--) {
        var re = /\s/;
        if (re.test(trimBody[i])) {
          var cutPoint = (i-trimBody.length);
          var newString = trimBody.slice(0,cutPoint);
          this.setState({
            trimBody: newString
          });
          return;
        }
      }
    } else {
      this.setState({
        trimBody: ''
      });
    }
  }

  renderLabel(label) {
    if (label) {
      return (
        <Label label={label}
                key={label.name}/>
        );
    }
  }

  render() {
  	const { title, number, body, comments, labels } = this.props.issue;
    const { fullName} = this.props;
    const { trimBody } = this.state;

    return (
      <div className="issue-list-info box-row">

        <div className="issue-list-sup-head box-row">
          <div className="issue-list-num">
            <span className="issue-list-num-num">
              #{number}
            </span>
          </div>
          <div className="issue-list-comment">
            <span className="issue-list-comment-count">
              {comments} comments
            </span>
          </div>
        </div>
        <div className="issue-list-labels box-row">
          <List renderItem={this.renderLabel}
                items={labels} />
        </div>
        <div className="issue-list-title">
          <span className="text-contain issue-list-title-title">
            <Link to={`/${fullName}/issue/${number}`} data={this}>
              {title}
            </Link>
          </span>
        </div>
        <div className="issue-list-body">
          <h4 className="text-contain">
            {trimBody}
          </h4>
        </div>
      </div>
    );
  }
}

IssueListInfo.propTypes = {
  fullName: PropTypes.string.isRequired,
  issue: PropTypes.shape({
    title: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    labels: PropTypes.array.isRequired,
    comments: PropTypes.number,
  }).isRequired
};
