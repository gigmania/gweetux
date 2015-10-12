import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadIssue, loadComments } from '../actions';

import Issue from '../components/Issue';
import IssueViewDetail from '../components/IssueViewDetail';
import BigReporter from '../components/BigReporter';
import List from '../components/List';
import Comment from '../components/Comment';

function loadData(props) {
  const { login, name, number } = props.params;
  const { fullName } = props;
  props.loadIssue(number, fullName);

  if (props.issue.comments && props.issue.comments > 0) {
    props.loadComments(number, fullName);
  }
}

class IssuePage extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullName !== this.props.fullName) {
      loadData(nextProps);
    }
  }

  renderComment(comment) {
    return (
      <Comment comment={comment}
             key={comment.id} />
    );
  }

  render() {
    const { issue, user, comments, remarks, fullName } = this.props;
    return (
      <div className="issue-view box-row">
        <div className="issue-view-inside box-row">
          <IssueViewDetail issue={issue} fullName={fullName} />
          <BigReporter user={user} />
        </div>
        <div className="comments-view box-row-rev">
          <List renderItem={this.renderComment}
                items={remarks} />
        </div>
      </div>
    );
  }
}

IssuePage.propTypes = {
  issue: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loadIssue: PropTypes.func.isRequired,
  loadComments: PropTypes.func.isRequired,
  comments: PropTypes.object.isRequired,
  remarks: PropTypes.array.isRequired,
  fullName: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { login, name, number } = state.router.params;
  const {
    pagination: { commentsByIssue },
    entities: { users, repos, issues, comments }
  } = state;

  const commentsPagination = commentsByIssue[number] || { ids: [] };
  const remarks = commentsPagination.ids.map(id => comments[id]);

  const issue = issues[number];
  const { user } = issue;

  for (var key in repos) {
    var repo = repos[key];
  }

  var fullName = repo.fullName;
  console.log(fullName);

  return {
    issue,
    user,
    repo,
    comments,
    remarks,
    fullName
  };
}

export default connect(mapStateToProps, {
  loadIssue,
  loadComments,
})(IssuePage);
