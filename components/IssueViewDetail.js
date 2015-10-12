
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import BigLabel from './BigLabel';
import List from './List';

export default class IssueViewDetail extends Component {

  renderLabel(label) {
    if (label) {
      return (
        <BigLabel label={label}
                key={label.name}/>
        );
    }
  }

  render() {
  	console.log(this);
  	const { title, state, body, number, labels, comments } = this.props.issue;
    return (
      <div className="issue-view-detail box-row">
        <div className="issue-view-title">
          <h1>
            {title}
          </h1>
        </div>
        <div className="issue-view-body">
          <h3>
            {body}
          </h3>
        </div>
        <div className="issue-view-sup-head box-row">
          <div className="issue-view-num">
            <span className="issue-view-num-num">
              #{number}
            </span>
          </div>
          <div className="issue-view-state">
            <span className="issue-view-state-state">
              {state}
            </span>
          </div>
        </div>
        <div className="issue-view-labels box-row">
          <List renderItem={this.renderLabel}
                items={labels} />
        </div>
      </div>
    );
  }
}

IssueViewDetail.propTypes = {
  fullName: PropTypes.string.isRequired,
  issue: PropTypes.shape({
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    labels: PropTypes.array.isRequired,
  }).isRequired
};
